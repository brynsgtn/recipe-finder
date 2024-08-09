import { Card, Image, Text, Group, Button, Loader } from '@mantine/core';
import classes from '../Styles/CategoryCard.module.css';
import { useNavigate } from 'react-router-dom';
import flags from '../data/flags.json'


export default function CountryCard({ country }) {

const { strArea } = country;
const navigate = useNavigate();

const goToCountry = (country) => {
    navigate(`/countries/${country}`)
}

  // Find the flag URL for the given country
  const flag = flags.flags.find(flag => flag[strArea]);

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
        { !country ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                    <Loader color="yellow" />
                  </div>
              ) : (
                  <Image src={flag ? flag[strArea] : "https://flagcdn.com/w320/un.jpg"} alt={strArea} height={180} />
              )};
        </Card.Section>
  
        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
              <Text fz="lg" fw={500} className={classes.categoryName}>
              {strArea}
            </Text>
          </Group>
         
        <Text fz="sm" mt="xs" className={classes.categoryTitle}>
        {flag ? flag.description : "Description not available"}
        </Text>

        </Card.Section>
        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }} color="yellow" onClick={() => goToCountry(strArea)}>
            Show {strArea} Recipes
          </Button>
        </Group>
      </Card>
    )
}