import math
import librosa
import crepe
import subprocess
import os
import sys

########################
# Splitting Audio ######
########################
def split_audio():
    subprocess.run([
        sys.executable, "-m", "spleeter", "separate",
        "-p", "spleeter:4stems",
        "-o", "output",
        "input.mp3"
    ])
        

###########################
# Turning into tabs #######
###########################
string_tuning = {
    "E": 40, "A": 45, "D": 50, "G": 55
}

def hz_to_midi(freq):
    return round(69 + 12 * math.log2(freq / 440.0))

def get_tab_position(midi_note):
    for string, tuning in reversed(string_tuning.items()):
        fret = midi_note - tuning
        if 0 <= fret <= 24:
            return string, fret
    return None, None

def generate_tab_data(bass_path="output/input/bass.wav"):
    y, sr = librosa.load(bass_path, sr=16000, mono=True)

    time, frequency, confidence, _ = crepe.predict(
        y, sr,
        viterbi=True,
        step_size=10,
        model_capacity='full'
    )

    tab_data = []
    for t, f, c in zip(time, frequency, confidence):
        if c < 0.8:
            continue
        try:
            midi_note = hz_to_midi(f)
            string, fret = get_tab_position(midi_note)
            if string is not None and fret is not None:
                tab_data.append({
                    "time": round(t, 2),
                    "string": string,
                    "fret": fret
                })
        except:
            continue
    
    # print("tab_data:", tab_data)
    return tab_data
