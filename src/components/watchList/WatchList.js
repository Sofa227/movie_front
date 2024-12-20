import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

const WatchList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const username = localStorage.getItem('username');
            if (!username) return;

            const response = await api.get(`/api/v1/users/wishlist/${username}`);
            const wishlistIds = response.data;

            // Загружаем информацию о фильмах по ID
            const moviePromises = wishlistIds.map((id) => 
                api.get(`/api/v1/movies/${id}`) // Предполагается, что есть эндпоинт для получения фильма по ID
            );
            const movieResponses = await Promise.all(moviePromises);
            const movieData = movieResponses.map((res) => res.data);

            setWishlist(wishlistIds);
            setMovies(movieData);
        } catch (error) {
            console.error('Ошибка при загрузке списка желаний:', error);
        }
    };

    const removeFromWishlist = async (movieId) => {
        try {
            const username = localStorage.getItem('username');
            if (!username) return;

            const payload = { username, movieId };
            const response = await api.post('/api/v1/users/wishlist/remove', payload);

            if (response.status === 200) {
                const updatedWishlist = response.data;
                setWishlist(updatedWishlist);

                setMovies((prevMovies) => prevMovies.filter((movie) => movie.imdbId !== movieId));
            }
        } catch (error) {
            console.error('Ошибка при удалении фильма из списка желаний:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 style={{ color: 'white' }}>Список желаний</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {movies.map((movie) => (
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
                                <Button 
                                    variant="danger" 
                                    onClick={() => removeFromWishlist(movie.imdbId)}
                                >
                                    Удалить из списка
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default WatchList;
