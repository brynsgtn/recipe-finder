# Dish Discover Recipe Finder

![Dish Discover Preview](/public/Screenshot1.png)

## Overview

Dish Discover Recipe Finder is a web application built with React, designed to help users explore and discover recipes based on their available ingredients and preferences. The application uses SWR for efficient data fetching and caching, integrates TheMealDB API for detailed recipe information, and utilizes Mantine for modern and responsive UI components. React Toastify is employed for user-friendly notifications. React Router is used for navigation, and React Hooks such as `useState`, `useEffect`, `useParams`, `useContext`, and `useNavigate` are utilized for state and context management.

## Features

- **Recipe Search**: Search for recipes by entering ingredients or keywords, with data retrieved from TheMealDB API.
- **Recipe Details**: View detailed information about each recipe, including ingredients, preparation instructions, and nutritional facts.
- **Favorites**: Save and manage your favorite recipes for quick access.
- **Responsive Design**: Optimized for various screen sizes and devices to provide a seamless user experience.
- **Loading Indicators**: Provides visual feedback while data is being fetched from the API.
- **Routing**: Utilizes React Router for navigating between different views and pages within the application.
- **State Management**: Employs React Hooks such as `useState`, `useEffect`, `useParams`, `useContext`, and `useNavigate` for managing state and navigation within the app.

## Purpose

The Dish Discover Recipe Finder application demonstrates the use of modern web development practices, including:

- **React.js**: For building dynamic and interactive user interfaces.
- **SWR**: For efficient data fetching, caching, and revalidation.
- **TheMealDB API**: For accessing a comprehensive range of recipe data.
- **Mantine**: For providing sleek and responsive UI components.
- **React Toastify**: For implementing user notifications and alerts.
- **React Router**: For handling routing and navigation within the application.
- **React Hooks**: 
  - `useState` for managing component state.
  - `useEffect` for handling side effects and data fetching.
  - `useParams` for accessing route parameters.
  - `useContext` for managing and accessing global state.
  - `useNavigate` for programmatic navigation and route changes.

## Technologies Used

- **Frontend**: React.js, Mantine, React Toastify, SWR, React Router
- **API**: [TheMealDB API](https://www.themealdb.com/api.php)

## Deployment

Dish Discover Recipe Finder is deployed using Netlify for easy hosting and continuous integration. You can access the live site [here](https://dish-discover-brynsgtn.netlify.app/).

## Documentation

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [SWR Documentation](https://swr.vercel.app/)
- [Mantine Documentation](https://mantine.dev/docs/)
- [React Toastify Documentation](https://fkhadra.github.io/react-toastify/)
- [React Router Documentation](https://reactrouter.com/web/guides/quick-start)
- [TheMealDB API Documentation](https://www.themealdb.com/api.php)
- [Netlify Documentation](https://docs.netlify.com/)

## Installation and Usage

To set up and run the Dish Discover Recipe Finder application locally, follow these steps:

1. **Clone or download the repository:**
    ```bash
    git clone https://github.com/your-username/dish-discover-recipe-finder.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd dish-discover-recipe-finder
    ```

3. **Install the required dependencies:**
    ```bash
    npm install
    ```

4. **Start the development server:**
    ```bash
    npm start
    ```

5. **Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view the application locally.**

## Screenshots

![Landing Page](/public/Screenshot1.png)
![Search Page](/public/Screenshot2.png)
![Search Result Page](/public/Screenshot3.png)
![Recipe Details Page](/public/Screenshot4.png)
![Favorite Recipes Page](/public/Screenshot5.png)
![Add Recipe to Favorites](/public/Screenshot6.png)
![Remove Recipe from Favorites](/public/Screenshot7.png)
