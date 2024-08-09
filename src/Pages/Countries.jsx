import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CountryCard from '../Components/CountryCard';
import { useNavigate } from 'react-router-dom';
import { Pagination, Button, Loader, Breadcrumbs, Anchor } from '@mantine/core';
import '../Styles/Categories.css'

const fetcher = (url) => fetch(url).then(res => res.json());


// Limit of countryCard items per page
const ITEMS_PER_PAGE = 8;

export default function Country() {

    const { data, error } = useSWR('https://www.themealdb.com/api/json/v1/1/list.php?a=list', fetcher);
    const [currentPage, setCurrentPage] = useState(1);
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
      if (data) {
        console.log("Categories: ", data.meals);
      }

      if (data && data.meals) {
        const totalPages = Math.ceil(data.meals.length / ITEMS_PER_PAGE);
        if (data.meals.length === 0) {
          setCurrentPage(1); // Reset page to 1 when no meals
        } else if (currentPage > totalPages) {
          setCurrentPage(totalPages); // Adjust current page if necessary
        }
      }
    }, [data, currentPage]);
  
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
            <div className="result-page-container">
              <div className="loader-container">
                <Loader color="yellow" size="xl" type="bars" className="loader-item" />
             </div>
            </div>
          );
      }

      // Breadcrumb items
      const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Search', href: '/home' },
        { title: 'Countries', href: '/countries' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));
  
      const { meals } = data;
      const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);
    
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const currentCountry = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
      // Function to navigate to previous page
      const back = () => {
        navigate(-1);
      }
    

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
                    <h1 className="header">Countries:</h1>
                      <Row>
                        {currentCountry.map((country) => (
                            <Col key={country.strArea} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                                <CountryCard country={country}/>
                            </Col>
                            ))
                        }
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
                      { meals.length > 0 &&
                        <div className="buttonContainer">
                          <Button radius="md" color="red" onClick={back}>
                            Back to search
                          </Button>
                      </div>
                      }
                    </>
                )}
              </Container>
          </div>
        )
}