from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os
import sys
import subprocess
from audio_utils import split_audio, generate_tab_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, world! 🎸"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    with open("input.mp3", "wb") as f:
        shutil.copyfileobj(file.file, f)

    bass_path = split_audio("input.mp3")
    return {"message": "Bass isolated", "bass_path": bass_path}

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    with open("input.mp3", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    split_audio()
    tab_data = generate_tab_data()
    
    return JSONResponse(content=tab_data)