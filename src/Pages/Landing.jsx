import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from '../Styles/Landing.module.css';
import { useNavigate } from 'react-router-dom';


export default function Landing() {

  const navigate = useNavigate();

  // Function to navigate to Home(Search) Page
  const getStarted = () => {
    console.log("Navigating to Home Page")
    navigate("/home")
  };

    return (
        <>
          <div className={classes.hero}>
            <Overlay
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
              opacity={1}
              zIndex={0}
            />
            <Container className={classes.container} size="md">
              <Title className={classes.title}>DishDiscover</Title>
              <Text className={classes.description} size="xl" mt="xl">
                Find mouthwatering recipes quickly and effortlessly – Our recipe finder app powered by
                MealDB.com offers a comprehensive database and API, enabling you to discover and explore
                a wide range of recipes tailored to your tastes and preferences.
              </Text>
              <Button variant="outline" 
                      color="yellow" 
                      size="xl" 
                      radius="xl" 
                      className={classes.control} 
                      onClick={getStarted}>
                      Get started
              </Button>
            </Container>
          </div>
        </>
      );

}