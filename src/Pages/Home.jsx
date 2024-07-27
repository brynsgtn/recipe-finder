import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from '../Styles/Home.module.css';
import SearchInput from '../Components/SearchInput';
import { Header } from '../Components/Header';


export default function Home() {
  



    return (
        <>
          <div className={classes.homeContainer}>
            <Header />   
            <div className={classes.wrapper}>
              <Overlay color="#000" opacity={.9} zIndex={1} />
                <div className={classes.inner}>
                  <Title className={classes.title}>
                  DishDiscover
                  </Title>
                  <Container size={540}>
                      <SearchInput/>
                  </Container>
                  <div className={classes.controls}>
                    <Button className={classes.control} variant="filled" color="red"size="lg">
                      Categories
                    </Button>
                    <Button className={cx(classes.control, classes.secondaryControl)} variant="light" color="yellow" size="lg">
                      Country
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </>
       
      );
}