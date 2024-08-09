import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Loader } from '@mantine/core';
import classes from '../Styles/RecipeCard.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeContext } from '../App';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

// Helper function to capitalize every first letter in each word of a string
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function RecipeCard({ meal }) {
  const { strMealThumb, strMeal, strArea, idMeal } = meal;
  const { setSelectedRecipe, favoriteRecipes, toggleFavorite } = useContext(RecipeContext);

  // Fetch recipe data using SWR
  const { data, error } = useSWR(idMeal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}` : null, fetcher);
  const recipe = data?.meals ? data.meals[0] : null;

  useEffect(() => {
    console.log("Selected recipe: ", recipe);
  }, [recipe]);

  const navigate = useNavigate();

  const viewRecipe = (id) => {
    setSelectedRecipe(recipe);
    navigate(`/search/${idMeal}`);
  };

  const isFavorite = Array.isArray(favoriteRecipes) && favoriteRecipes.some((fav) => fav.idMeal === idMeal);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        { !data ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
            <Loader color="yellow" />
          </div>
        ) : (
          <Image src={strMealThumb} alt={strMeal} height={180} />
        )}
      </Card.Section>
      <Card.Section className={classes.section} mt="md">
        {(strArea || (recipe && recipe.strArea)) && (
          <Badge size="sm" variant="light" className="mb-3" color="red">
            {strArea || (recipe && recipe.strArea)}
          </Badge>
        )}
        <Text fz="lg" fw={500} className={classes.recipeTitle}>
          {capitalizeWords(strMeal)}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={() => viewRecipe(idMeal)} color="yellow">
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
