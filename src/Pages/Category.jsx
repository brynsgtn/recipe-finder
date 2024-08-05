import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeCard from "../Components/RecipeCard";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Category() {

    let { category } = useParams();

    const { data, error } = useSWR(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, fetcher);
    // Ensure data is available before destructuring
    const meals = data?.meals || [];

    useEffect(() => {
        if (data) {
            console.log("Categories: ", meals);
            // console.log("idMeal: ", data.categories.idMeal)
        }
    }, [data]);

    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading...</div>;

 
  

    return (
        <div className="result-page-container">
        <Header />
        <Container fluid className="result-container py-5">
           <h1 className="header">{category} Recipes:</h1>
            <Row>
            {meals.map((meal) => (
                <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                    <RecipeCard meal={meal}/>
                </Col>
                ))
            }
            </Row>

        </Container>
    </div>
    )
}