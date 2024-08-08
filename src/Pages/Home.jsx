import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from '../Styles/Home.module.css';
import SearchInput from '../Components/SearchInput';
import { Header } from '../Components/Header';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  
  const navigate = useNavigate();

  // Function to navigate to Categories Page
  const goToCategories = () => {
    navigate("/categories")
  }

  // Function to navigate to Countries Page
  const goToCountry = () => {
    navigate("/countries")
  }


    return (
          <div className={classes.homeContainer}>
            <Header />   
            <div className={classes.wrapper}>
              <Overlay color="#000" 
                       opacity={.9} 
                       zIndex={1} 
              />
                <div className={classes.inner}>
                  <Title className={classes.title}>
                    DishDiscover
                  </Title>
                  <Container size={540}>
                      <SearchInput/>
                  </Container>
                  <div className={classes.controls}>
                    <Button className={classes.control} 
                            variant="filled" 
                            color="red" 
                            size="lg" 
                            onClick={goToCategories}
                    >
                            Categories
                    </Button>
                    <Button className={cx(classes.control, classes.secondaryControl)} 
                            variant="light" 
                            color="yellow" 
                            size="lg" 
                            onClick={goToCountry}
                     >
                            Country
                    </Button>
                  </div>
                </div>
            </div>
          </div>
      );
}