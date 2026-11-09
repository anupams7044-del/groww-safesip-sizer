import os
import subprocess
import time
from PIL import Image, ImageDraw, ImageFilter

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"C:\Users\HP\Downloads\Groww\Safe SIP Sizer\screenshots"
ARTIFACT_DIR = r"C:\Users\HP\.gemini\antigravity\brain\6a33589b-03fe-4bc4-a2e4-90a63b810942"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

screens = [
    {
        "name": "screen_1_landing",
        "url": "http://localhost:3000/?step=normal&hidePill=true",
        "title": "Screen 1: Groww Mutual Fund Setup with Safe SIP Prompt"
    },
    {
        "name": "screen_2_consent",
        "url": "http://localhost:3000/?step=consent&hidePill=true",
        "title": "Screen 2: RBI Account Aggregator (AA) Consent"
    },
    {
        "name": "screen_3_sizer",
        "url": "http://localhost:3000/?step=sizer&hidePill=true",
        "title": "Screen 3: Safe SIP Sizer (Math-Grounded Tiers & Date)"
    },
    {
        "name": "screen_4_share",
        "url": "http://localhost:3000/?step=confirmation&hidePill=true",
        "title": "Screen 4: Confirmation & Share Details"
    }
]

# 1. Capture Raw Mobile Screenshots using Headless Chrome
raw_files = []
for s in screens:
    raw_path = os.path.join(OUTPUT_DIR, f"{s['name']}_raw.png")
    # Chrome headless command
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--force-device-scale-factor=2",
        "--window-size=390,844",
        f"--screenshot={raw_path}",
        s["url"]
    ]
    print(f"Capturing {s['name']}...")
    subprocess.run(cmd, check=True)
    raw_files.append(raw_path)
    time.sleep(0.5)

print("All screenshots captured. Generating phone mockups...")

def create_phone_mockup(raw_img_path, output_path):
    # Load raw screenshot
    screen = Image.open(raw_img_path).convert("RGBA")
    sw, sh = screen.size # 780 x 1688 (2x of 390x844)

    # Phone dimensions
    bezel = 24
    outer_w = sw + bezel * 2
    outer_h = sh + bezel * 2
    corner_radius = 80
    inner_radius = 64

    # Target canvas with soft drop shadow margin
    margin = 80
    canvas_w = outer_w + margin * 2
    canvas_h = outer_h + margin * 2

    # Canvas with clean light gradient / transparent background
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    # Shadow layer
    shadow_mask = Image.new("L", (canvas_w, canvas_h), 0)
    shadow_draw = ImageDraw.Draw(shadow_mask)
    phone_box = [margin, margin + 10, margin + outer_w, margin + outer_h + 10]
    shadow_draw.rounded_rectangle(phone_box, radius=corner_radius, fill=110)
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(32))

    shadow_img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    shadow_img.putalpha(shadow_mask)
    canvas.paste(shadow_img, (0, 0), shadow_img)

    # Outer Phone Body (Titanium / Sleek dark chassis)
    phone_img = Image.new("RGBA", (outer_w, outer_h), (0, 0, 0, 0))
    phone_draw = ImageDraw.Draw(phone_img)
    # Bezel background
    phone_draw.rounded_rectangle([0, 0, outer_w, outer_h], radius=corner_radius, fill=(28, 30, 33, 255), outline=(60, 64, 67, 255), width=3)
    # Inner rim
    phone_draw.rounded_rectangle([bezel - 2, bezel - 2, outer_w - bezel + 2, outer_h - bezel + 2], radius=inner_radius + 2, outline=(15, 17, 20, 255), width=2)

    # Mask screen to rounded corners
    screen_mask = Image.new("L", (sw, sh), 0)
    screen_mask_draw = ImageDraw.Draw(screen_mask)
    screen_mask_draw.rounded_rectangle([0, 0, sw, sh], radius=inner_radius, fill=255)

    # Paste screen onto phone
    phone_img.paste(screen, (bezel, bezel), screen_mask)

    # Draw Dynamic Island / Speaker Pill at the top
    pill_w = 180
    pill_h = 44
    pill_x0 = (outer_w - pill_w) // 2
    pill_y0 = bezel + 18
    pill_draw = ImageDraw.Draw(phone_img)
    pill_draw.rounded_rectangle([pill_x0, pill_y0, pill_x0 + pill_w, pill_y0 + pill_h], radius=22, fill=(0, 0, 0, 255))
    # Camera dot
    camera_r = 6
    pill_draw.ellipse([pill_x0 + pill_w - 32, pill_y0 + (pill_h - camera_r*2)//2, pill_x0 + pill_w - 32 + camera_r*2, pill_y0 + (pill_h - camera_r*2)//2 + camera_r*2], fill=(20, 24, 35, 255))

    # Draw bottom home indicator bar
    bar_w = 210
    bar_h = 8
    bar_x0 = (outer_w - bar_w) // 2
    bar_y0 = outer_h - bezel - 16
    pill_draw.rounded_rectangle([bar_x0, bar_y0, bar_x0 + bar_w, bar_y0 + bar_h], radius=4, fill=(160, 165, 175, 200))

    # Paste phone onto canvas
    canvas.paste(phone_img, (margin, margin), phone_img)

    # Save
    canvas.save(output_path, "PNG")
    print(f"Generated phone mockup: {output_path}")
    return canvas

phone_images = []
for i, s in enumerate(screens):
    raw_path = raw_files[i]
    out_phone = os.path.join(OUTPUT_DIR, f"{s['name']}_phone.png")
    out_artifact = os.path.join(ARTIFACT_DIR, f"{s['name']}_phone.png")
    mock = create_phone_mockup(raw_path, out_phone)
    mock.save(out_artifact, "PNG")
    phone_images.append(mock)

# Also create a side-by-side composite of all 4 phone screens on a clean background
comp_w = 4 * 900 + 100
comp_h = 1950
composite = Image.new("RGBA", (comp_w, comp_h), (248, 250, 252, 255))
comp_draw = ImageDraw.Draw(composite)

for idx, p_img in enumerate(phone_images):
    # Resize slightly for crisp composite fit
    resized = p_img.resize((860, int(860 * p_img.height / p_img.width)), Image.Resampling.LANCZOS)
    x = 80 + idx * 890
    y = 80
    composite.paste(resized, (x, y), resized)

comp_out = os.path.join(OUTPUT_DIR, "all_4_screens_phone_mockups.png")
comp_art = os.path.join(ARTIFACT_DIR, "all_4_screens_phone_mockups.png")
composite.save(comp_out, "PNG")
composite.save(comp_art, "PNG")
print("Saved 4-screen composite mockup successfully!")
