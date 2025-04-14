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
``pip install -r requirements.txt``<br/>
``pip install -r requirements-patch.txt``

### 3. To Run the App
``uvicorn main:app --reload``

### 4. To Exit the Virtual Environment Run
``deactivate``