import urllib.request

url_fresh = "http://localhost:3000/?step=normal&resetGuide=true"
html_fresh = urllib.request.urlopen(url_fresh).read().decode("utf-8")
assert "Need help calculating your safe SIP amount? Tap here" in html_fresh, "Updated popup text should be rendered"
print("[PASS] Updated popup text 'Need help calculating your safe SIP amount? Tap here' verified!")

url_consent = "http://localhost:3000/?step=consent&resetGuide=true"
html_consent = urllib.request.urlopen(url_consent).read().decode("utf-8")
assert "Click here to give consent *" in html_consent
print("[PASS] Consent screen verified!")
