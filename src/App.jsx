
import './App.css'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './Pages/SearchResult';
import RecipeDetails from './Pages/RecipeDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


export const RecipeContext = createContext();

// Persist data to local storage, to avoid data loss on pag refresh or page navigation
const searchResultFromLocalStorage = JSON.parse(localStorage.getItem("searchResult")) || [];
const selectedRecipeFromLocalStorage = JSON.parse(localStorage.getItem("selectedRecipe")) || [];

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(searchResultFromLocalStorage);
  const [selectedRecipe, setSelectedRecipe] = useState(selectedRecipeFromLocalStorage);

  useEffect(() => {
    // Update state variables whenever atleast on of them changes
    localStorage.setItem("searchResult", JSON.stringify(searchResult));
    localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
  }, [searchResult, selectedRecipe]);
  return (
    <>
      <RecipeContext.Provider value={{searchInput, setSearchInput, searchResult, setSearchResult, selectedRecipe, setSelectedRecipe}}>
        <Router>
          <Routes>
           <Route path="/" element={<Landing/>}/>
           <Route path="/home" element={<Home/>}/>
           <Route path="/search" element={<SearchResult/>}/>
           <Route path="/search/:id" element={<RecipeDetails/>}/>
          </Routes>
        </Router>
      </RecipeContext.Provider>
    </>
  )
}

export default App
