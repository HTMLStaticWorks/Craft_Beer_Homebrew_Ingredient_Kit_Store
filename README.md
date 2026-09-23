# Supply Co. — Craft Beer Homebrewing Store

> A premium multi-page e-commerce + educational website for craft beer homebrewing.  
> **Aesthetic Direction:** Industrial-Craft / Dark Editorial

---

## 📁 File Structure

```
supply-co/
├── index.html            → Home (parallax hero + typewriter)
├── home2.html            → Home 2 (split-screen hero + recipe builder)
├── about.html            → About Us (story, timeline, team)
├── services.html         → Services + Pricing
├── blog.html             → Blog grid (filterable)
├── blog-single.html      → Single article with sidebar
├── contact.html          → Contact form + map + details
├── login.html            → Login (auth page, no navbar)
├── register.html         → Register (auth page, no navbar)
├── 404.html              → Custom 404
├── coming-soon.html      → Countdown + email capture
├── assets/
│   ├── css/
│   │   ├── style.css     → Full design system + all page styles
│   │   └── rtl.css       → RTL overrides only
│   └── js/
│       └── main.js       → All JS: nav, theme, RTL, forms, carousel
└── README.md
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Primary** | Malt Amber `#C17B2A` |
| **Secondary** | Charcoal Forge `#1E1E1E` |
| **Accent** | Hops Green `#4A7C59` |
| **BG (Light)** | Warm Cream `#F5F0E8` |
| **BG (Dark)** | Near-Black `#0F0E0C` |
| **Font Heading** | Playfair Display |
| **Font Body** | DM Sans |
| **Icons** | Phosphor Icons CDN |
| **Border Radius** | 3px (global) |

---

## ⚙️ Features

- ✅ **Parallax hero** with typewriter effect (index.html)
- ✅ **Split-screen hero** with stagger fade (home2.html)
- ✅ **Interactive Recipe Builder** (home2.html)
- ✅ **Testimonials carousel** with dots + arrow controls
- ✅ **Blog filter** by category (all/beginner/advanced/recipe/equipment)
- ✅ **Countdown timer** (coming-soon.html)
- ✅ **Interactive FAQ Accordion** with accessible keyboard nav (contact.html)
- ✅ **Full form validation** — contact, login, register
- ✅ **Dark / Light mode** toggle — persisted via localStorage
- ✅ **RTL support** — `dir="rtl"` toggled, drawer slides from LEFT
- ✅ **Hamburger drawer** at ≤ 1024px (hard cutoff)
- ✅ **Scroll reveal** animations on all sections
- ✅ **Counter animations** triggered on scroll
- ✅ **Navbar** — transparent over hero, blurs on scroll
- ✅ **Footer** — multi-column newsletter form
- ✅ **Google/Apple auth buttons** on login & register
- ✅ **WCAG 2.1 AA** — aria-labels, semantic HTML, keyboard nav
- ✅ **SEO** — unique `<title>` + meta description per page, JSON-LD on homepage
- ✅ **Lazy loading** on all images, Unsplash CDN

---

## 🧭 Navigation

```
Home | Home 2 | About Us | Services | Shop | Recipes | Blog | Contact | Login
```

---

## 🚀 Running Locally

No build step required. Open any HTML file directly in a browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node (if you have http-server)
npx http-server . -p 8080
```

Then open `http://localhost:8080`

---

## 📖 CDN Dependencies

- **Phosphor Icons 2.1.1** — `https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js`
- **Google Fonts** — Playfair Display + DM Sans (loaded in style.css)
- **Images** — Unsplash CDN (no local images)

---

© 2026 Supply Co. All rights reserved.
