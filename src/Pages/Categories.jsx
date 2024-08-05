import { useEffect } from 'react';
import useSWR from 'swr';
import { Header } from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryCard from '../Components/CategoryCard';

const fetcher = (url) => fetch(url).then(res => res.json());




export default function Categories() {
    const { data, error } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);

    useEffect(() => {
        if (data) {
            console.log("Categories: ", data.categories);
        }
    }, [data]);

    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading...</div>;

    const { categories } = data;

    return (
        <div className="result-page-container">
            <Header />
            <Container fluid className="result-container py-5">
               <h1 className="header">Categories:</h1>
                <Row>
                {categories.map((category) => (
                    <Col key={category.idCategory} xs={12} sm={6} md={4} lg={3} className="d-flex flex-column my-4">
                        <CategoryCard category={category}/>
                    </Col>
                    ))
                }
                </Row>

            </Container>
        </div>
    );
}
