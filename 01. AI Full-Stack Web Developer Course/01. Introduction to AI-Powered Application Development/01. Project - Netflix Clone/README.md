<div align="center">

# 🎬 Netflix Clone

### A Netflix-style streaming UI built with React, Vite & the TMDB API

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite&logoColor=white)
![TMDB](https://img.shields.io/badge/API-TMDB-01b4e4?style=flat-square&logo=themoviedatabase&logoColor=white)
![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)

</div>

---

## ✨ Overview

A front-end clone of the Netflix homepage, built with **React** and **Vite**, pulling **real, live movie and TV show data** from the **TMDB (The Movie Database) API**. It features a hero banner, scrollable category rows, and hover-preview cards — styled to closely match the real Netflix UI.

## 🚀 Features

- 🎞️ **Hero Banner** — showcases a random Netflix Original with backdrop, title, description, and Play/My List buttons
- 📚 **Category Rows** — Trending, Top Rated, Action, Comedy, Horror, Romance, Documentaries, Netflix Originals
- 🖱️ **Hover-Preview Cards** — poster cards reveal title and action icons on hover
- ↔️ **Swipeable Rows** — horizontal scrolling powered by Swiper
- 🔐 **Secure API Key Handling** — TMDB key stored in `.env`, excluded from GitHub via `.gitignore`

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **UI Framework** | React 19 |
| **Build Tool** | Vite |
| **Language** | JavaScript (JSX) |
| **Styling** | CSS Modules *(Tailwind CSS installed but not the primary styling method)* |
| **HTTP Client** | Axios |
| **Carousel/Rows** | Swiper |
| **Routing** | React Router DOM |
| **Icons** | Lucide React, React Icons |
| **External API** | [TMDB](https://www.themoviedb.org/) — movie/show titles, posters, backdrops, descriptions, ratings |

**Dev Tools:** VS Code, Node.js & npm, Git & GitHub, terminal

## 📂 Project Structure

```
netflix-clone/
├── index.html              # Single page the app loads into
├── vite.config.js          # Vite build configuration
├── package.json            # Dependencies & run scripts
├── .env                    # TMDB API key (excluded via .gitignore)
├── public/
│   ├── favicon.svg         # Browser tab icon
│   └── icons.svg           # Shared icon sprite
└── src/
    ├── main.jsx             # App entry point
    ├── App.jsx               # Main layout: Header, Banner, DispalyRow, Footer
    ├── components/
    │   ├── Header            # Nav bar: logo, links, search, notifications, profile
    │   ├── Banner             # Hero section with random Netflix Original
    │   ├── DispalyRow         # Fetches & renders each category row
    │   ├── SlideShow          # Swiper-powered horizontal row
    │   ├── MovieCard          # Poster card with hover overlay
    │   └── Footer             # Social icons & link columns
    ├── assets/Images/        # Local fallback/sample images
    ├── Data/
    │   └── Data.js            # Hardcoded sample movie list (kept for reference, unused)
    └── utils/
        ├── MovieInstance.js   # TMDB API connection setup (uses .env key)
        └── RequestUrls.js     # Endpoint definitions for each row category
```

## ⚙️ Setup

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a TMDB API key**
   - Create a free account at [themoviedb.org](https://www.themoviedb.org/)
   - Generate a personal API key

4. **Configure environment variables**

   Create a `.env` file in the root:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```

## 🧠 How It Works

1. `DispalyRow` fetches each category's movies from TMDB via `RequestUrls.js` endpoints.
2. `MovieInstance.js` handles the authenticated connection to the TMDB API using the key from `.env`.
3. `Banner` randomly selects a Netflix Original to feature as the hero section.
4. `SlideShow` + `MovieCard` render each category as a swipeable row of poster cards with hover previews.

## 🧩 What I Learned

- Structuring a React app into small, reusable components (Header, Banner, rows, cards) instead of one large file
- Connecting a frontend app to a real external API with Axios, and sending an API key safely
- Why `.env` files and `.gitignore` matter for keeping secrets out of source control
- How CSS Modules scope styles to a single component, avoiding style collisions
- Using a library (Swiper) to handle interactive UI behavior instead of building it from scratch
- The full project lifecycle: scaffold → install deps → configure env vars → run dev server → commit & push to GitHub
- Basic terminal/command-line usage for setup and project navigation

## 🔒 Security Notes

- Never commit your `.env` file — it's excluded via `.gitignore`.
- The TMDB API key is for read-only public data; still avoid exposing it in client-side bundles when deploying publicly.

## 🔮 Future Improvements

- User authentication and profile switching
- "My List" persistence (localStorage or backend)
- Video playback integration
- Search functionality across all categories

---
<div align="center">

Built as a hands-on project to practice React, API integration, and modern front-end tooling 🎥

</div>
