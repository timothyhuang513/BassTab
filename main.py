from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
import sys
import subprocess
from audio_utils import split_audio, generate_tab_data

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world! 🎸"}

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    with open("input.mp3", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    split_audio()
    tab_data = generate_tab_data()
    
    return JSONResponse(content=tab_data)


@app.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):
    # Takes the uploaded file and saves it to the server
    with open("input.mp3", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # make an output directory for the outputted file (isolated bass)
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)

    # use spleeter to separate the audio
    subprocess.run([
        sys.executable, "-m", "spleeter", "separate",
        "-p", "spleeter:4stems",
        "-o", "output",
        "input.mp3"
    ])

    bass_path = os.path.join(output_dir, "input", "bass.wav")

    return {"message": f"Bass extracted from '{file.filename}'!", "bass_path": bass_path}

