# This script is responsible for generating a JSON file of keypoints in ASL from a video.

import cv2
import mediapipe as mp
import numpy as np
import math
from argparse import ArgumentParser
import copy
import re
import os
import json

# Initialize MediaPipe model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, model_complexity=2, enable_segmentation=False)
connections = mp_pose.POSE_CONNECTIONS

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.5)
hand_connections = mp_hands.HAND_CONNECTIONS

left_hand_world_landmarks = None
right_hand_world_landmarks = None
left_hand_coords = None
right_hand_coords = None
left_hand_landmarks = None
right_hand_landmarks = None
total_frame_json = []
# Use these constants (since they are swapped by mediapipe)
LEFT_HAND = "Right"
RIGHT_HAND = "Left"

# Returns the difference in magnitude between two hands' coordinates
def get_hand_diff_mag(prev_hand_coords, curr_hand_coords):
    diff = curr_hand_coords - prev_hand_coords
    diff_pointwise_mag = np.array([np.linalg.norm(point) for point in diff])
    diff_mag = np.linalg.norm(diff_pointwise_mag)
    return diff_mag

# Records all frames where the hands appear
def count_appearing_frames(frame, 
                           frame_count, 
                           frame_to_is_left_hand_visible, 
                           frame_to_is_right_hand_visible):
    doesLeftHandAppear = False
    doesRightHandAppear = False
    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if results.multi_hand_world_landmarks:
        for hand in results.multi_handedness:
            hand_type = hand.classification[0].label
            if hand_type == LEFT_HAND:
                doesLeftHandAppear = True
            elif hand_type == RIGHT_HAND:
                doesRightHandAppear = True
    frame_to_is_left_hand_visible[frame_count] = doesLeftHandAppear
    frame_to_is_right_hand_visible[frame_count] = doesRightHandAppear

# Generates a JSON representation of each frame
def process_frame(frame, 
                  frame_count,
                  frame_to_is_left_hand_visible,
                  frame_to_is_right_hand_visible):
    left_wrist_pos = None
    right_wrist_pos = None
    global left_hand_coords
    global right_hand_coords
    global left_hand_world_landmarks
    global right_hand_world_landmarks
    global left_hand_landmarks
    global right_hand_landmarks
    global total_frame_json
    frame_json = {}
    is_left_wrist_above_elbow = False
    is_right_wrist_above_elbow = False
    # Process frame
    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if not results.pose_world_landmarks:
        print("Error: process_frame function could not run pose detection on the image")
        return
    landmarks = results.pose_world_landmarks.landmark
    pose_points = np.array([[lmk.x, lmk.y, lmk.z] for lmk in landmarks])
    left_wrist_pos = np.copy(pose_points[15, :]) # left wrist
    right_wrist_pos = np.copy(pose_points[16, :]) # right wrist

    # remove indices I don't want to show anymore
    for i in [32, 30, 28, 31, 29, 27, 26, 24, 25, 23, 18, 20, 22, 21, 19, 17]:
        pose_points[i, :] = (-math.inf, -math.inf, -math.inf)

    left_elbow_estimate = pose_points[13, :]
    left_wrist_estimate = pose_points[15, :]
    right_elbow_estimate = pose_points[14, :]
    right_wrist_estimate = pose_points[16, :]

    if left_elbow_estimate[1] >= left_wrist_estimate[1] - 0.1:
        is_left_wrist_above_elbow = True
    if right_elbow_estimate[1] >= right_wrist_estimate[1] - 0.1:
        is_right_wrist_above_elbow = True
            
    handLandmarksType = [] # which index to use in world landmarks    

    results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    if results.multi_hand_world_landmarks:
        handsType = []
        for hand in results.multi_handedness:
            handType = hand.classification[0].label
            handsType.append(handType)
        closerHandInd = -1
        closerHandDiff = None
        allSameHand = True
        sameHandType = -1
        for i, hand_landmarks in enumerate(results.multi_hand_landmarks):
            handType = handsType[i]
            landmarks = hand_landmarks.landmark
            points = np.array([[lmk.x, lmk.y, lmk.z] for lmk in landmarks])
            if right_hand_landmarks is None and handType == RIGHT_HAND:
                right_hand_landmarks = copy.deepcopy(points)
                handLandmarksType.append((RIGHT_HAND, i))
            elif left_hand_landmarks is None and handType == LEFT_HAND:
                left_hand_landmarks = copy.deepcopy(points)
                handLandmarksType.append((LEFT_HAND, i))
            if right_hand_landmarks is not None and handType == RIGHT_HAND:
                for handType in handsType:
                    if handType != RIGHT_HAND:
                        allSameHand = False
                        break
                if not allSameHand:
                    handLandmarksType.append((RIGHT_HAND, i))
                    right_hand_landmarks = copy.deepcopy(points)
                else:
                    sameHandType = RIGHT_HAND
                    diff = get_hand_diff_mag(right_hand_landmarks, points)
                    if closerHandInd == -1:
                        closerHandInd = i
                        closerHandDiff = diff
                    else:
                        if diff < closerHandDiff:
                            closerHandInd = i
                            closerHandDiff = diff

            elif left_hand_landmarks is not None and handType == LEFT_HAND:
                for handType in handsType:
                    if handType != LEFT_HAND:
                        allSameHand = False
                        break
                if not allSameHand:
                    handLandmarksType.append((LEFT_HAND, i))
                    left_hand_landmarks = copy.deepcopy(points)
                else:
                    sameHandType = LEFT_HAND
                    diff = get_hand_diff_mag(left_hand_landmarks, points)
                    if closerHandInd == -1:
                        closerHandInd = i
                        closerHandDiff = diff
                    else:
                        if diff < closerHandDiff:
                            closerHandInd = i
                            closerHandDiff = diff
        if sameHandType == LEFT_HAND:
            handLandmarksType.append((LEFT_HAND, closerHandInd))
        elif sameHandType == RIGHT_HAND:
            handLandmarksType.append((RIGHT_HAND, closerHandInd))

        for i, hand_landmarks in enumerate(results.multi_hand_world_landmarks):
            for typeOfHand, index in handLandmarksType:
                if index == i:
                    handType = handsType[i]
                    landmarks = hand_landmarks.landmark
                    points = np.array([[lmk.x, lmk.y, lmk.z] for lmk in landmarks])
                    centered_points = points
                    # center the wrist at the origin
                    centered_points -= centered_points[0, :]
                    if typeOfHand == RIGHT_HAND:
                        right_hand_world_landmarks = copy.deepcopy(centered_points)
                        centered_points = centered_points + right_wrist_pos
                        right_hand_coords = copy.deepcopy(centered_points)
                    elif typeOfHand == LEFT_HAND:
                        left_hand_world_landmarks = copy.deepcopy(centered_points)
                        centered_points = centered_points + left_wrist_pos
                        left_hand_coords = copy.deepcopy(centered_points)
            
    frame_json['pose'] = np.array2string(pose_points, separator=', ')

    if right_hand_world_landmarks is not None:
        if frame_to_is_right_hand_visible[frame_count] or is_right_wrist_above_elbow:
            right_hand_position = right_hand_world_landmarks + right_wrist_pos
            frame_json['right_hand'] = np.array2string(right_hand_position, separator=', ')
                  
    if left_hand_world_landmarks is not None:
        if frame_to_is_left_hand_visible[frame_count] or is_left_wrist_above_elbow:
            left_hand_position = left_hand_world_landmarks + left_wrist_pos
            frame_json['left_hand'] = np.array2string(left_hand_position, separator=', ')
 
    total_frame_json.append(frame_json)

