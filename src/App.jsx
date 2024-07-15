
import './App.css'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import { useState, createContext } from 'react';


export const RecipeContext = createContext();

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  return (
    <>
      <RecipeContext.Provider value={{searchInput, setSearchInput, searchResult, setSearchResult}}>
      <Home />
      </RecipeContext.Provider>
    </>
  )
}

export default App
