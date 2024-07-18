
import './App.css'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './Pages/SearchResult';
export const RecipeContext = createContext();

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  return (
    <>
      <RecipeContext.Provider value={{searchInput, setSearchInput, searchResult, setSearchResult}}>
        <Landing />
        <Home />
        <SearchResult />
      </RecipeContext.Provider>
    </>
  )
}

export default App
