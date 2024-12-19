import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
    <Form className="d-flex search-form" onSubmit={handleSearch}>
        <FormControl
        type="search"
        placeholder="Поиск фильмов..."
        className="me-2 search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
    </Form>
    );
};

export default Search;