# BassTab
Takes in an mp3 file and returns a tab  of the bass that is played in the mp3.

## Project Setup Instructions
## Frontend
Before doing any of the steps below, cd into the frontend folder
### 1. Install node_modules
``npm install``

### 2. Run the Dev Environment
``npm run dev``

## Backend
Before doing any of the steps below, cd into the backend folder
### 1. Create a Virtual Environment
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```
```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install fastapi uvicorn spleeter crepe librosa python-multipart soundfile
```

```bash
pip install numpy==1.22.4
pip install llvmlite==0.38.1
pip install numba==0.55.2
```
-or- (the bottom one is broken for me)
```bash
pip install -r requirements.txt
pip install -r requirements-patch.txt
```

### 3. To Run the App
``python -m uvicorn main:app --reload``

### 4. To Exit the Virtual Environment Run
``deactivate``