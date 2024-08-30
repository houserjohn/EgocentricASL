# Script responsible for generating all video types (2d, 3d, hands, no hands)
# Arguments:
# -p --points: will generate all the JSON files of points from the videos from the WLASL path into the ASL JSON path
# -j --hands2d: will generate all hands only 2d animations from the ASL JSON path into the 2d hands path
# -w --handsface2d: will generate all hands and face 2d animations from the ASL JSON path into the 2d hands face path
# -n --hands3d: will genreate all hands only 3d animations from the ASL JSON path into the 3d hands path
# -s --handsface3d: will generate all hands and face 3d animations from the ASL JSON path into the 3d hands face path

# ALL PATHS ARE RELATIVE TO ROOT (./EgocentricASL)
MY_WLASL_FOLDER_PATH: str = "./react-video/public/WLASL_300"
MY_ASL_JSON_FOLDER_PATH: str = "./react-video/public/ASL_JSON"
MY_2D_HANDS_ASL_FOLDER_PATH: str = "./react-video/public/2D_HANDS_ASL"
MY_2D_HANDS_FACE_ASL_FOLDER_PATH: str = "./react-video/public/2D_HANDS_FACE_ASL"
MY_3D_HANDS_ASL_FOLDER_PATH: str = "./react-video/public/3D_HANDS_ASL"
MY_3D_HANDS_FACE_ASL_FOLDER_PATH: str = "./react-video/public/3D_HANDS_FACE_ASL"

# Get all videos from WLASL

import os
import sys
from argparse import ArgumentParser

sys.path.append(os.path.abspath("./Scripts/GenPoints"))
sys.path.append(os.path.abspath("./Scripts/2dHands"))
sys.path.append(os.path.abspath("./Scripts/2dHandsFace"))
sys.path.append(os.path.abspath("./Scripts/3dHands"))
sys.path.append(os.path.abspath("./Scripts/3dHandsFace"))
import generate_ASL_points
import my_2d_hands_ASL_from_points
import my_2d_hands_face_ASL_from_points
import my_3d_hands_ASL_from_points
import my_3d_hands_face_ASL_from_points

def main(points, hands2d, handsface2d, hands3d, handsface3d):
    if points:
        ASL_words: list[str] = os.listdir(MY_WLASL_FOLDER_PATH)
        for word in ASL_words:
            video_numbers: list[str] = os.listdir(f"{MY_WLASL_FOLDER_PATH}/{word}")
            for video_number in video_numbers:
                full_video_path: str = f"{MY_WLASL_FOLDER_PATH}/{word}/{video_number}"
                print(full_video_path)
                generate_ASL_points.main(full_video_path, MY_ASL_JSON_FOLDER_PATH)
    ASL_JSON_words: list[str] = os.listdir(MY_ASL_JSON_FOLDER_PATH)
    for word in ASL_JSON_words:
        numbers: list[str] = os.listdir(f"{MY_ASL_JSON_FOLDER_PATH}/{word}")
        for number in numbers:
            full_json_path: str = f"{MY_ASL_JSON_FOLDER_PATH}/{word}/{number}"
            print(full_json_path)
            if hands2d:
                my_2d_hands_ASL_from_points.main(full_json_path, MY_2D_HANDS_ASL_FOLDER_PATH, False)
            if handsface2d:
                my_2d_hands_face_ASL_from_points.main(full_json_path, MY_2D_HANDS_FACE_ASL_FOLDER_PATH, False)
            if hands3d:
                my_3d_hands_ASL_from_points.main(full_json_path, MY_3D_HANDS_ASL_FOLDER_PATH, False)
            if handsface3d:
                my_3d_hands_face_ASL_from_points.main(full_json_path, MY_3D_HANDS_FACE_ASL_FOLDER_PATH, False)

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-p", "--points", dest="points", action='store_true', required=False,
        help="Generate all point json files")
    parser.add_argument("-j", "--hands2d", dest="hands2d", action='store_true', required=False,
        help="Generate all hands 2d animations")
    parser.add_argument("-w", "--handsface2d", dest="handsface2d", action='store_true', required=False,
        help="Generate all hands face 2d animations")
    parser.add_argument("-n", "--hands3d", dest="hands3d", action='store_true', required=False,
        help="Generate all hands 3d animations")
    parser.add_argument("-s", "--handsface3d", dest="handsface3d", action='store_true', required=False,
        help="Generate all hands face 3d animations")
    args = parser.parse_args()
    points = args.points
    hands2d = args.hands2d
    handsface2d = args.handsface2d
    hands3d = args.hands3d
    handsface3d = args.handsface3d
    main(points, hands2d, handsface2d, hands3d, handsface3d)
    
