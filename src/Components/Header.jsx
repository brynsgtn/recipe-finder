import React from 'react';
import { Group, Burger, Container, Paper, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import classes from '../Styles/Header.module.css';
import { RecipeContext } from '../App';
import { useContext } from 'react';


export function Header() {

  const { favoriteRecipes } = useContext(RecipeContext); // Global state variables using context API

const links = [
  { link: '/', label: 'Home' },
  { link: '/home', label: 'Search' },
  { link: '/favorites', label: 'Favorites', count: favoriteRecipes.length },
];

  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleClick = (link) => (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    navigate(link);
  };


  const goToHome = () => {
    navigate("/")
  }

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={`${classes.link} ${link.count ? classes.linkWithCount : ''}`} // Add conditional class
      onClick={handleClick(link.link)}
    >
      {link.label}
      {link.count ? ` (${link.count})` : ''}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className="p-2">
        <div className={classes.inner}>
          <Group align="center" spacing="sm" onClick={goToHome}>
            <Image src="../src/assets/images/dishlogo.png" alt="Logo" className={classes.logo} />
            <p className={classes.title}>DishDiscover</p>
          </Group>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          {opened && (
            <Paper className={classes.burgerDropdown}>
              {items}
            </Paper>
          )}
        </div>
      </Container>
    </header>
  );
}
