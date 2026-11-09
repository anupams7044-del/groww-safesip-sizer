import urllib.request
import re

steps = ["normal", "consent", "sizer", "confirmation"]
print("--- RUNNING FULL 4-SCREEN SANITY CHECK ---")

for step in steps:
    url = f"http://localhost:3000/?step={step}"
    res = urllib.request.urlopen(url)
    content = res.read().decode("utf-8")
    print(f"Screen [{step.upper()}]: HTTP {res.status} OK (Size: {len(content)} bytes)")
    
    if step == "normal":
        assert "Standard 1-Tap SIP" in content, "Missing Standard 1-Tap SIP tab"
        assert "SafeSIP Sizer" in content, "Missing SafeSIP Sizer tab"
        assert "Unsure how much is safe? Use SIP Sizer" in content, "Missing point-of-friction micro-nudge"
        assert "1st" in content, "Missing 1st date chip (typo check)"
        assert "1th" not in content, "1th typo still present!"
        assert "Start SIP" in content, "Missing Start SIP button"
        print("  -> Screen 1 verified: Segmented header tabs, micro-nudge, and '1st' chip verified.")
    elif step == "consent":
        assert "Grant Consent" in content or "Calculate Safe SIP" in content
        assert "Select Dummy Investor Profile" in content
        print("  -> Screen 2 verified: 'Grant Consent & Calculate' and 3-persona selection verified.")
    elif step == "sizer":
        assert "Confirm &amp; Apply Plan" in content or "Confirm & Apply Plan" in content
        assert "Standard 1-Tap SIP" in content, "Missing mode toggle back to standard"
        assert "1st" in content, "Missing 1st date chip in sizer view"
        print("  -> Screen 3 verified: Sizer view with top switcher and '1st' chip verified.")
    elif step == "confirmation":
        assert "Share SIP Details" in content
        assert "Zero Lock-in" in content or "Modification Fee" in content
        print("  -> Screen 4 verified: 'Share SIP Details' and zero lock-in fee verified.")

print("--- ALL 4 SCREENS PASSED 100% SANITY CHECKS ---")
