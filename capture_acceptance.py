import subprocess
import os
import time
import shutil

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = r"C:\Users\HP\Downloads\Groww\Safe SIP Sizer\screenshots"
ART_DIR = r"C:\Users\HP\.gemini\antigravity\brain\6a33589b-03fe-4bc4-a2e4-90a63b810942"

shots = [
    {
        "name": "guide_screen1_phone.png",
        "url": "http://localhost:3000/?step=normal&resetGuide=true",
        "size": "390,844"
    },
    {
        "name": "guide_screen1_laptop.png",
        "url": "http://localhost:3000/?step=normal&resetGuide=true",
        "size": "1280,800"
    },
    {
        "name": "guide_screen2_phone.png",
        "url": "http://localhost:3000/?step=consent&resetGuide=true",
        "size": "390,844"
    },
    {
        "name": "guide_screen2_laptop.png",
        "url": "http://localhost:3000/?step=consent&resetGuide=true",
        "size": "1280,800"
    }
]

for s in shots:
    out_file = os.path.join(OUT_DIR, s["name"])
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--window-size={s['size']}",
        f"--screenshot={out_file}",
        s["url"]
    ]
    print(f"Capturing {s['name']} at {s['size']}...")
    subprocess.run(cmd, check=True)
    time.sleep(0.5)
    # copy to artifact dir
    art_file = os.path.join(ART_DIR, s["name"])
    shutil.copy(out_file, art_file)
    print(f"Saved to {art_file}")

print("All acceptance screenshots captured successfully!")
