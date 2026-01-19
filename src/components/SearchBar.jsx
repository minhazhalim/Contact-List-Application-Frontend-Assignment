import { useState, useRef, useCallback } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

function SearchBar() {
    const { searchTerm, setSearchTerm } = useContacts();
    const [inputValue, setInputValue] = useState(searchTerm);
    const inputRef = useRef(null);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        setSearchTerm(inputValue);
    }, [inputValue, setSearchTerm]);

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
        // Real-time search as user types
        setSearchTerm(e.target.value);
    }, [setSearchTerm]);

    return (
        <Form onSubmit={handleSearch}>
            <InputGroup className="w-100">
                <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder="search contact"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button variant="success" type="submit" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchBar;
