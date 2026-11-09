import urllib.request
import re

steps = ["normal", "consent", "sizer", "confirmation"]
print("--- RUNNING FULL 4-SCREEN SANITY CHECK ---")

for step in steps:
    url = f"http://localhost:3000/?step={step}"
    res = urllib.request.urlopen(url)
    content = res.read().decode("utf-8")
    print(f"Screen [{step.upper()}]: HTTP {res.status} OK (Size: {len(content)} bytes)")
    
    # Check key buttons exist in DOM
    if step == "normal":
        assert "Switch to SIP Sizer" in content, "Missing Switch to SIP Sizer button"
        assert "Start SIP" in content, "Missing Start SIP button"
        print("  -> Screen 1 verified: Both 'Switch to SIP Sizer' and 'Start SIP' exist.")
    elif step == "consent":
        assert "Grant Consent" in content or "Calculate Safe SIP" in content
        print("  -> Screen 2 verified: 'Grant Consent & Calculate' exists.")
    elif step == "sizer":
        assert "Confirm &amp; Apply Plan" in content or "Confirm & Apply Plan" in content
        print("  -> Screen 3 verified: 'Confirm & Apply Plan' exists.")
    elif step == "confirmation":
        assert "Share SIP Details" in content
        print("  -> Screen 4 verified: 'Share SIP Details' exists.")

print("--- ALL 4 SCREENS PASSED 100% SANITY CHECKS ---")
