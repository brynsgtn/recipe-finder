import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryCard from '../Components/CategoryCard';
import { useNavigate } from 'react-router-dom';
import { Pagination, Button } from '@mantine/core';

const fetcher = (url) => fetch(url).then(res => res.json());



const ITEMS_PER_PAGE = 8;

export default function Categories() {
    const { data, error } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate(); // Initialize useNavigate

    
    useEffect(() => {
        if (data) {
            console.log("Categories: ", data.categories);
        }
    }, [data]);

    useEffect(() => {
      if (data && data.categories) {
        const totalPages = Math.ceil(data.categories.length / ITEMS_PER_PAGE);
        if (data.categories.length === 0) {
          setCurrentPage(1); // Reset page to 1 when no meals
        } else if (currentPage > totalPages) {
          setCurrentPage(totalPages); // Adjust current page if necessary
        }
      }
    }, [data, currentPage]);
  
    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading...</div>;
  
    const { categories } = data;
    const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
     
      const back = () => {
        navigate(-1);
    }
    
    

    return (
        <div className="result-page-container">
            <Header />
            <Container fluid className="result-container py-5">
               <h1 className="header">Categories:</h1>
                <Row>
                {currentCategories.map((category) => (
                    <Col key={category.idCategory} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                        <CategoryCard category={category}/>
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
        {categories.length > 0 &&

          <div className="buttonContainer">
            <Button radius="md" color="red" onClick={back}>
              Back to search
            </Button>
        </div>
        
        }

            </Container>
        </div>
    );
}
