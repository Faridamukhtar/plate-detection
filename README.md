
# README: License Plate Detection and Recognition Project

## Overview
This project performs license plate detection and recognition using image processing techniques, HOG (Histogram of Oriented Gradients) features, and machine learning. It processes vehicle images to extract and classify license plate characters.

---

## Installation

### Prerequisites

- **Python**: Ensure Python 3.8+ is installed.
- **Node.js**: To run GUI

### Required Python Libraries
Install the required libraries using `pip`:
```bash
pip install numpy opencv-python scikit-image scikit-learn matplotlib
pip install tensorflow numpy matplotlib opencv-python scikit-learn
```
### Required Frontent (React) Libraries:
```bash
  cd frontend/PlatePal
  npm install
```
---

## Usage

### Dataset Preparation
1. Place the dataset in the `digits_dataset` directory.
2. Each subfolder in `digits_dataset` should represent a label (e.g., `0`, `1`, `A`, `B`, etc.) containing respective character images.

### Running the Project
The project consists of functions for:
- Image preprocessing
- License plate segmentation
- HOG feature extraction
- Training a classifier for character recognition

#### Steps to Execute

1. **To Build OCR CNN Model**:
   
   run OCRModel.ipynb

3. **To Run License Detector (Including Classifier Model Training + Backend) **:
   run FinalProject.ipynb

2. **To Run GUI**:
   ```bash
   cd frontend/PlatePal
   npm run dev
   ```
---

## How It Works
1. **Preprocessing**:
   - Resizes the input image.
   - Applies adaptive thresholding and morphological operations to segment the license plate.

2. **HOG Feature Extraction**:
   - Calculates gradient-based features for character classification.

3. **Classification**:
   - Uses a KNN classifier to predict characters based on HOG features.
