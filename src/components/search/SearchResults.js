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
                const response = await api.get(`/api/v1/movies/search?query=${encodeURIComponent(query)}`);
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
                {results.map((movie) => (
                    <Col key={movie.imdbId}>
                    <Card className="h-100 bg-dark text-white">
                        <Card.Img variant="top" src={movie.poster} alt={movie.title} />
                        <Card.Body>
                            <Card.Title>
                                <Link 
                                    to={`/Reviews/${movie.imdbId}`} 
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    {movie.title}
                                </Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchResults;