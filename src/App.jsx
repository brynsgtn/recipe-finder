import './App.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './Pages/SearchResult';
import RecipeDetails from './Pages/RecipeDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './Pages/Favorites';
import Categories from './Pages/Categories';
import Category from './Pages/Category';
import Countries from './Pages/Countries';
import Country from './Pages/Country';


// Context for sharing state across components
export const RecipeContext = createContext();

// Function to safely parse JSON from localStorage
const safeJSONParse = (key, defaultValue = []) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage:`, e);
    }
  }
  return defaultValue;
};

// Initialize state from localStorage
const searchResultFromLocalStorage = safeJSONParse("searchResult");
const selectedRecipeFromLocalStorage = safeJSONParse("selectedRecipe", null);
const favoriteRecipesFromLocalStorage = safeJSONParse("favoriteRecipes");

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(searchResultFromLocalStorage);
  const [selectedRecipe, setSelectedRecipe] = useState(selectedRecipeFromLocalStorage);
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesFromLocalStorage);

  // Update localStorage whenever state variables change
  useEffect(() => {
    localStorage.setItem("searchResult", JSON.stringify(searchResult));
    localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [searchResult, selectedRecipe, favoriteRecipes]);

  // Function to add or remove favorite recipes
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

  // Function to fetch selected recipe data
  const fetchAndSetSelectedRecipe = async (id) => {
    const { data } = useSWR(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, fetcher);
    if (data && data.meals && data.meals.length > 0) {
      setSelectedRecipe(data.meals[0]);
    }
  };

  return (
    <RecipeContext.Provider 
          value={{ 
                    searchInput, 
                    setSearchInput, 
                    searchResult, 
                    setSearchResult, 
                    selectedRecipe, 
                    setSelectedRecipe, 
                    favoriteRecipes, 
                    setFavoriteRecipes, 
                    toggleFavorite, 
                    fetchAndSetSelectedRecipe 
                    }}
          >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/search/:id" element={<RecipeDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:country" element={<Country />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </RecipeContext.Provider>
  );
}

export default App;
