import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeCard from '../Components/RecipeCard';
import { Pagination, Button, Loader, Breadcrumbs, Anchor } from '@mantine/core';
import '../Styles/Categories.css'

const fetcher = (url) => fetch(url).then((res) => res.json());

// Limit of categoryCard items per page
const ITEMS_PER_PAGE = 8;

export default function Country() {
  const { country } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  
  const navigate = useNavigate();

  // Function to navigate to previous page
  const back = () => {
    navigate(-1);
  }
  // Fetch data with SWR
  const { data, error } = useSWR(
    country ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}` : null,
    fetcher
  );

  // Calculate total pages
  const meals = data?.meals || [];
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

useEffect(() => {
    console.log("Country: ", country)
},[country])
  // Reset page if no meals or if the current page exceeds total pages
  useEffect(() => {
    if (meals.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [meals, currentPage, totalPages]);

  // Get current meals for pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMeals = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    // Set timeout to delay the display of results
    const timer = setTimeout(() => {
        setShowResults(true);
    }, 1000); // 1 second delay

    // Clear timeout if component unmounts before timeout completes
    return () => clearTimeout(timer);
}, [data]);


   // Show loader if data is still fetching
   if (!data) {
      return (
          <div className="loader-container">
              <Loader color="yellow" size="xl" type="bars" className="loader-item" />
          </div>
      );
    }

    // Breadcrumb items
    const breadcrumbItems = [
      { title: 'Home', href: '/' },
      { title: 'Search', href: '/home' },
      { title: 'Countries', href: '/countries' },
      { title: country, href: `/countries/${country}` },
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
      { !showResults ? (
                      <div className="loader-container">
                          <Loader color="yellow" size="xl" type="bars" className="loader-item" />
                      </div>
      ) : (
        <>
          <h1 className="header">{country} Recipes:</h1>
          <Row>
            {currentMeals.map((meal) => (
              <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                <RecipeCard meal={meal} />
              </Col>
            ))}
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
          {meals.length > 0 &&
          <div className="buttonContainer">
            <Button radius="md" color="red" onClick={back}>
              Back
            </Button>
          </div>
          }
        </>
      )} 
      </Container>
    </div>
  );
}
