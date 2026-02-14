# BrieflyAI — React Application

A modern SaaS landing page + login page, converted from the Adventurer HTML5 template to React, with BrieflyAI content.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
# http://localhost:3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed navbar with scroll behavior
│   ├── Hero.jsx            # Hero section with RSS→AI→User flow
│   ├── Problem.jsx         # Problem section (3 cards)
│   ├── Solution.jsx        # Solution section (4 items)
│   ├── HowItWorks.jsx      # 5-step pipeline visualization
│   ├── Features.jsx        # 6 feature cards
│   ├── TechStack.jsx       # Tech stack grid
│   ├── UseCases.jsx        # 4 use case cards
│   ├── CTA.jsx             # Call to action section
│   ├── Footer.jsx          # Footer + newsletter
│   └── Preloader.jsx       # Page loading animation
├── pages/
│   ├── Home.jsx            # Landing page (all sections)
│   └── Login.jsx           # Login page (/login route)
├── hooks/
│   └── useScrollAnimation.js  # IntersectionObserver animation hook
├── styles/
│   └── style.css           # All styles (preserved from original template)
├── App.jsx                 # Router setup
└── index.js                # Entry point
```

## 🎨 Design System

| Token        | Value       |
|--------------|-------------|
| Primary      | `#ec4848`   |
| Dark BG      | `#151515`   |
| Dark Mid     | `#312b2b`   |
| Nav Dark     | `#3f444a`   |
| Font         | Open Sans   |

## 🗺️ Routes

| Path     | Component | Description         |
|----------|-----------|---------------------|
| `/`      | Home      | Full landing page   |
| `/login` | Login     | Login form page     |

## ✨ Features Implemented

- ✅ Scroll-triggered fade-in / zoom animations (replaces WOW.js)
- ✅ Fixed navbar with scroll shrink effect
- ✅ Active navigation link tracking
- ✅ Mobile responsive hamburger menu
- ✅ Hero section with animated particles
- ✅ RSS → AI → User flow visualization
- ✅ Preloader animation
- ✅ Newsletter subscription (frontend only)
- ✅ Login page with:
  - Email + password validation
  - Error states
  - Loading state during submit
  - Success feedback
  - Remember me + Forgot password UI
  - "Create an account" link
  - Same design system as landing page

## 🔧 Tech Used

- React 18 + React Router DOM v6
- Pure CSS (no UI framework)
- Font Awesome 4.7 (CDN)
- Open Sans (Google Fonts)
