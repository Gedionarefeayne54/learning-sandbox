Netflix Clone Project — Full Notes
What This Project Is

A Netflix-style streaming website built with React and Vite, pulling real, live movie and TV show data from the TMDB (The Movie Database) API. It has a hero banner, scrollable rows of movies by category, and hover-preview cards, styled to look like the real Netflix homepage.

What I Used

Tools & Software VS Code as the code editor. Node.js and npm to run and manage the project. Git and GitHub for version control and hosting the code online. The terminal/command prompt to run install and start-up commands.

Technologies & Libraries React 19 to build the UI as components. Vite as the build tool and dev server. JavaScript (JSX) as the language for the components. CSS Modules for styling each component separately. Axios to make requests to the movie API. Swiper to build the horizontal scrollable movie rows. React Router DOM for page navigation. Lucide React and React Icons for icons like play, add, and search. Tailwind CSS installed as a utility framework, though not the main styling method used here.

External Service TMDB (The Movie Database) API — a free public API used to fetch real movie and show data: titles, posters, backdrops, descriptions, and ratings. This needed a free TMDB account and a personal API key.

Project Structure — What Each Part Does

Root files index.html is the single page the app loads into. vite.config.js configures the build tool. package.json lists dependencies and run commands. .env stores the private API key, kept out of GitHub through .gitignore.

public folder favicon.svg is the browser tab icon. icons.svg is a shared icon sprite used across the site.

src folder main.jsx is the entry point that mounts the app. App.jsx is the main layout, combining Header, Banner, DispalyRow, and Footer.

Components

Header — the top navigation bar with the logo, menu links, search icon, notifications, and profile menu.

Banner — the big hero section that picks a random Netflix Original from the API and shows its backdrop image, title, description, and Play/My List buttons.

DispalyRow — fetches each category from the API (Trending, Top Rated, Action, Comedy, Horror, Romance, Documentaries, Netflix Originals) and renders one scrollable row per category.

SlideShow — takes a list of movies and displays them as a horizontally swipeable row using Swiper, with arrows to scroll.

MovieCard — a single poster card that shows a hover overlay with title and action icons.

Footer — the bottom section with social icons and link columns, matching the real Netflix footer.

assets/Images — local image files used as fallback or sample images.

Data folder Data.js is a local hardcoded sample list of movies, kept for reference but not actually used since all real data comes from the API.

Utility folder MovieInstance.js sets up the connection to the TMDB API using the key from .env. RequestUrls.js defines the exact endpoint for each row category.

Steps I Took

Scaffolded a new project with npm create vite@latest. Got the base project which already had the components and API logic built. Installed all dependencies with npm install. Created a TMDB account and generated a free API key. Added the key to a .env file so it stayed out of the source code. Ran the project locally with npm run dev to test it. Reviewed the file structure to understand how each component works together. Prepared the project for GitHub, making sure .env was excluded through .gitignore. Committed and pushed the project to GitHub.

What I Learned

How a React project is structured into small, reusable components instead of one big file — breaking the UI into Header, Banner, rows, and cards made it easier to understand and change.

How to connect a frontend app to a real external API using Axios, including sending an API key safely instead of hardcoding it directly in the code.

Why environment variables (.env files) matter — keeping secret keys out of the actual codebase and out of GitHub, using .gitignore.

How CSS Modules keep styles scoped to a single component so styles from one part of the app don't accidentally affect another.

How a library like Swiper can be used to build interactive UI features like horizontal scrolling rows, instead of building that logic from scratch.

How a full project comes together from setup to running it locally to preparing it for deployment on GitHub — install dependencies, configure environment variables, run the dev server, then commit and push.

Basic terminal/command line usage for running npm commands and navigating folders during setup.
