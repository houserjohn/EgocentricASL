# This script is to help generate a list of all videos in a folder to display in the visualizer
# Call this script from the root (./EgocentricASL)

PREFIX_PATH: str = "./react-video/public/"
FOLDER_PATH: str = f"{PREFIX_PATH}/2D_HANDS_FACE_ASL"
OUTPUT_FILENAME: str = f"{PREFIX_PATH}/FILENAMES.txt"

import os

video_files: list[str] = os.listdir(FOLDER_PATH)

with open(OUTPUT_FILENAME, "w") as file:
    file.write("let videos = [")
    for video_file in video_files:
        file.write(f"\"{video_file}\",")
    file.write("]")

