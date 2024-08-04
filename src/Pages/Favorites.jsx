import { RecipeContext } from '../App';
import { useContext, useState } from 'react';
import '../Styles/SearchResult.css';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination, Button } from '@mantine/core';
import RecipeCard from '../Components/RecipeCard';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

export default function Favorites() {
  const { favoriteRecipes } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const backToSearch = () => {
    navigate("/home");
  };

  const totalPages = Math.ceil(favoriteRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRecipes = favoriteRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="result-page-container">
      <Header />
      <Container fluid className="result-container py-5">
        {favoriteRecipes.length > 0 && <h1 className="header">Favorite Recipes:</h1>}
        <Row>
          {favoriteRecipes.length > 0 ? (
            currentRecipes.map((meal) => (
              <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                <RecipeCard meal={meal} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="no-meals d-flex">
              <p className="header d-block">No favorite recipes found!</p>
              <Button size="lg" radius="md"  color="red" onClick={backToSearch}>
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
        {favoriteRecipes.length > 0 && (
          <div className="buttonContainer">
            <Button size="lg" radius="md"  color="red" onClick={backToSearch}>
              Back to search
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
