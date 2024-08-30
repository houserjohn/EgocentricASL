# This script is responsible for taking a JSON file of keypoints and transforming it to an animation video.

import mediapipe as mp
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import matplotlib.animation as animation
import numpy as np
from math import inf
from argparse import ArgumentParser
import matplotlib as mpl 
import re
import json
# Include your path to the ffmpeg binary here
mpl.rcParams['animation.ffmpeg_path'] = r'/Users/johnhouser/bin/ffmpeg'

# Initialize MediaPipe Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, model_complexity=2, enable_segmentation=False)
connections = mp_pose.POSE_CONNECTIONS

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.5)
hand_connections = mp_hands.HAND_CONNECTIONS

frame_count = -1
total_frame_count = -1
# use these constants (since they are swapped)
LEFT_HAND = "Right" 
RIGHT_HAND = "Left"

# Function to rotate points around the Y-axis
def rotate_y(points, degrees):
    theta = np.radians(degrees)
    c, s = np.cos(theta), np.sin(theta)
    R = np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
    return np.dot(points, R)

# Draw the points on the screen
def update_plot(frame, all_frame_points, scat, lines, hand_lines_left, hand_lines_right):
    for hand_lines in [hand_lines_left, hand_lines_right]:
        for line, conn in zip(hand_lines, hand_connections):
            line.set_data(np.array([]),
                np.array([]))
            line.set_3d_properties(np.array([]))

    global total_frame_count
    global frame_count
    frame_count += 1

    if frame_count >= total_frame_count:
        return

    current_frame_points = all_frame_points[frame_count]

    pose_points = current_frame_points.get('pose', None)
    if pose_points is not None:
        pose_points = eval('np.array(' + pose_points + ')')

    left_hand_points = current_frame_points.get('left_hand', None)
    if left_hand_points is not None:
        left_hand_points = eval('np.array(' + left_hand_points + ')')

    right_hand_points = current_frame_points.get('right_hand', None)
    if right_hand_points is not None:
        right_hand_points = eval('np.array(' + right_hand_points + ')')

    if pose_points is not None:
        offsets3d = pose_points

    if left_hand_points is not None:
        offsets3d = np.concatenate([offsets3d, left_hand_points])  

    if right_hand_points is not None:
        offsets3d = np.concatenate([offsets3d, right_hand_points])

    offsets3d = rotate_y(offsets3d, 180)

    if pose_points is not None:
        for line, conn in zip(lines, connections):
            tmp_points = rotate_y(pose_points, 180)
            line.set_data(np.array([tmp_points[conn[0], 0], tmp_points[conn[1], 0]]),
                        np.array([tmp_points[conn[0], 2], tmp_points[conn[1], 2]]))
            line.set_3d_properties(np.array([tmp_points[conn[0], 1], tmp_points[conn[1], 1]]))

    if right_hand_points is not None:
        tmp_points = rotate_y(right_hand_points, 180)
        for line, conn in zip(hand_lines_right, hand_connections):
            line.set_data(np.array([tmp_points[conn[0], 0], tmp_points[conn[1], 0]]),
                            np.array([tmp_points[conn[0], 2], tmp_points[conn[1], 2]]))
            line.set_3d_properties(np.array([tmp_points[conn[0], 1], tmp_points[conn[1], 1]]))

    if left_hand_points is not None:
        tmp_points = rotate_y(left_hand_points, 180)
        for line, conn in zip(hand_lines_left, hand_connections):
            line.set_data(np.array([tmp_points[conn[0], 0], tmp_points[conn[1], 0]]),
                            np.array([tmp_points[conn[0], 2], tmp_points[conn[1], 2]]))
            line.set_3d_properties(np.array([tmp_points[conn[0], 1], tmp_points[conn[1], 1]]))

    scat._offsets3d = (offsets3d[:, 0], offsets3d[:, 2], offsets3d[:, 1])

    return scat, lines

def main(filepath, output_dir, preview):
    global frame_count
    global total_frame_count
    frame_count = -1
    total_frame_count = -1
    # ex: ../../again/01457.json
    match_regex = ".*/([^/]*)/([^/]*).json"
    text = re.search(match_regex, filepath)
    ASL_word = text.group(1)
    ASL_video_number = text.group(2)
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.set_xlim(-0.7, 0.7)
    ax.set_ylim(-0.1, 0.5)
    ax.set_zlim(-1, 0.1)
    ax.set_xlabel('X')
    ax.set_ylabel('Z')
    ax.set_zlabel('Y')  # Setting Y as the vertical axis
    ax.invert_zaxis()  # Invert the Y-axis so negative values are upwards
    ax.view_init(elev=-0., azim=-90)

    # Create a scatter plot
    scat = ax.scatter([], [], [])

    # Create lines for the connections
    lines = [ax.plot([], [], [], 'gray')[0] for _ in connections]
    hand_lines_left = [ax.plot([], [], [], 'gray')[0] for _ in hand_connections]
    hand_lines_right = [ax.plot([], [], [], 'gray')[0] for _ in hand_connections]
    
    frame_count = -1

    plt.title(f"{ASL_word} {ASL_video_number}")

    with open(filepath, "r") as file:
        data = "".join([line for line in file])
        total_frames_json = json.loads(data)

    total_frame_count = len(total_frames_json)

    ani = FuncAnimation(fig, update_plot, frames=total_frame_count, fargs=(total_frames_json, scat, lines, hand_lines_left, hand_lines_right), interval=50)
    FFwriter = animation.FFMpegWriter(fps=10)
    if not preview: 
        filename = f"{output_dir}/{ASL_word}{ASL_video_number}.mp4"
        ani.save(filename, writer = FFwriter)
    else:
        plt.show()
    plt.close()

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-f", "--file", dest="filename",
        help="Video file path", metavar="FILE")
    parser.add_argument("-o", "--output", dest="output", required=False,
        help="Output file path", metavar="FILE")
    parser.add_argument("-p", "--preview", action='store_true', dest="preview", required=False,
        help="Preview the video instead of writing it somewhere")
    args = parser.parse_args()
    filename = args.filename
    output = args.output
    preview = args.preview
    main(filename, output, preview)
