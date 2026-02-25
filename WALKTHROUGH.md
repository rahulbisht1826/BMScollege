# BMS COLLEGE OF COMMERCE & MANAGEMENT — Website Walkthrough

> **Last Updated:** February 2026  
> **Tech Stack:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla), Font Awesome 6.6.0, Google Fonts (Poppins)  
> **Hosted on:** GitHub Pages via [github.com/rahulbisht1826/BMScollege](https://github.com/rahulbisht1826/BMScollege)

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Global Components (Shared Across All Pages)](#2-global-components-shared-across-all-pages)
3. [Page-by-Page Breakdown](#3-page-by-page-breakdown)
   - [Home Page (index.html)](#31-home-page--indexhtml)
   - [About Page (about.html)](#32-about-page--abouthtml)
   - [Courses Page (courses.html)](#33-courses-page--courseshtml)
   - [Faculty Page (faculty.html)](#34-faculty-page--facultyhtml)
   - [Placement Page (placement.html)](#35-placement-page--placementhtml)
   - [Contact Page (contact.html)](#36-contact-page--contacthtml)
   - [Login Page (login.html)](#37-login-page--loginhtml)
   - [Sitemap Page (sitemap.html)](#38-sitemap-page--sitemaphtml)
   - [404 Page (404.html)](#39-404-page--404html)
4. [Stylesheet Guide (style.css)](#4-stylesheet-guide--stylecss)
5. [JavaScript Guide (script.js)](#5-javascript-guide--scriptjs)
6. [Images & Media](#6-images--media)
7. [How to Add / Update Content](#7-how-to-add--update-content)
8. [Important Notes & Gotchas](#8-important-notes--gotchas)

---

## 1. Project Structure

```
college website/
├── images/                  # All images (faculty photos, logo, icons)
│   ├── logo.png             # College crest logo (used as favicon + header logo)
│   ├── menu_icon.svg        # Hamburger menu icon for mobile
│   ├── image1.jpeg          # Faculty photo: SRI. AVIRAM SHARMA
│   ├── image2.jpeg          # Faculty photo: Dr. Pankaj Choudhary
│   ├── ...                  # image1 through image49 are faculty photos
│   └── image49.jpeg         # Faculty photo: Prerana S
│
├── video/                   # Video files used on the About page
│   ├── 32aa32b3...720w.mp4  # Local video: Aerial Campus View
│   └── ec0266fb...944.mp4   # Local video: Student Connections
│
├── .github/workflows/       # GitHub Actions (deployment)
│
├── index.html               # HOME PAGE — main landing page
├── about.html               # ABOUT PAGE — campus info, gallery, video stack
├── courses.html             # COURSES PAGE — course catalog with search/filter
├── faculty.html             # FACULTY PAGE — 49 faculty profile cards + modal
├── placement.html           # PLACEMENT PAGE — placement info (under development)
├── contact.html             # CONTACT PAGE — contact form + Google Maps
├── login.html               # LOGIN PAGE — login/register forms + Google Sign-In
├── sitemap.html             # SITEMAP PAGE — visual tree-style sitemap
├── 404.html                 # 404 PAGE — animated error page with countdown redirect
│
├── sitemap.xml              # XML SITEMAP — machine-readable sitemap for search engines
├── robots.txt               # ROBOTS.TXT — crawler instructions & sitemap reference
├── style.css                # GLOBAL STYLESHEET — all CSS for the entire site
├── script.js                # GLOBAL JAVASCRIPT — all JS logic for the entire site
└── WALKTHROUGH.md           # THIS FILE — documentation
```

---

## 2. Global Components (Shared Across All Pages)

### 2.1 Header (Top Bar + Main Header)

Every page has a **two-part header**:

#### Top Bar (`<div class="top-bar">`)
- Contains the **"Register Now"** button that links to `login.html`
- The button uses the `.btn-register` class with a Font Awesome `fa-user-plus` icon
- **IMPORTANT:** This button MUST be identical across all pages:
  ```html
  <a href="login.html" class="btn-register">Register Now <i class="fa-solid fa-user-plus"></i></a>
  ```

#### Main Header (`<div class="main-header">`)
- **Logo:** College crest image (`images/logo.png`) inside `.logo-icon-wrap`, followed by text:
  - `.logo-title` → "BMS"
  - `.logo-sub` → "COLLEGE OF COMMERCE & MANAGEMENT"
- **Navigation:** 6 links — Home, About, Courses, Faculty, Placement, Contact
  - The **active page** has `class="active"` on its `<a>` tag
- **Hamburger Menu:** Visible on mobile (< 768px), toggles the nav menu
  - Uses `images/menu_icon.svg`
  - JavaScript handles the toggle in `script.js` (lines 28-68)

#### Sticky Header Behavior
- When scrolling past 50px, the header gets `.scrolled` class (adds shadow, reduces size)
- Handled in `script.js` (lines 18-26)

### 2.2 Favicon
- All pages include: `<link rel="icon" type="image/png" href="images/logo.png">`
- Uses the college crest as the browser tab icon

### 2.3 Footer

Every page (except `login.html` and `404.html`) has an identical footer with:
- **Column 1:** College name + tagline + social media icons (Facebook, X/Twitter, Instagram, LinkedIn)
  - All social links include `aria-label` for screen reader accessibility (e.g., `aria-label="Follow us on Facebook"`)
- **Column 2:** Quick Links (About Us, Courses, Contact, Sitemap, Admin Dashboard)
- **Column 3:** Contact info (email, phone, address)
- **Column 4:** Newsletter subscription form
- **Footer Bottom:** Copyright notice

### 2.4 External Dependencies
- **Google Fonts:** Poppins (weights: 300, 400, 500, 600, 700)
- **Font Awesome 6.6.0:** Icon library loaded from CDN
- **No frameworks** (no Bootstrap, Tailwind, React, etc.) — pure vanilla HTML/CSS/JS

### 2.5 Scroll Reveal Animations
- Elements with class `.scroll-reveal` animate in when they enter the viewport
- Uses Intersection Observer API in `script.js` (lines 1-16)
- Add `.delay-1` or `.delay-2` for staggered entrance effects

### 2.6 Accessibility & Performance
- **ARIA Labels**: All interactive elements (buttons, links, social icons) have descriptive `aria-label` attributes.
- **Image Optimization**: All images include `width`, `height`, `loading="lazy"`, and `decoding="async"` attributes to improve Core Web Vitals (CLS and LCP).
- **Contrast**: UI colors have been adjusted for WCAG AA compliance (especially `--text-light` and header backgrounds).
- **Focus Management**: The faculty modal handles focus trapping for keyboard navigation.

---

## 3. Page-by-Page Breakdown

### 3.1 Home Page — `index.html`

**Title:** `BMS COLLEGE OF COMMERCE & MANAGEMENT`

**Sections:**

| Section | Description |
|---------|-------------|
| **Hero** | Full-width banner with overlay. Contains heading "The Premium System Education" and subtitle. Background image is defined in CSS (`.hero` class). |
| **Features** | 3 feature cards in a grid: Online Courses, Expert Teachers, Big Library. Each has an icon (`.icon-box`), title, and description. |
| **Popular Courses** | 3 course cards (Web Development, Data Science, UI/UX Design). Each card has: course image (from Unsplash), instructor name, rating, description, author avatar, and student count. |
| **Footer** | Standard footer. |

**Key Notes:**
- The hero section does NOT have a search bar (it was removed intentionally)
- Course images are loaded from Unsplash CDN (external URLs)
- Author avatars are loaded from randomuser.me API

---

### 3.2 About Page — `about.html`

**Title:** `About Us - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | Background image (Unsplash) with "About Us" heading and breadcrumb. Has `margin-top: 100px` to account for the fixed header. |
| **About Content** | Welcome text with description paragraphs. |
| **Feature Cards** | 3 cards: Top Rated, Global Community, Certified Courses. |
| **Expanding Gallery** | 4 interactive image panels (Main Building, Advanced Labs, Library, Student Lounge). |
| **Shuffle Stack Video Gallery** | 4 video cards in a 3D deck. Auto-shuffles every 2 seconds. |
| **Footer** | Standard footer. |

**Key Features:**
- **Expanding Gallery** (`gallery-options`): JavaScript in `script.js` (lines 73-82) handles the click-to-expand logic. Only one panel is `.active` at a time.
- **Video Stack** (`video-stack`): Complex shuffle animation handled in `script.js` (lines 84-183). Features:
  - Auto-shuffle every 2 seconds
  - Pause on hover
  - Manual prev/next controls with `aria-label`
  - Top card shows video controls, others are paused
  - Cards animate left/right when shuffling
- Videos: 2 are local files in `video/` folder, 2 are from Mixkit CDN

---

### 3.3 Courses Page — `courses.html`

**Title:** `Courses - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | "Our Courses" heading with breadcrumb. |
| **Search & Filter Bar** | Frosted glass (glassmorphism) search box with text input, category dropdown, and Search button. |
| **Courses Grid** | 6 course cards in a responsive grid. |
| **Footer** | Standard footer. |

**Search & Filter System (IMPORTANT):**
- **Text Search:** `#courseSearch` — searches course titles, descriptions, and author names
- **Category Filter:** `#courseCategory` — dropdown with options: All, Development, Data Science, Design, Marketing, Programming, Education
- **Search Button:** `#courseSearchBtn`
- Each course card has a `data-category` attribute (e.g., `data-category="development"`)
- **Behavior:**
  - Live search as user types (300ms debounce)
  - Instant filter on category dropdown change
  - Enter key triggers search
  - Shows "No courses found" message when no matches
- JavaScript is in an **inline `<script>` tag** at the bottom of `courses.html` (NOT in `script.js`)

**Course Cards:**

| # | Course | Category | Author |
|---|--------|----------|--------|
| 1 | Web Development Bootcamp | `development` | John Doe |
| 2 | Data Science Fundamentals | `data-science` | Sarah Smith |
| 3 | UI/UX Design Masterclass | `design` | Mike Ross |
| 4 | Digital Marketing Strategy | `marketing` | Emily White |
| 5 | Advanced Java Programming | `programming` | David Lee |
| 6 | Teaching Methods 101 | `education` | Lisa Brown |

**Frosted Glass CSS:**
- `.course-search-box.search-box` uses `backdrop-filter: blur(20px)` for the glass effect
- Defined in `style.css` under the comment `/* Course Page Search Box - Frosted Glass */`

---

### 3.4 Faculty Page — `faculty.html`

**Title:** `Faculty - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**This is the most content-heavy page with ~1098 lines of HTML.**

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | "Latest News" heading (legacy title) with "Home / Faculty" breadcrumb. |
| **Faculty Grid** | 49 faculty profile cards displayed in a responsive grid (`.features-grid`). |
| **Faculty Modal** | Full-screen modal that appears when "Know More" is clicked on any card. |
| **Footer** | Standard footer. |

**Faculty Card Structure:**
Each card (`.profile-card`) contains:
```html
<div class="profile-card scroll-reveal">
    <div class="profile-card-image">
        <img alt="Faculty Name" src="images/imageN.jpeg" />
    </div>
    <div class="profile-card-content">
        <span class="profile-tag">Faculty</span>
        <h3>Faculty Name</h3>
        <a class="profile-email" href="mailto:email@bmsccm.ac.in">
            <i class="fa-solid fa-envelope"></i> email@bmsccm.ac.in
        </a>
        <p>Bio text...</p>
        <button class="btn-know-more-card"
            data-bio="Full bio..."
            data-edu="Qualification"
            data-email="email@bmsccm.ac.in"
            data-exp="Experience"
            data-img="images/imageN.jpeg"
            data-name="Faculty Name"
            data-tag="Designation">
            Know More <i class="fa-solid fa-arrow-right"></i>
        </button>
    </div>
</div>
```

**IMPORTANT — `data-*` attributes on the "Know More" button:**
These are read by JavaScript to populate the modal. When adding a new faculty member, you MUST include all these attributes:
- `data-name` — Full name
- `data-tag` — Designation/role (e.g., "Associate Professor")
- `data-img` — Path to photo (e.g., `images/image50.jpeg`)
- `data-bio` — Full biography text
- `data-edu` — Qualification (e.g., "M.Com, Ph.D")
- `data-exp` — Experience (e.g., "10 years")
- `data-email` — Email address (optional, leave empty string if none)

**Faculty Modal (`#facultyModal`):**
- Located near the bottom of `faculty.html` (around line 1018)
- Shows: photo, name, tag, email (clickable mailto link), experience, education, bio
- Close options: X button, click outside, press Escape
- JavaScript logic in `script.js` (lines 186-252)
- Modal elements: `#modalImg`, `#modalName`, `#modalTag`, `#modalExp`, `#modalEdu`, `#modalBio`, `#modalEmail`

**Faculty Photos:**
- Stored in `images/` as `image1.jpeg` through `image49.jpeg`
- Photos are linked to specific faculty members by order in the HTML
- If adding a new faculty member, add the photo as `image50.jpeg` (or similar) and reference it

---

### 3.5 Placement Page — `placement.html`

**Title:** `Placement - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**This page is currently minimal / under development.**

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | "Placement" heading with breadcrumb. Background image from Unsplash. |
| **Footer** | Standard footer. |

**Notes:**
- There is no placement content yet — only the header, banner, and footer
- Future development should add placement statistics, company logos, testimonials, etc.

---

### 3.6 Contact Page — `contact.html`

**Title:** `Contact - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | "Contact Us" heading with breadcrumb. |
| **Contact Content** | Two-column layout: contact info (address, phone, email) on the left, contact form on the right. |
| **Google Maps** | Embedded iframe showing the college location on Google Maps. |
| **Footer** | Standard footer. |

**Contact Info:**
- **Address:** No-97, Kavi Lakshmisha Road, V.V. Puram, Bangalore - 560 004 Karnataka, India
- **Phone:** 080-26610174 / 91 96202 25400-03
- **Email:** principal.bmsccm@gmail.com / principal@bmsccm.ac.in

**Contact Form:**
- Fields: Name, Email, Message (textarea)
- The "SEND MESSAGE" button is currently `type="button"` (does NOT submit anywhere — no backend)
- Form styling is inline (uses `style` attributes directly on elements)

**Google Maps iframe:**
- Max width: 800px, centered
- Shows the college location
- `loading="lazy"` for performance

---

### 3.7 Login Page — `login.html`

**Title:** `Login / Register - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**This page has its own CSS embedded in a `<style>` tag (NOT in style.css).**

**Features:**

| Feature | Description |
|---------|-------------|
| **Back Button** | "← Back to Home" link in top-left corner |
| **Login/Register Tabs** | Toggle between Login and Register forms |
| **Login Form** | Email/Phone input + Password input + Login button |
| **Register Form** | Full Name + Email + Password + Confirm Password + Register button |
| **Google Sign-In** | "Continue with Google" button opens a modal account chooser |
| **Google Modal** | Simulated Google account chooser with 3 demo accounts |

**Key Technical Details:**
- Tab switching uses `switchTab('login')` / `switchTab('register')` functions
- Form inputs use `autocomplete="new-password"` to prevent browser autofill
- Google modal accounts are placeholder data (User 1, User 2, User 3)
- `googleLogin()` function shows an alert and redirects to `index.html`
- All JavaScript is **inline** at the bottom of the file
- Responsive: has media queries for 480px and 360px breakpoints

**IMPORTANT:** This is a **frontend-only mockup** — there is NO backend authentication. The forms do not send data anywhere.

---

### 3.8 Sitemap Page — `sitemap.html`

**Title:** `Sitemap - BMS COLLEGE OF COMMERCE & MANAGEMENT`

**This page provides a visual overview of the entire website structure.**

**Sections:**

| Section | Description |
|---------|-------------|
| **Page Title Banner** | Dark gradient background (no external image) with "Sitemap" heading. |
| **Website Structure** | Tree-style layout showing all pages. |
| **XML Sitemap Link** | Button linking to the machine-readable `sitemap.xml`. |
| **Footer** | Standard footer. |

**Tree Layout:**
- **Root Node** (Home) — Blue gradient card at the top with house icon
- **Connector Line** — Gradient line from root to branch cards
- **6 Branch Cards** in a 3×2 responsive grid:
  - About, Courses, Faculty, Placement, Contact, Login
- Each card shows: icon, title, short description, file path URL, priority badge
- **Priority Badges:** Green (High), Orange (Medium), Purple (Utility)

**Design:**
- Uses the shared `style.css` for header/footer
- Page-specific CSS is embedded in a `<style>` tag
- Hover effects: cards lift up, icons rotate and change color
- Scroll reveal animations on all cards
- Responsive: collapses to single column on mobile

---

### 3.9 404 Page — `404.html`

**Title:** `404 - Page Not Found | BMS COLLEGE OF COMMERCE & MANAGEMENT`

**This is a standalone page with its own embedded CSS and JavaScript — it does NOT use `style.css` or `script.js`.**

**Features:**

| Feature | Description |
|---------|-------------|
| **Dark Background** | Deep navy (`#0a0e27`) with an animated grid pattern. |
| **Floating Orbs** | 3 large blurred gradient orbs (blue, cyan, purple) with floating animation. |
| **Particles** | 30 randomly generated glowing particles rising from the bottom. |
| **404 Number** | Huge gradient text with a periodic glitch animation (jitter + red shadow flash). |
| **Error Message** | "Oops! Page Not Found" title with a friendly description. |
| **Action Buttons** | "Go to Homepage" (gradient blue) and "Contact Us" (glass-style border). |
| **Countdown Redirect** | Shows a visible 10-second countdown, then auto-redirects to `index.html`. |

**Key Technical Details:**
- **No external CSS/JS files** — everything is self-contained in the HTML
- Particles are generated dynamically via JavaScript (30 elements with random size, position, and animation delay)
- The countdown uses `setInterval()` with a 1-second tick
- Fully responsive: buttons stack vertically on mobile (< 480px)
- Uses `clamp()` for the 404 font size to scale smoothly across screen sizes
- The page does NOT have a header or footer (intentional — it's an error page)
- Useful for GitHub Pages: any unknown URL shows this page before redirecting


### 3.10 Admin Dashboard — `admin.html`

**This page is a password-protected management tool for site administrators.**

**Features:**
- **Dynamic Content Management**: Allows updating images, notices, and faculty/course data without editing HTML files directly.
- **GitHub Integration**: Uses the GitHub API to fetch and update `data.json` and rebuild HTML pages.
- **Form-Based Updates**: Administrators can fill out forms to add/edit/delete content.
- **Automated Rebuilds**: The dashboard contains logic (`rebuildAboutPage`, `rebuildFacultyPage`, etc.) to automatically inject updated JSON data into the corresponding HTML templates using markers like `<!-- Faculty Grid Start -->`.

**IMPORTANT:** This page requires a GitHub Personal Access Token (PAT) with `repo` scope to function. It is intended for authorized staff only.

---

## 4. Stylesheet Guide — `style.css`

The CSS file is ~1800+ lines and contains ALL styles for the entire website.

### Key Sections (in order):

| Lines (approx.) | Section | Purpose |
|-----------------|---------|---------|
| 1-30 | CSS Variables (`:root`) | Colors, fonts, transitions, shadows |
| 30-70 | Reset & Base Styles | Box-sizing, body font, smooth scrolling |
| 70-150 | Top Bar | Registration button, top strip styling |
| 150-220 | Logo & Header | Logo icon wrap, text styles, sticky header |
| 220-350 | Navigation & Mobile Menu | Nav links, hamburger animation, mobile dropdown |
| 350-500 | Hero Section | Full-screen hero, overlay, title animations |
| 500-700 | Feature Cards | Grid layout, icon boxes, hover effects |
| 700-900 | Course Cards | Course grid, image hover zoom, footer styling |
| 900-1050 | Profile Cards | Faculty card layout, image sizing, "Know More" button |
| 1050-1100 | Faculty Modal | Modal overlay, content layout, detail items |
| 1100-1300 | Footer | Grid layout, social links, newsletter form |
| 1300-1500 | Gallery & Video Stack | Expanding gallery, shuffle deck animations |
| 1500-1700 | Responsive Breakpoints | Media queries for tablet and mobile |
| 1700-1810 | Course Search Box | Frosted glass effect, no-results message |

### Key CSS Variables:
```css
--primary-color: #1a75ff;       /* Blue — used for buttons, links */
--header-top-bg: #14bdee;       /* Cyan — used for top bar, accents */
--text-dark: #1a1a2e;           /* Near-black — headings */
--text-light: #666;             /* Gray — body text */
--white: #ffffff;
--transition: all 0.3s ease;
--shadow: 0 10px 30px rgba(0,0,0,0.08);
```

### Responsive Breakpoints:
- `1200px` — Reduce font sizes
- `992px` — Two-column grids
- `768px` — Show hamburger menu, single-column layout
- `576px` — Compact spacing
- `480px` — Small mobile
- `360px` — Tiny screens (iPhone SE)

---

## 5. JavaScript Guide — `script.js`

All shared JavaScript is in `script.js` (~256 lines). Page-specific JS is inline.

### Feature Map:

| Lines | Feature | Used On |
|-------|---------|---------|
| 1-16 | **Scroll Reveal** — Intersection Observer adds `.visible` class | All pages |
| 18-26 | **Sticky Header** — Adds `.scrolled` class on scroll | All pages |
| 28-68 | **Mobile Menu** — Hamburger toggle, outside click close, nav link close | All pages |
| 73-82 | **Expanding Gallery** — Click-to-expand image panels | About page |
| 84-183 | **Video Stack Shuffle** — Auto-shuffling video card deck | About page |
| 186-252 | **Faculty Modal** — Open/close modal, populate data from attributes | Faculty page |

### How Faculty Modal Works:
1. User clicks "Know More" button (`.btn-know-more-card`)
2. JavaScript reads all `data-*` attributes from the button
3. Populates modal elements (`#modalImg`, `#modalName`, etc.)
4. Handles email: if `data-email` exists, shows clickable `mailto:` link; otherwise hides it
5. Shows modal by adding `.active` class to `#facultyModal`
6. Disables body scroll while modal is open

### Inline JavaScript (NOT in script.js):
- **courses.html** — Course search & filter logic (bottom of file)
- **login.html** — Tab switching, Google modal logic (bottom of file)
- **404.html** — Particle generation + countdown redirect (bottom of file)

---

## 6. Images & Media

### Faculty Photos
- Located in `images/` directory
- Named `image1.jpeg` through `image49.jpeg`
- Each corresponds to a faculty member in order of appearance in `faculty.html`
- Format: mostly JPEG, a few PNG (`image3.png`, `image5.png`, `image8.png`, `image29.png`)

### Logo
- `images/logo.png` — College crest (BMS College of Commerce & Management)
- Used as: favicon (all pages) + header logo (all pages)
- Size: ~17KB, circular crest design

### Menu Icon
- `images/menu_icon.svg` — Hamburger menu icon for mobile navigation

### Videos (About page)
- `video/32aa32b3...720w.mp4` — Aerial Campus View (~1.7MB)
- `video/ec0266fb...944.mp4` — Student Connections (~6.6MB)
- 6 additional videos are loaded from Mixkit CDN (external URLs)

### External Images
- **Course images:** Loaded from `images.unsplash.com`
- **Author avatars:** Loaded from `randomuser.me` API
- **Gallery backgrounds:** Loaded from `images.unsplash.com`
- **Page title banners:** Loaded from `images.unsplash.com`

> ⚠️ External images depend on third-party CDNs. If these services go down, the images will break. Consider downloading and hosting locally for production.

---

## 7. How to Add / Update Content

### Adding a New Faculty Member

1. **Add the photo** to `images/` as `image50.jpeg` (next sequential number)
2. **Add the card** in `faculty.html` before the closing `</div>` of `.features-grid`:
   ```html
   <div class="profile-card scroll-reveal">
       <div class="profile-card-image">
           <img alt="New Faculty Name" src="images/image50.jpeg" />
       </div>
       <div class="profile-card-content">
           <span class="profile-tag">Faculty</span>
           <h3>New Faculty Name</h3>
           <a class="profile-email" href="mailto:email@bmsccm.ac.in">
               <i class="fa-solid fa-envelope"></i> email@bmsccm.ac.in
           </a>
           <p></p>
           <p>Bio text here...</p>
           <button class="btn-know-more-card"
               data-bio="Full bio text..."
               data-edu="Qualification"
               data-email="email@bmsccm.ac.in"
               data-exp="Experience"
               data-img="images/image50.jpeg"
               data-name="New Faculty Name"
               data-tag="Designation">
               Know More <i class="fa-solid fa-arrow-right"></i>
           </button>
       </div>
   </div>
   ```
3. That's it — the modal will automatically work because it reads `data-*` attributes

### Adding a New Course

1. Add a new card in `courses.html` inside `.courses-grid`:
   ```html
   <div class="course-card scroll-reveal" data-category="new-category">
       <!-- Follow the existing card structure -->
   </div>
   ```
2. If using a new category, also add the `<option>` to the `#courseCategory` dropdown

### Adding a New Page

1. Copy the header section from any existing page
2. Make sure to include:
   - Favicon link
   - Google Fonts link
   - `style.css` link
   - Font Awesome link
   - Identical header with correct `class="active"` on the right nav link
   - Footer section
   - `<script src="script.js"></script>` at the bottom
3. Update the navigation in ALL other pages to include a link to the new page

### Changing the College Name

The name "BMS COLLEGE OF COMMERCE & MANAGEMENT" appears in these locations across **every page**:
- `<title>` tag
- `<meta name="description">` tag
- `.logo-sub` span in header
- Footer `<h3>`
- Footer copyright `<p>`

If you need to change it, update ALL of these in ALL HTML files.

---

## 8. Important Notes & Gotchas

### ⚠️ Common Pitfalls

1. **Header must be identical across all pages** — Logo, nav links, and Register button must match. If you update one page's header, update all others too.

2. **Footer must be identical across all pages** (except login.html and 404.html).

3. **Faculty modal is a SINGLE shared element** — There is only ONE modal in `faculty.html`. It gets populated dynamically via JavaScript. Don't create separate modals for each faculty member.

4. **The `active` class on nav links must be manually set** — Each page should have `class="active"` on its own nav link. It is NOT set automatically by JavaScript.

5. **No backend** — The contact form, login form, and register form are frontend-only mockups. They do not submit data anywhere.

6. **CSS is in ONE file** — All styling for all pages is in `style.css`. There are no page-specific CSS files (except `login.html`, `sitemap.html`, and `404.html` which have inline styles).

7. **JavaScript is in ONE file** — `script.js` handles all shared functionality. Page-specific JS is inline at the bottom of `courses.html`, `login.html`, and `404.html`.

8. **External images can break** — Course images, author avatars, gallery backgrounds, and page banners use external CDNs (Unsplash, randomuser.me, Mixkit). Consider hosting locally.

9. **Mobile hamburger menu** — The mobile menu closes when: (a) a nav link is clicked, (b) anywhere outside the menu is clicked, (c) the hamburger is clicked again.

10. **Scroll reveal animations are one-time** — Once an element scrolls into view and gets the `.visible` class, it stays visible. It does NOT re-animate when scrolling up.

### 📁 Files That Should NOT Be Deleted

| File | Reason |
|------|--------|
| `images/logo.png` | Used as favicon and header logo on ALL pages |
| `images/menu_icon.svg` | Used for mobile hamburger menu on ALL pages |
| `images/image1-49.jpeg` | Faculty photos referenced in `faculty.html` |
| `video/*.mp4` | Videos used in About page video gallery |
| `style.css` | ALL website styles |
| `script.js` | ALL shared JavaScript |
| `sitemap.xml` | XML sitemap for search engine crawlers |
| `robots.txt` | Crawler instructions pointing to sitemap.xml |
| `sitemap.html` | Visual sitemap page with tree-style layout |
| `404.html` | Animated error page with countdown redirect |

### 🔗 Navigation Link Reference

All pages should have these exact nav links:
```html
<li><a href="index.html">Home</a></li>
<li><a href="about.html">About</a></li>
<li><a href="courses.html">Courses</a></li>
<li><a href="faculty.html">Faculty</a></li>
<li><a href="placement.html">Placement</a></li>
<li><a href="contact.html">Contact</a></li>
```

### 🔍 SEO Information

- Homepage title: `BMS COLLEGE OF COMMERCE & MANAGEMENT`
- Other pages: `Page Name - BMS COLLEGE OF COMMERCE & MANAGEMENT`
- All pages have `<meta name="description">` tags
- Semantic HTML is used where possible
- Google Fonts are preconnected (`rel="preconnect"`) for performance
- **`sitemap.xml`** — Lists all 8 pages with priority, last modified date, and change frequency
- **`robots.txt`** — Allows all crawlers and points them to the sitemap URL
- **`sitemap.html`** — Visual sitemap for human visitors, linked from the XML sitemap

---

*This walkthrough was created to help future developers understand and maintain the BMS College website. If you add new features, please update this document accordingly.*
