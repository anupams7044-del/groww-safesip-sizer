import urllib.request

# 1. Fresh page with resetGuide=true
url_fresh = "http://localhost:3000/?step=normal&resetGuide=true"
html_fresh = urllib.request.urlopen(url_fresh).read().decode("utf-8")
assert "Start here: try the Safe SIP Resizer" in html_fresh, "Tooltip should be rendered on first visit"
print("[PASS] Tooltip is rendered on first visit.")

# 2. Check Screen 2 consent tooltip
url_consent = "http://localhost:3000/?step=consent&resetGuide=true"
html_consent = urllib.request.urlopen(url_consent).read().decode("utf-8")
assert "Click here to give consent *" in html_consent, "Consent tooltip should be rendered"
assert "100% safe · RBI-approved AA" in html_consent, "Safe phrase should be rendered"
assert "Zero personal details fetched" in html_consent, "No personal details phrase should be rendered"
assert "Read-only cashflow analysis only" in html_consent, "Read-only phrase should be rendered"
print("[PASS] Consent screen tooltip with all 4 short phrases rendered.")

print("All automated acceptance criteria verified!")
