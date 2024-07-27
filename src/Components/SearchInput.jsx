import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { rem } from '@mantine/styles';
import { useContext, useEffect } from 'react';
import { RecipeContext } from '../App';
import useSWR from 'swr';
import '../Styles/SearchInput.css'
import { useNavigate } from 'react-router-dom';

// fetcher function for SWR, which is just a wrapper of the native fetch
const fetcher = (url) => fetch(url).then(res => res.json());

function SearchInput(props) {

  const { searchInput, setSearchInput, searchResult, setSearchResult } = useContext(RecipeContext); // Global state variables using context API
  const { data: recipe, error } = useSWR(searchInput ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : null, fetcher); // API call using SWR
  const navigate = useNavigate();

// Log to console the values of recipe (fetched API data), searchResult(selected item/s).
  useEffect(() => {
    if (recipe) {
      console.log("Recipes: ", recipe);
    }
    if (searchResult) {
      console.log("Search result: ", searchResult);
    }
  }, [recipe,searchResult]);

// Updates the value of searchInput(Input area) on change. 
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

// Set the value of searchResult(selected item/s) and updates the value of searchInput(Input area) to empty string on click.
  const handleClick = () => {
    setSearchResult(recipe);
    setSearchInput("");
    search();
  }

// Set the value of searchResult(selected item/s) and updates the value of searchInput(Input area) to empty string when ENTER key is pressed.
  const handleEnterKey = (e) => {
    if(e.key === "Enter") {
      handleClick();
      search();
    }
  }

// Set the value of searchInput(Input area) on the selected item in suggestions on dropdown list.
  const handleSelect = (searchItem) => {
    setSearchInput(searchItem);
  }

  const search = () => {
    console.log("Navigating to searchResult page")
    navigate("/search");
  }




  return (
    <div className="input-with-button">
      <TextInput
      radius="xl"
      size="xl"
      placeholder="Search by name"
      value={searchInput}
      onChange={handleChange}
      onKeyDown={handleEnterKey}
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color="yellow" variant="filled" onClick={handleClick}>
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5}/>
        </ActionIcon>
      }
      {...props}
      />
      {
        searchInput.length > 0 && recipe && // Render dropdown if searchInput is not empty and data from API is fetched.
        <div className="Dropdown">
          {
            recipe && recipe.meals && recipe.meals // Render dropdown list if data is fetched from API and has a array data
           .filter(meal => {
            const searchTerm = searchInput.toLowerCase();
            const mealName = meal.strMeal.toLowerCase();

            return mealName !== searchTerm; // When searchInput is not equal to mealName render the dropdownlist
            })
            .slice(0, 5)// Limit dropdown list to 5.
            .map((item => { // Map over the selected searchResults
              console.log("Searched item/s : ", item.strMeal) // Log to console the list of searched item/s
              return <p key={item.idMeal} className="DropdownItem" onClick={() => handleSelect(item.strMeal)}>{item.strMeal}</p>
            }))
          }
        </div>
        }
    </div>

  );
}

export default SearchInput;
