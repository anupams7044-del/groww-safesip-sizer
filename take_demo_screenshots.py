import subprocess
import shutil
import os
import time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ART_DIR = r"C:\Users\HP\.gemini\antigravity\brain\6a33589b-03fe-4bc4-a2e4-90a63b810942"
LOCAL_DIR = r"C:\Users\HP\Downloads\Groww\Safe SIP Sizer\screenshots"

os.makedirs(LOCAL_DIR, exist_ok=True)
os.makedirs(ART_DIR, exist_ok=True)

targets = [
    # Landing page with "Built for every income pattern" strip
    ("landing_strip_phone.png", "390,844", "http://localhost:3000/?step=normal"),
    ("landing_strip_laptop.png", "1280,850", "http://localhost:3000/?step=normal"),

    # Consent page with "Just exploring? Try with a sample profile"
    ("consent_demo_phone.png", "390,844", "http://localhost:3000/?step=consent"),
    ("consent_demo_laptop.png", "1280,850", "http://localhost:3000/?step=consent"),

    # Priya Nair (Fresher · ₹2,000 Safe SIP · 5th)
    ("sizer_priya_phone.png", "390,844", "http://localhost:3000/?step=sizer&persona=priya"),
    ("sizer_priya_laptop.png", "1280,950", "http://localhost:3000/?step=sizer&persona=priya"),

    # Rohan Das (Freelancer · ₹5,000 Safe SIP · 10th)
    ("sizer_rohan_phone.png", "390,844", "http://localhost:3000/?step=sizer&persona=rohan"),
    ("sizer_rohan_laptop.png", "1280,950", "http://localhost:3000/?step=sizer&persona=rohan"),

    # Arjun Mehta (Teacher with Heavy EMIs · ₹4,500 Safe SIP · 5th)
    ("sizer_arjun_phone.png", "390,844", "http://localhost:3000/?step=sizer&persona=arjun"),
    ("sizer_arjun_laptop.png", "1280,950", "http://localhost:3000/?step=sizer&persona=arjun"),
]

for filename, win_size, url in targets:
    local_path = os.path.join(LOCAL_DIR, filename)
    art_path = os.path.join(ART_DIR, filename)
    
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--window-size={win_size}",
        f"--screenshot={local_path}",
        url
    ]
    
    print(f"Capturing {filename} at {win_size} from {url}...")
    subprocess.run(cmd, check=True)
    shutil.copy(local_path, art_path)
    print(f"Saved: {art_path}")

print("All demo mode screenshots captured successfully!")
