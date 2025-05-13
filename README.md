# React To-Do List

A modern, feature-rich To-Do List app built with React and Vite.  
Easily manage your tasks, subtasks, priorities, and more—all in a beautiful, responsive interface.

## Features

- Add, edit, and delete tasks
- Subtasks support
- Priority and recurring options
- Calendar and list views
- Light/Dark mode toggle
- Custom color themes
- Progress and streak tracking
- Drag-and-drop reordering

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-to-do-list.git
   cd react-to-do-list
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` folder.

## Deploying to GitHub Pages

You can host your built app for free using GitHub Pages:

1. **Install the Vite GitHub Pages deploy tool:**
   ```bash
   npm install --save-dev vite-plugin-gh-pages
   ```

2. **Add the plugin to your `vite.config.js`:**
   ```js
   // vite.config.js
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import ghPages from 'vite-plugin-gh-pages';

   export default defineConfig({
     plugins: [react(), ghPages()],
   });
   ```

3. **Add a deploy script to your `package.json`:**
   ```json
   "scripts": {
     // ...other scripts
     "deploy": "vite build && vite gh-pages"
   }
   ```

4. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/react-to-do-list.git
   git push -u origin main
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Set GitHub Pages source:**
   - Go to your repository on GitHub.
   - Settings → Pages → Source: select `gh-pages` branch (or `/root` if prompted).
