# Alliance of Young Leaders (AYL) — Website

A complete, modern organizational website for the Alliance of Young Leaders. Built with pure HTML, CSS, and JavaScript — no backend required. Ready for free deployment on Vercel.

---

## File Structure

```
AYL/
├── index.html          ← Main website file
├── style.css           ← All styles and animations
├── script.js           ← All interactivity and animations
└── assets/
    ├── images/         ← General images (replace placeholders)
    ├── officers/       ← Officer photos (name them: chairperson.jpg, etc.)
    ├── committee/      ← Committee chair photos
    └── pdf/
        └── ayl-membership-directory.pdf   ← Replace with your actual PDF
```

---

## How to Customize

### 1. Officer Photos
- Place photos in `assets/officers/`
- In `index.html`, replace each officer's `<div class="officer-placeholder">` with:
  ```html
  <img src="assets/officers/your-name.jpg" alt="Officer Name" class="officer-photo" />
  ```

### 2. Officer Names & Positions
- Search for `[ Name Here ]` in `index.html` and replace with actual names.
- Update positions and descriptions accordingly.

### 3. Committee Chairs & Members
- Search for `[ Chair Name ]` and `[ Member 1 ]` etc. in `index.html`
- Replace with actual names.

### 4. Membership PDF Directory
- Place your PDF at `assets/pdf/ayl-membership-directory.pdf`
- The embedded viewer and download button will automatically use it.

### 5. Gallery Photos
- Replace `<div class="gallery-placeholder">` items in the gallery section with actual `<img>` tags.
- Example:
  ```html
  <img src="assets/images/event1.jpg" alt="Event Name" />
  ```

### 6. Contact Links
- Update email, Facebook, Instagram, Discord, and Messenger links in the Contact section and Footer.

### 7. Google Form Registration Link
- Find `https://forms.google.com/your-registration-link` in `index.html`
- Replace with your actual Google Form URL.

### 8. Social Media Links
- Search for `href="#"` in officer cards and footer social links
- Replace with actual profile URLs.

---

## Deploying to Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI (optional): `npm i -g vercel`
3. **Option A — CLI:**
   - Run `vercel` inside the `AYL/` folder
   - Follow prompts → your site will be live in seconds
4. **Option B — GitHub:**
   - Push the `AYL/` folder to a GitHub repository
   - Import the repo at [vercel.com/new](https://vercel.com/new)
   - Click Deploy — done!

No build step required. Vercel serves static files natively.

---

## Color Palette

| Name        | Hex       | Usage               |
|-------------|-----------|---------------------|
| Blue        | `#0A66C2` | Primary brand color |
| Blue Dark   | `#064E9B` | Hover states        |
| Blue Deep   | `#03306E` | Hero, dark sections |
| Yellow      | `#FFD700` | Accent, highlights  |
| Yellow Dark | `#E6C200` | Yellow hover        |

To change the color scheme, edit the CSS variables at the top of `style.css`.

---

## Features

- ✅ Fully responsive (mobile-first)
- ✅ Sticky navbar with scroll detection
- ✅ Active navigation highlighting
- ✅ Scroll progress bar
- ✅ Scroll reveal animations (Intersection Observer)
- ✅ Floating hero shapes with parallax
- ✅ Animated counter statistics
- ✅ Gallery with lightbox preview
- ✅ Embedded PDF viewer with download button
- ✅ Back to top button
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Glassmorphism elements
- ✅ Hover glow effects on all cards
- ✅ Reduced motion support (accessibility)
- ✅ No external dependencies except Google Fonts & Font Awesome CDN

---

© 2026 Alliance of Young Leaders. All Rights Reserved.
