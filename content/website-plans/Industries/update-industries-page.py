#!/usr/bin/env python3
"""
Update the Industries page on databender.co with new Elementor design.
"""

import json
import urllib.request
import base64
import random
import string

# WordPress credentials
SITE_URL = "https://databender.co"
USERNAME = "grant"
APP_PASSWORD = "lnNa 4sE9 XUz8 S40P eUJr Usbr"
PAGE_ID = 16861  # Industries page

# Create auth header
auth = base64.b64encode(f"{USERNAME}:{APP_PASSWORD}".encode()).decode()

def generate_element_id():
    """Generate a random 7-character element ID like Elementor uses."""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))

def add_element_ids(data):
    """Recursively add proper Elementor element IDs to the data structure."""
    if isinstance(data, list):
        for item in data:
            add_element_ids(item)
    elif isinstance(data, dict):
        if 'id' in data:
            data['id'] = generate_element_id()
        if 'elements' in data:
            add_element_ids(data['elements'])
    return data

# Load the Elementor JSON
with open('/Users/grantbender/Databender/Biz Functions/Sales & Marketing/Channels/Website/Website Plans/Industries/industries-elementor.json', 'r') as f:
    elementor_data = json.load(f)

# Add proper element IDs
elementor_data = add_element_ids(elementor_data)

# Convert to JSON string
elementor_json = json.dumps(elementor_data)

# Prepare the payload - we need to update the meta field
payload = {
    "meta": {
        "_elementor_data": elementor_json,
        "_elementor_edit_mode": "builder",
        "_elementor_template_type": "wp-page",
        "_elementor_version": "3.18.0"
    }
}

# First, let's try to update via the pages endpoint
print("Attempting to update Industries page via REST API...")
print(f"Page ID: {PAGE_ID}")
print(f"Data length: {len(elementor_json)} characters")

try:
    req = urllib.request.Request(
        f"{SITE_URL}/wp-json/wp/v2/pages/{PAGE_ID}",
        json.dumps(payload).encode(),
        method='POST'
    )
    req.add_header('Content-Type', 'application/json')
    req.add_header('Authorization', f'Basic {auth}')

    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode())
    print(f"Response status: {response.status}")
    print(f"Page updated: {result.get('link')}")
    print("\nNote: If meta fields didn't update, you may need to import manually.")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(f"Response: {e.read().decode()}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*60)
print("MANUAL IMPORT INSTRUCTIONS")
print("="*60)
print("""
If the REST API update didn't apply the Elementor changes:

1. Go to: https://databender.co/wp-admin/post.php?post=16861&action=elementor
2. Click the hamburger menu (☰) in the top-left
3. Click "Site Settings" or go to the page settings
4. Or use Elementor's Import/Export:
   - In Elementor editor, click hamburger menu
   - Go to "Tools" > "Import Template"
   - Upload the JSON file or copy/paste

Alternative - Use Elementor's Template Library:
1. Save current page as template (backup)
2. Delete all sections
3. Click "Add Template" (folder icon)
4. Import the JSON as a template

The JSON file is saved at:
industries-elementor.json
""")

# Also output the minified JSON for clipboard copying
print("\n" + "="*60)
print("ELEMENTOR JSON (for manual paste)")
print("="*60)
print(f"\nJSON saved to: industries-elementor.json")
print(f"Total sections: {len(elementor_data)}")
print("\nSections in this design:")
for section in elementor_data:
    section_id = section.get('id', 'unknown')
    print(f"  - {section_id}")
