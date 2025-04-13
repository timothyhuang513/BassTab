from fastapi import FastAPI, File, UploadFile
import shutil
import os
import subprocess

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world! 🎸"}

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
        "spleeter", "separate",
        "-p", "spleeter:4stems",
        "-o", output_dir,
        "input.mp3"
    ])

    bass_path = os.path.join(output_dir, "input", "bass.wav")

    return {"message": f"Bass extracted from '{file.filename}'!", "bass_path": bass_path}

