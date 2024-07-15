import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { rem } from '@mantine/styles';
import { useContext, useEffect } from 'react';
import { RecipeContext } from '../App';
import useSWR from 'swr';



const fetcher = (url) => fetch(url).then(res => res.json());


function InputWithButton(props) {
  const theme = useMantineTheme();



  const { searchInput, setSearchInput, searchResult, setSearchResult } = useContext(RecipeContext);
  const { data: recipe, error } = useSWR(searchInput ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : null, fetcher);


  useEffect(() => {
    if (recipe) {
      console.log(recipe);
    }
  }, [recipe]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClick = () => {
    setSearchResult(recipe);
    setSearchInput("");
  }

  const handleEnterKey = (e) => {
    if(e.key === "Enter") {
      handleClick();
    }
  }

  useEffect(() => {
    if (searchResult) {
      console.log(searchResult);
    }
  }, [searchResult]);

  return (
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
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}

export default InputWithButton;
