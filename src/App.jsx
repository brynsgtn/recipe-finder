
import './App.css'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './Pages/SearchResult';
import RecipeDetails from './Pages/RecipeDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


export const RecipeContext = createContext();

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");

  return (
    <>
      <RecipeContext.Provider value={{searchInput, setSearchInput, searchResult, setSearchResult, selectedRecipe, setSelectedRecipe}}>
        <Router>
          <Routes>
\           <Route path="/" element={<Landing/>}/>
\           <Route path="/home" element={<Home/>}/>
\           <Route path="/search" element={<SearchResult/>}/>
\           <Route path="/search/:id" element={<RecipeDetails/>}/>
          </Routes>
        </Router>
      </RecipeContext.Provider>
    </>
  )
}

export default App
