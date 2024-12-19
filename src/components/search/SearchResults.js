import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = searchParams.get('query');

    useEffect(() => {
        const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/v1/search/multi?query=${encodeURIComponent(query)}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
        };

        if (query) {
        fetchResults();
        }
    }, [query]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <Container className="search-results">
        <h2>Результаты поиска: {query}</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
            {results.map((item) => (
            <Col key={item.id}>
                <Card className="search-card">
                <Card.Img 
                    variant="top" 
                    src={item.poster || item.backdrop} 
                    alt={item.title}
                />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.overview?.substring(0, 100)}...</Card.Text>
                    <Link to={`/movie/${item.imdbId}`} className="btn btn-outline-light">
                    Подробнее
                    </Link>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>
    );
};

export default SearchResults;