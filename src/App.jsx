import './App.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './Pages/SearchResult';
import RecipeDetails from './Pages/RecipeDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './Pages/Favorites';

// Context for sharing state across components
export const RecipeContext = createContext();

// Helper function to safely parse JSON from localStorage
const safeJSONParse = (key) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage:`, e);
    }
  }
  return [];
};

// Initialize state from localStorage
const searchResultFromLocalStorage = safeJSONParse("searchResult");
const selectedRecipeFromLocalStorage = safeJSONParse("selectedRecipe");
const favoriteRecipesFromLocalStorage = safeJSONParse("favoriteRecipes");

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(searchResultFromLocalStorage);
  const [selectedRecipe, setSelectedRecipe] = useState(selectedRecipeFromLocalStorage);
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesFromLocalStorage);

  useEffect(() => {
    // Update localStorage whenever state variables change
    localStorage.setItem("searchResult", JSON.stringify(searchResult));
    localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [searchResult, selectedRecipe, favoriteRecipes]);

  const toggleFavorite = (meal) => {
    setFavoriteRecipes((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.idMeal === meal.idMeal);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.idMeal !== meal.idMeal);
      } else {
        return [...prevFavorites, meal];
      }
    });
  };

  return (
    <RecipeContext.Provider value={{ searchInput, setSearchInput, searchResult, setSearchResult, selectedRecipe, setSelectedRecipe, favoriteRecipes, setFavoriteRecipes, toggleFavorite }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/search/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </RecipeContext.Provider>
  );
}

export default App;
