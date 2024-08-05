import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from '../Styles/RecipeCard.module.css';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../App';
import { useContext, useEffect } from 'react';


// Helper function to capitalize every first letter in each word of a string
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

export default function RecipeCard({ meal, id }) {
  const {  strMealThumb, strMeal, strArea, idMeal } = meal;
  const { setSelectedRecipe, selectedRecipe, favoriteRecipes, toggleFavorite } = useContext(RecipeContext);
 


  //   const tags = strTags ? strTags.split(",") : [];
//   const instructions = strInstructions.slice(0, 100);
//   const features = tags.map((tag) => (
//     <Badge variant="light" key={tag}>
//       {tag}
//     </Badge>
//   ));

const navigate = useNavigate();

const viewRecipe = (id) => {
  console.log("My id is: ", id)
  console.log(`Navigating to ${strMeal} details`)
  console.log("meals: ", meal)
  setSelectedRecipe(meal)
  navigate(`/search/${idMeal}`)
}


const isFavorite = Array.isArray(favoriteRecipes) && favoriteRecipes.some((fav) => fav.idMeal === idMeal);



  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={strMealThumb} alt={strMeal} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
  
          {strArea && 
            <Badge size="sm" variant="light" className="mb-3" color="red">
            {strArea}
          </Badge>
          }
          
   
       
         <Text fz="lg" fw={500} className={classes.recipeTitle}>
            {capitalizeWords(strMeal)}
          </Text>
      
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1}} onClick={()=>viewRecipe(idMeal)} color="yellow">
          View recipe
        </Button>
        <ActionIcon variant="default" radius="md" size={36} onClick={() => toggleFavorite(meal)}>
          {isFavorite ? (
            <IconHeartFilled className={classes.like} stroke={1.5} />
          ) : (
            <IconHeart className={classes.like} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Card>
  );
}
