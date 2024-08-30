#!/bin/bash
# Example for how to generate a 2D Hands and Face ASL animation from a JSON file of points.
# Run this script from the top of the directory (./EgocentricASL)

# python3 ./Scripts/2dHandsFace/my_2d_hands_face_ASL_from_points.py -p -f ./ASL_JSON/write/64067.json
# The above line will just give you a preview of the animation instead of saving it to a file like below
python3 ./Scripts/2dHandsFace/my_2d_hands_face_ASL_from_points.py -f ./react-video/public/ASL_JSON/write/64067.json -o ./react-video/public/2D_HANDS_FACE_ASL