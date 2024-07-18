import RecipeCard from '../Components/RecipeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import { RecipeContext } from '../App';
import '../Styles/SearchResult.css'

export default function SearchResult() {
    const { searchResult } = useContext(RecipeContext); // Global state variables using context API

    return (
   
            <Container fluid>
                <Row>
                    {searchResult && searchResult.meals && searchResult.meals.length > 1 ? (
                        searchResult.meals.map((meal) => (
                            <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                                <RecipeCard meal={meal} />
                            </Col>
                        ))
                    ) : (
                        searchResult && searchResult.meals && searchResult.meals.length === 1 ? (
                            <Col xs={9} sm={6} md={5} lg={6} className="my-4 mx-auto">
                                <RecipeCard meal={searchResult.meals[0]} />
                            </Col>
                        ) : (
                            <Col xs={12} className="text-center mt-4">
                                <p>No meals found</p>
                            </Col>
                        )
                    )}
                </Row>
            </Container>
   
        

    );
}
