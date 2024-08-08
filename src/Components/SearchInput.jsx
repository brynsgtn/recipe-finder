import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { rem } from '@mantine/styles';
import { useContext, useEffect, useState } from 'react';
import { RecipeContext } from '../App';
import useSWR from 'swr';
import '../Styles/SearchInput.css';
import { useNavigate } from 'react-router-dom';

// fetcher function for SWR, which is just a wrapper of the native fetch
const fetcher = (url) => fetch(url).then(res => res.json());

function SearchInput(props) {
  const { searchInput, setSearchInput, searchResult, setSearchResult } = useContext(RecipeContext); // Global state variables using context API
  const { data: recipe } = useSWR(searchInput ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : null, fetcher); // API call using SWR
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1); // State to keep track of the selected item in the dropdown

  // Log to console the values of recipe (fetched API data), searchResult (selected item/s).
  useEffect(() => {
    if (recipe) {
      console.log("Recipes: ", recipe);
    }
    if (searchResult) {
      console.log("Search result: ", searchResult);
    }
  }, [recipe, searchResult]);

  // Updates the value of searchInput (input area) on change.
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedIndex(-1); // Reset selected index when the input changes
  };

  // Set the value of searchResult (selected item/s) on the clicked recipe in dropdown or all included in suggestion and updates the value of searchInput (input area) to an empty string on click hten navigate to result.
  const handleClick = () => {
    if (recipe && recipe.meals && recipe.meals.length > 0) {
      if (selectedIndex >= 0) {
        setSearchResult({ meals: [recipe.meals[selectedIndex]] });
      } else {
        setSearchResult(recipe);
      }
    } else {
      setSearchResult({ meals: [] });
    }
    setSearchInput("");
    navigate("/search");
  };

  // Set the value of searchResult (selected item/s) on the selected recipe in dropdown or any included suggestions  and updates the value of searchInput (input area) to an empty string then navigate to result when ENTER key is pressed.
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && recipe && recipe.meals) {
        setSearchInput("");
        setSearchResult({ meals: [recipe.meals[selectedIndex]] });
        search();
      } else if (recipe && recipe.meals) {
        setSearchResult(recipe);
        search();
      }
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, recipe && recipe.meals ? recipe.meals.length - 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Set the value of searchInput (input area) on the selected item in suggestions on dropdown list then navigate to search result page.
  const handleSelect = (selectedItem) => {
    setSearchInput("");
    setSelectedIndex(-1); // Reset selected index after selection
    setSearchResult({ meals: [selectedItem] });
    search();
  };

  // Function to navigate to Search Result Page
  const search = () => {
    console.log("Navigating to searchResult page");
    navigate("/search");
  };

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
          <ActionIcon size={32} radius="xl" color="yellow" variant="filled" onClick={handleClick} disabled={!searchInput}>
            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        }
        {...props}
      />
      {
        searchInput.length > 0 && recipe && // Render dropdown if searchInput is not empty and data from API is fetched.
        <div className="Dropdown">
          {
            recipe && recipe.meals && recipe.meals // Render dropdown list if data is fetched from API and has array data
              .filter(meal => {
                const searchTerm = searchInput.toLowerCase();
                const mealName = meal.strMeal.toLowerCase();
                return mealName !== searchTerm; // When searchInput is not equal to mealName render the dropdown list
              })
              .slice(0, 5) // Limit dropdown list to 5.
              .map((item, index) => { // Map over the selected searchResults
                console.log("Searched item/s : ", item.strMeal); // Log to console the list of searched item/s
                return (
                  <p
                    key={item.idMeal}
                    className={`DropdownItem ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.strMeal}
                  </p>
                );
              })
          }
        </div>
      }
    </div>
  );
}

export default SearchInput;
