"""
Extract faculty and course data from static HTML files into data.json
Run once to seed the data.json with existing content.
"""
import json
import re
from html.parser import HTMLParser

# ── Faculty extraction ───────────────────────────────────────
faculty_members = []
with open('faculty.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all profile-card blocks
pattern = r'<div class="profile-card scroll-reveal"[^>]*data-category="([^"]*)"[^>]*>(.*?)</div>\s*</div>'
# Better approach: use the btn-know-more-card data attributes
btn_pattern = re.compile(
    r'<button class="btn-know-more-card"\s+'
    r'data-bio="([^"]*)"\s+'
    r'data-edu="([^"]*)"\s+'
    r'data-email="([^"]*)"\s+'
    r'data-exp="([^"]*)"\s+'
    r'data-img="([^"]*)"\s+'
    r'data-name="([^"]*)"\s+'
    r'data-tag="([^"]*)"',
    re.DOTALL
)

# Also get the category
card_pattern = re.compile(
    r'<div class="profile-card scroll-reveal"\s*data-category="([^"]*)">(.*?)</div>\s*</div>\s*</div>',
    re.DOTALL
)

# Simpler: get category from each profile-card, then extract button data
cards = re.findall(r'<div class="profile-card scroll-reveal"[^>]*data-category="([^"]*)"[^>]*>(.*?)<button class="btn-know-more-card"', html, re.DOTALL)
buttons = btn_pattern.findall(html)

for i, btn in enumerate(buttons):
    bio, edu, email, exp, img, name, tag = btn
    category = cards[i][0] if i < len(cards) else 'uncategorized'
    faculty_members.append({
        "name": name,
        "tag": tag,
        "education": edu,
        "experience": exp,
        "email": email,
        "bio": bio,
        "image": img,
        "category": category
    })

print(f"Extracted {len(faculty_members)} faculty members")

# ── Courses extraction ───────────────────────────────────────
courses = []
with open('courses.html', 'r', encoding='utf-8') as f:
    chtml = f.read()

course_pattern = re.compile(
    r'<div class="course-card[^"]*"[^>]*data-category="([^"]*)"[^>]*>.*?'
    r'<img src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>.*?'
    r'<h3>(.*?)</h3>.*?'
    r'<p>(.*?)</p>',
    re.DOTALL
)

for match in course_pattern.finditer(chtml):
    category, image, alt, title, description = match.groups()
    # Only get courses from the coursesGrid section
    courses.append({
        "title": title.strip(),
        "description": description.strip(),
        "image": image.strip(),
        "category": category.strip()
    })

# Filter to only the 4 main courses (inside coursesGrid)
# The coursesGrid is between id="coursesGrid" and </section>
grid_section = re.search(r'id="coursesGrid">(.*?)</section>', chtml, re.DOTALL)
if grid_section:
    grid_html = grid_section.group(1)
    courses = []
    for match in course_pattern.finditer('<div class="course-card scroll-reveal" data-category="' + grid_html):
        pass
    # Simpler approach
    courses = []
    card_matches = re.findall(
        r'data-category="([^"]*)".*?<img src="([^"]*)".*?<h3>(.*?)</h3>.*?<p>(.*?)</p>',
        grid_html, re.DOTALL
    )
    for cat, img, title, desc in card_matches:
        courses.append({
            "title": title.strip(),
            "description": desc.strip(),
            "image": img.strip(),
            "category": cat.strip()
        })

print(f"Extracted {len(courses)} courses")

# ── Read existing data.json for home page data ───────────────
try:
    with open('data.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)
except:
    existing = {}

# ── Build final data.json ────────────────────────────────────
data = {
    "notice": existing.get("notice", ""),
    "images": existing.get("images", [existing["image"]] if existing.get("image") else []),
    "videos": existing.get("videos", [existing["video"]] if existing.get("video") else []),
    "faculty": faculty_members,
    "courses": courses,
    "about": existing.get("about", {}),
    "placements": existing.get("placements", []),
    "placementStats": existing.get("placementStats", {"total": "", "recruiters": "", "highest": ""}),
    "contact": existing.get("contact", {}),
    "sitemap": existing.get("sitemap", [])
}

# Clean empty strings from arrays
data["images"] = [x for x in data["images"] if x and x.strip()]
data["videos"] = [x for x in data["videos"] if x and x.strip()]

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"data.json written successfully!")
print(f"  - Notice: '{data['notice']}'")
print(f"  - Images: {len(data['images'])}")
print(f"  - Videos: {len(data['videos'])}")
print(f"  - Faculty: {len(data['faculty'])}")
print(f"  - Courses: {len(data['courses'])}")
