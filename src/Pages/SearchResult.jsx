import { useState, useEffect } from 'react';
import RecipeCard from '../Components/RecipeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import { RecipeContext } from '../App';
import '../Styles/SearchResult.css';
import { Header } from '../Components/Header';
import { Pagination, Button } from '@mantine/core'; // Assuming you're using Mantine's Pagination component

const ITEMS_PER_PAGE = 8;

export default function SearchResult() {
  const { searchResult } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState(1);

  const meals = searchResult?.meals || [];
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (meals.length === 0) {
      setCurrentPage(1); // Reset page to 1 when no meals
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Adjust current page if necessary
    }
  }, [meals, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMeals = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="result-page-container">
      <Header />
      <Container fluid className="result-container py-5">
        {meals.length > 0 && <h1 className="header">Search Result:</h1>}
        <Row>
          {currentMeals.length > 0 ? (
            currentMeals.map((meal) => (
              <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                <RecipeCard meal={meal} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="no-meals d-flex">

            <p className="header d-block">No recipe found!</p>
            <Button radius="md" color="red">
          Back to search
        </Button>
            </Col>
          )}
        </Row>
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            className="pagination"
            color="yellow"
          />
        )}
      </Container>
    </div>
  );
}
