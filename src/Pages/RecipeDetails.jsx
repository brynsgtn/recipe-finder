import { useContext } from 'react';
import { RecipeContext } from '../App';
import { ActionIcon, Button } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from '../Styles/RecipeDetails.module.css';
import { useNavigate } from 'react-router-dom';

export default function RecipeDetails() {

    const { selectedRecipe } = useContext(RecipeContext);
    const { strMeal, strMealThumb, strYoutube, strInstructions, strArea, strCategory, strTags } = selectedRecipe;

    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
    const ingredient = selectedRecipe[`strIngredient${i}`];
    const measure = selectedRecipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    const instructions = strInstructions.split('.').map(instruction => instruction.trim()).filter(instruction => instruction);

    console.log(instructions);

        // Handle the case where strTags might be null or not contain any commas
        const tags = strTags ? strTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];


    // Extract YouTube video ID from the URL
    const youtubeVideoId = strYoutube ? strYoutube.split('v=')[1] : null;
    const embedUrl = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : null;
    
    const navigate = useNavigate();
    const backToSearchResult = () => {
        console.log("Navigating to SearchResult Page");
        navigate("/search");
    }
    
    return (
        <div>
            <div>
                <div>
                    <h1>{strMeal}</h1>
                    <img src={strMealThumb} />
                    <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                    </ActionIcon>
                    <h1>Ingredients</h1>
                    <ul>
                        {ingredients.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <h1>Directions</h1>
                    {/* <ol>
                        {instructions.map((instruction) => (
                            <li key={instruction}>{instruction}.</li>
                        ))}
                    </ol> */}
                    <p>{strInstructions}</p>
                    {embedUrl && (
                        <div className="video-container">
                            <iframe 
                                width="560" 
                                height="315" 
                                src={embedUrl} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen 
                                title="YouTube video player">
                            </iframe>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <p>Origin:  <span>{strArea}</span></p>
                    </div>
                    <div>
                        <p>Category: <span>{strCategory}</span></p>
                    </div>
                    { tags === !null  && <div>
                        <p>You might also like:</p>
                        <ul>
                            {tags.map(tag => (
                                <li>{tag}</li>
                            ))}
                        </ul>
                    </div>}
                </div>
                <Button radius="md" color="red" onClick={backToSearchResult}>
            Back to Search Result
            </Button>
            </div>
        </div>
    )
}