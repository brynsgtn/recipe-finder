import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryCard from '../Components/CategoryCard';
import { useNavigate } from 'react-router-dom';
import { Pagination, Button, Loader, Breadcrumbs, Anchor } from '@mantine/core';
import '../Styles/Categories.css'

const fetcher = (url) => fetch(url).then(res => res.json());

// Limit of categoryCard items per page
const ITEMS_PER_PAGE = 8;

export default function Categories() {
    const { data } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);
    const [currentPage, setCurrentPage] = useState(1);
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            console.log("Categories: ", data.categories);
        }

        if (data && data.categories) {
            const totalPages = Math.ceil(data.categories.length / ITEMS_PER_PAGE);
            if (data.categories.length === 0) {
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
            <div className="loader-container">
                <Loader color="yellow" size="xl" type="bars" className="loader-item" />
            </div>
        );
    }

    // Breadcrumb items
    const breadcrumbItems = [
      { title: 'Home', href: '/' },
      { title: 'Search', href: '/home' },
      { title: 'Categories', href: '/categories' },
    ].map((item, index) => (
      <Anchor href={item.href} key={index}>
        {item.title}
      </Anchor>
    ));
    
    const { categories } = data;
    const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                        <h1 className="header">Categories:</h1>
                        <Row>
                            {currentCategories.map((category) => (
                                <Col key={category.idCategory} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                                    <CategoryCard category={category} />
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
                        {categories.length > 0 && (
                            <div className="buttonContainer">
                                <Button radius="md" color="red" onClick={back}>
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
