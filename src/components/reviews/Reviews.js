import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);

    useEffect(() => {
        checkWishlistStatus();
    }, [movieId]);

    const checkWishlistStatus = async () => {
        try {
            const username = localStorage.getItem('username');
            if (!username) return;

            const response = await api.get(`/api/v1/users/wishlist/${username}`);
            const wishlist = response.data;
            setIsInWishlist(wishlist.includes(movieId));
        } catch (error) {
            console.error('Ошибка при проверке списка желаемого:', error);
        }
    };

    const toggleWishlist = async () => {
        try {
            const username = localStorage.getItem('username');
            if (!username) {
                alert('You must be logged in to modify your wishlist');
                return;
            }

            const payload = { username, movieId };

            if (isInWishlist) {
                await api.post('/api/v1/users/wishlist/remove', payload);
            } else {
                await api.post('/api/v1/users/wishlist/add', payload);
            }
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error('Ошибка при изменении списка желаемого:', error);
        }
    };

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const username = localStorage.getItem('username'); // Получаем username из localStorage
            if (!username) {
                alert('You must be logged in to leave a review');
                return;
            }

            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId, username });

            const updatedReviews = [...reviews, { body: rev.value, username }];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        } catch (err) {
            console.error('Ошибка при добавлении отзыва:', err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Обзор</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm 
                                    handleSubmit={addReview} 
                                    revText={revText} 
                                    labelText="Напишите ревью:"
                                    isInWishlist={isInWishlist}
                                    onWishlistClick={toggleWishlist}
                                />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews?.map((r) => {
                            return (
                                <React.Fragment key={r.id}>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <strong>User: {r.username}</strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            );
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>        
        </Container>
    );
};

export default Reviews;
