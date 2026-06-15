# Simple Decision Aid

Welcome to Simple Decision Aid, a Next.js 14 App Router project designed to help you make informed decisions using systematic evaluation methods.

## Project Overview

Individuals often face choices with multiple options and criteria, leading to indecision or suboptimal outcomes. This website provides a solution by allowing users to create simple decision matrices or weighted scoring models to evaluate options systematically. You can define choices and criteria, assign importance scores, and the site will calculate and display a recommendation, all within your browser using client-side storage.

## Features

*   **Create Decision Matrix:** Define your options and criteria, assign weights, and input scores.
*   **Analyze Matrix:** View calculated total scores for each option and get a clear recommendation.
*   **Saved Matrices:** Store your decision matrices locally in your browser to revisit or modify them later.
*   **Stunning UI:** Features a dark theme with vibrant gradient accents, glassmorphic cards, smooth transitions, and modern typography for an engaging user experience.
*   **Client-Side Only:** No external APIs or databases required. All data is managed in `localStorage`.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd simple-decision-aid
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```

5.  **Start the production server:**
    ```bash
    npm run start
    # or
    yarn start
    ```

## Technology Stack

*   **Next.js 14:** React framework for production.
*   **React:** For building interactive user interfaces.
*   **App Router:** Next.js's new routing paradigm for improved performance and flexibility.
*   **Client-Side Logic:** `useState` and `useEffect` for managing component state and side effects.
*   **`localStorage`:** For persistent client-side data storage.
*   **Pure CSS:** All styling is managed in `globals.css` with a focus on modern design principles (glassmorphism, gradients, animations).

## Project Structure

```
.gitignore
README.md
next.config.js
package.json
app/
├── globals.css
├── layout.js
├── page.js
├── analyze-matrix/
│   └── page.js
├── create-decision-matrix/
│   └── page.js
└── saved-matrices/
    └── page.js
```

## License

This project is open-sourced under the MIT License. Feel free to use, modify, and distribute it.
