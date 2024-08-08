import { Card, Image, Text, Group, Button } from '@mantine/core';
import classes from '../Styles/CategoryCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ category }) {
const { strCategory, strCategoryThumb, strCategoryDescription,} = category;
const navigate = useNavigate();

const goToCategory = (category) => {
    navigate(`/categories/${category}`)
}

const getFirstSentence = (description) => {
    const firstSentence = description.match(/[^.]*[.]/)?.[0] || description;
    return firstSentence;
  };

  const firstSentence = getFirstSentence(strCategoryDescription);

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={strCategoryThumb} alt={strCategory ? strCategory : strMeal} height={180} />
          </Card.Section>
    
          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
                <Text fz="lg" fw={500} className={classes.categoryName}>
                {strCategory}
              </Text>
            </Group>
           
          <Text fz="sm" mt="xs" className={classes.categoryTitle}>
            {firstSentence}
          </Text>

          </Card.Section>
          <Group mt="xs">
            <Button radius="md" style={{ flex: 1 }} color="yellow" onClick={() => goToCategory(strCategory)}>
              Show {strCategory} Recipes
            </Button>
          </Group>
        </Card>
      );

    }