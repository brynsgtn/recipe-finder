import { useContext } from 'react';
import { RecipeContext } from '../App';
import { ActionIcon, Button, Badge, Breadcrumbs, Anchor, Loader } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import classes from '../Styles/RecipeDetails.module.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';


export default function RecipeDetails() {

    const { selectedRecipe, favoriteRecipes, toggleFavorite } = useContext(RecipeContext);
    const { strMeal, strMealThumb, strYoutube, strInstructions, strArea, strCategory, strTags } = selectedRecipe;
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();

    const ingredients = [];
    
    // Trim each ingredients and measurement then combine it.
    for (let i = 1; i <= 20; i++) {
    const ingredient = selectedRecipe[`strIngredient${i}`];
    const measure = selectedRecipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
     // Helper function to capitalize every first letter in each word of a string
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    
    useEffect(() => {
        // Set timeout to delay the display of results
        const timer = setTimeout(() => {
            setShowResults(true);
        }, 1000); // 1 second delay
    
        // Clear timeout if component unmounts before timeout completes
        return () => clearTimeout(timer);
    }, [selectedRecipe]);

    // Handle the case where strTags might be null or not contain any commas
    const tags = strTags ? strTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Extract YouTube video ID from the URL
    const youtubeVideoId = strYoutube ? strYoutube.split('v=')[1] : null;
    const embedUrl = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : null;
    
    // Function to go back from previous webpage
    const back = () => {
        navigate(-1);
    }

    // Determine if the current recipe is in the favorites
    const isFavorite = favoriteRecipes.some((fav) => fav.idMeal === selectedRecipe.idMeal);

    // Breadcrumb items
    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Search', href: '/home' },
        { title: 'Result', href: '/search' },
        { title: capitalizeWords(strMeal), href: `/search/${strMeal}` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
        {item.title}
        </Anchor>
    ));

    return (
        <div className={classes.recipeContainer}>
            <Header/>
            { !showResults ? (
                            <div className={classes.loaderContainer}>
                                <Loader color="yellow" size="xl" type="bars" className="loader-item" />
                            </div>
                        ) : (
                            <>
                                <Container fluid className={classes.recipeDetailsContainer}>
                                    <Row>
                                        <Col lg={9}>
                                        <Breadcrumbs className={`breadcrumbs ${classes.breadcrumbs}`}>{breadcrumbItems}</Breadcrumbs>
                                            
                                            <h1 className={classes.header}>{capitalizeWords(strMeal)}</h1>
                                            <div className="d-flex">
                                                <div className={classes.imageContainer}>
                                                    <img src={strMealThumb} className={classes.image} alt={strMeal}/>
                                                    <ActionIcon 
                                                        className={classes.heartButton} 
                                                        variant="default" 
                                                        radius="md" 
                                                        size={36} 
                                                        onClick={() => toggleFavorite(selectedRecipe)}
                                                    >
                                                        {isFavorite ? (
                                                            <IconHeartFilled className={classes.like} stroke={1.5} />
                                                        ) : (
                                                            <IconHeart className={classes.like} stroke={1.5} />
                                                        )}
                                                    </ActionIcon>
                                                </div>
                                            </div>
                                            <div className={classes.ingredientsContainer}>
                                                <h1 className={classes.ingredients}>INGREDIENTS</h1>
                                                <ul className={classes.ingredientList}>
                                                    {ingredients.map((item, index) => (
                                                        <li key={index} className={classes.ingredientItem}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className={classes.directionsContainer}>
                                                <h1 className={classes.directions}>DIRECTIONS</h1>
                                                <p className={classes.instructions}>{strInstructions}</p>
                                            </div>
                                            <div>
                                                {embedUrl && (
                                                    <div className={classes.videoContainer}>
                                                        <iframe 
                                                            src={embedUrl} 
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen 
                                                            title="YouTube video player">
                                                        </iframe>
                                                    </div>
                                                )}
                                            </div>  
                                        </Col>
                                        <Col>
                                        <div className={classes.originContainer}>
                                            <div className={classes.origin}>
                                                Origin:
                                                <span className="ms-3">
                                                <Badge size="lg" variant="light" color="red">
                                                    {strArea}
                                                </Badge>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={classes.categoryContainer}>
                                            <div className={classes.category}>
                                                Category:
                                                <span className="ms-1">
                                                <Badge size="lg" variant="light" color="white">
                                                    {strCategory}
                                                </Badge>
                                                </span>
                                            </div>
                                        </div>
                                            { tags.length > 0 && 
                                            <div className={classes.tagsContainer}>
                                                <p className={classes.might}>You might also like:</p>
                                                <ul>
                                                    {tags.map((tag, index) => (
                                                        <li key={index} className='mb-3'>
                                                            <Badge size="xl" variant="light" color="white">
                                                                {tag}
                                                            </Badge>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            }
                                        </Col>
                                    </Row>
                                </Container>
                                <div className={classes.buttonContainer}>
                                    <Button size="lg" radius="md" color="red" variant="outline" onClick={back} className='my-5'>
                                        Back
                                    </Button>
                                </div>  
                            </>
                        )}
        </div>
    )
}
