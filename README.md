# Egocentric ASL

![EgocentricASL Video Example](./Assets/EgocentricQuadMin.gif)

This project is focused on converting ASL instructional videos into a series of keypoints that are modified to be from the user's perspective. Read more about it in the [report](./Assets/EgocentricASL.pdf).

## Contents

This repo contains scripts that generate JSON files of all keypoints found in the [WLASL_300 dataset](https://github.com/dxli94/WLASL). It is composed of over 900 videos. Note that the videos and keypoints must be generated on your local machine due to size constraints on github.

```
EgocentricASL
├── Scripts
|   ├── 2dHands
|   │   ├── Example2dHands.sh
|   │   └── my_2d_hands_ASL_from_points.py
|   ├── 2dHandsFace
|   │   ├── Example2dHandsFace.sh
|   │   └── my_2d_hands_face_ASL_from_points.py
|   ├── 3dHands
|   │   ├── Example3dHands.sh
|   │   └── my_3d_hands_ASL_from_points.py
|   ├── 3dHandsFace
|   │   ├── Example3dHandsFace.sh
|   │   └── my_3d_hands_face_ASL_from_points.py
|   ├── GenPoints # Generates the JSON files that all animation types use
|   │   ├── ExampleGenPoints.sh
|   │   └── generate_ASL_points.py
|   └── Pipeline # End-to-end creation of the JSON files and all animation types
|   |   ├── ExamplePipeline.sh
|   |   └── Pipeline.py
├── EgocentricASL.pdf # A report about this project
├── .gitignore
├── README.md
├── Assets # Used in the README
├── react-video # The visualizer written in React using Vite
│   ├── node_modules
│   ├── public # Where all your animations should be in order to use them in the visualizer
|   |   ├── 2D_HANDS_ASL
|   |   ├── 2D_HANDS_FACE_ASL
|   |   ├── 3D_HANDS_ASL
|   |   ├── 3D_HANDS_FACE_ASL
|   |   ├── ASL_JSON
│   ├── src # React code in this folder
│   ├── .gitignore
```

## Dataset
We use the [WLASL_300 dataset](https://github.com/dxli94/WLASL).

## Video Types
![Video Types](./Assets/TypesQuadMin.gif)

We provide four video formats that can be chosen from. They include 2D hands, 2D hands and face, 3D hands, and 3D hands and face. These formats all modify the perspective to be from the user's perspective. Note that all videos can be created from the ASL_JSON folder. They ingest the same keypoint data but output their own different animations.

## Using the visualizer
![The Visualizer](./Assets/VisualizerMin.gif)

The visualizer was created using React with Vite to make it easier to view large quantities of videos. 

To run the visualizer, make sure that you have the folders in the same layout as the tree above. Then, run the following commands in ```./react-video```:
```
npm install
npm run dev
```

## Documented Problems and Solutions

### Problematic videos

Some of the videos still contain issues that we were unable to automatically resolve. We have listed all videos with these problems in the WLASL_300 dataset:

```python3
disappearing_hands = ['write/64067', 'accident/00618', 'music/68105', 'sick/68152', 'husband/28470', 'sandwich/49244', 'sandwich/49253', 'again/01469', 'interest/30153', 'change/09945', 'like/68093', 'study/55356', 'week/62728', 'walk/62152', 'behind/05814', 'arrive/03434', 'arrive/03443', 'meet/68099', 'person/42234', 'hard/68065', 'cheese/10260', 'crash/13810', 'crash/69284', 'crash/13809']
```