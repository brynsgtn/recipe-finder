import { useState, useEffect } from 'react';
import RecipeCard from '../Components/RecipeCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import { RecipeContext } from '../App';
import '../Styles/SearchResult.css';
import { Header } from '../Components/Header';
import { Pagination, Button, Loader, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// Limit of recipeCard items per page
const ITEMS_PER_PAGE = 8;

export default function SearchResult() {
  const { searchResult } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const meals = searchResult?.meals || [];
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

  const navigate = useNavigate();

  useEffect(() => {
    if (meals.length === 0) {
      setCurrentPage(1); // Reset page to 1 when no meals
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages); // Adjust current page if necessary
    }
  }, [meals, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMeals = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Function to navigate to Home(Search) Page
  const backToSearch = () => {
    console.log("Navigating to home")
    navigate("/home")
  }

  useEffect(() => {
    // Set timeout to delay the display of results
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 1000); // 1 second delay

    // Clear timeout if component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, [meals]);

  // Breadcrumb items
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Search', href: '/home' },
    { title: 'Result', href: '/search' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div className="result-page-container">
      <Header />
      <Container fluid className="result-container py-5">
        <Breadcrumbs className="breadcrumbs">{breadcrumbItems}</Breadcrumbs>
        {!showResults ? (
          <div className="loader-container">
            <Loader color="yellow" size="xl" type="bars" className="loader-item" />
          </div>
        ) : (
          <>
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
                  <Button radius="md" color="red" onClick={backToSearch}>
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
            {meals.length > 0 && (
              <div className="buttonContainer">
                <Button radius="md" color="red" onClick={backToSearch}>
                  Back to search
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
