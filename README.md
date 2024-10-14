# **Memory Card Matching Game**

[Demo](https://tiles-memory.onrender.com/)

This project is a **memory card matching game** built with modern frontend technologies. The goal of the game is to find and match pairs of identical image tiles by clicking on them. It features multiple difficulty levels, game statistics tracking, and game history stored locally using the browser’s `localStorage`.

The application is designed to be responsive, visually appealing, and performant across devices.

---

## **Features**

- **Tile Matching Mechanics**:

  - Reveal tiles by clicking, and match pairs of identical images.
  - Tiles reset if not matched within one attempt.

- **Multiple Difficulty Levels**:

  - Users can select different difficulty levels with varying numbers of tiles.

- **Game Statistics**:

  - Track attempts, matched pairs, and elapsed time during gameplay.
  - Automatically start the timer on the first tile click.

- **Local Game History**:

  - Store information about previous games in `localStorage` (including date, attempts, and duration).

- **Visual Effects**:
  - Smooth animations with CSS transitions for tile flipping.
  - Matched tiles are visually dimmed to indicate completion.

---

## **Technologies Used**

- **Frontend Framework**:

  - [React](https://react.dev/) – for building the user interface.
  - [Vite](https://vitejs.dev/) – for fast development and optimized builds.

- **State Management**:

  - [Zustand](https://zustand-demo.pmnd.rs/) – for managing game state (tiles, attempts, game timer).

- **Styling**:

  - **SCSS** – for component-specific styling and reusable CSS.
  - CSS transitions – for smooth visual animations.

- **TypeScript**:

  - Enforced type safety across components.

- **Icons**:
  - Custom icon sets, with support for additional icons for future updates.

---

### Steps to Install and Run the Application

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd memory-game
   ```

2. **Install dependencies**:  
   Install the required packages using `npm` or `yarn`.

   **Using npm**:

   ```bash
   npm install
   ```

   **Using yarn**:

   ```bash
   yarn install
   ```

3. **Run the development server**:  
   This will start the app locally and open it in your browser.

   **Using npm**:

   ```bash
   npm run dev
   ```

   **Using yarn**:

   ```bash
   yarn dev
   ```

4. **Open the game** in your browser:  
   Navigate to:
   ```
   http://localhost:5173
   ```

