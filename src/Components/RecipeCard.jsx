import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from '../Styles/RecipeCard.module.css';


// Helper function to capitalize every first letter in each word of a string
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

const mealId = (id) => {
    console.log("My id is: ", id)
}
export default function RecipeCard({ meal }) {
  const { strTags, strMealThumb, strInstructions, strMeal, strCategory, strArea, idMeal } = meal;
//   const tags = strTags ? strTags.split(",") : [];
//   const instructions = strInstructions.slice(0, 100);
//   const features = tags.map((tag) => (
//     <Badge variant="light" key={tag}>
//       {tag}
//     </Badge>
//   ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={strMealThumb} alt={strMeal} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
  
          
          <Badge size="sm" variant="light" className="mb-3" color="red">
            {strArea}
          </Badge>
   
       
         <Text fz="lg" fw={500} className={classes.recipeTitle}>
            {capitalizeWords(strMeal)}
          </Text>
      
      </Card.Section>

      {/* <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section> */}

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1}} onClick={()=>mealId(idMeal)} color="yellow">
          View recipe
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
