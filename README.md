# isolate-bass
Takes in an mp3 file and returns a tab  of the bass that is played in the mp3.

## Project Setup Instructions
### Backend
Before doing any of the steps below, cd into the backend folder
#### 1. Create a Virtual Environment
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

#### 2. Install Dependencies
``pip install -r requirements.txt``

#### 3. To Run the App
``uvicorn main:app --reload``

#### 4. To Exit the Virtual Environment Run
``deactivate``