def main(video_path, output_dir):
    frame_to_is_left_hand_visible = {}
    frame_to_is_right_hand_visible = {}
    frame_count = -1
    global left_hand_coords
    global right_hand_coords
    global total_frame_json
    global left_hand_world_landmarks
    global right_hand_world_landmarks
    global right_hand_landmarks
    global left_hand_landmarks
    left_hand_world_landmarks = None
    right_hand_world_landmarks = None
    left_hand_coords = None
    right_hand_coords = None
    left_hand_landmarks = None
    right_hand_landmarks = None
    total_frame_json = []
    # ex: ../../videos/again/01457.mp4
    match_regex = "[^/]*/([^/]*)/([^/]*).mp4"
    text = re.search(match_regex, video_path)
    ASL_word = text.group(1)
    ASL_video_number = text.group(2)
    cap = cv2.VideoCapture(video_path)
    cap.set(1, 0)
    while cap.isOpened():
        frame_count += 1
        success, image = cap.read()
        if not success:
            print("Finished processing video.")
            break  # If no frames has been grabbed, exit the loop.
        count_appearing_frames(image, 
                               frame_count=frame_count, 
                               frame_to_is_left_hand_visible=frame_to_is_left_hand_visible, 
                               frame_to_is_right_hand_visible=frame_to_is_right_hand_visible)
    cap.release()
    frame_count = -1
    left_hand_coords = None
    right_hand_coords = None
    cap = cv2.VideoCapture(video_path)
    def get_window(frame_dict):
        i = 0
        lastFalse = -1
        windowSize = 0
        while i in frame_dict:
            if frame_dict[i] == False:
                if lastFalse == -1:
                    lastFalse = i
            elif frame_dict[i] == True:
                if lastFalse != -1:
                    windowSize = i - lastFalse
                    if windowSize < 20:
                        for j in range(lastFalse, lastFalse + windowSize):
                            frame_dict[j] = True
                    lastFalse = -1
            i+=1
    get_window(frame_to_is_left_hand_visible)
    get_window(frame_to_is_right_hand_visible)
    frame_count = -1
    cap.set(1, 0)
    while cap.isOpened():
        frame_count += 1
        success, image = cap.read()
        if not success:
            print("Finished processing video.")
            break  # If no frames has been grabbed, exit the loop.
        process_frame(image, 
                      frame_count=frame_count,
                      frame_to_is_left_hand_visible=frame_to_is_left_hand_visible,
                      frame_to_is_right_hand_visible=frame_to_is_right_hand_visible)
    filename = f"{output_dir}/{ASL_word}/{ASL_video_number}.json"
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "w", encoding='utf-8') as file:
        json.dump(total_frame_json, file, ensure_ascii=False)
    cap.release()

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-f", "--file", dest="filename", required=True,
        help="Input video file path", metavar="FILE")
    parser.add_argument("-o", "--output", dest="output", required=True,
                        help="The output directory", metavar="FILE")
    args = parser.parse_args()
    filename = args.filename
    output_dir = args.output
    main(filename, output_dir)
