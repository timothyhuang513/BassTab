import math
import librosa
import crepe
import subprocess
import os
import sys

########################
# Splitting Audio ######
########################
def split_audio(input_path="input.mp3", model="mdx_q"):
    output_dir = "output"

    result = subprocess.run([
        sys.executable, "-m", "demucs",
        "--two-stems", "bass",
        "-n", model,
        "-o", output_dir,
        input_path
    ], capture_output=True, text=True)

    if result.returncode != 0:
        print("❌ Demucs failed:")
        print("STDERR:", result.stderr)
        print("STDOUT:", result.stdout)
        raise RuntimeError("Demucs failed")

    base = os.path.splitext(os.path.basename(input_path))[0]
    return f"output/{model}/{base}/bass.wav"

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

def clean_tabs(tab_data):
    min_gap=0.1
    filtered = []
    last_notes = {} # key = (string, fret), value = last time seen

    for note in tab_data:
        key = (note["string"], note["fret"])
        last_time = last_notes.get(key, -float("inf"))


        if note["time"] - last_time >= min_gap:
            filtered.append(note)
            last_notes[key] = note["time"]
    
    return filtered

def generate_tab_data(bass_path="output/mdx_q/input/bass.wav"):
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
    
    return clean_tabs(tab_data)