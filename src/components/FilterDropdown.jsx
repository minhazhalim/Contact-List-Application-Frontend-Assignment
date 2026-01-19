import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

function FilterDropdown() {
    const { filter, setFilter } = useContacts();

    const handleFilterChange = useCallback((e) => {
        setFilter(e.target.value);
    }, [setFilter]);

    return (
        <div className="d-flex align-items-center justify-content-between p-3">
            <div className="fs-2">
                <i className="fa fa-filter text-success"></i> Filter
            </div>
            <Form.Select
                aria-label="Filter contacts"
                value={filter}
                onChange={handleFilterChange}
            >
                <option value="default">Default</option>
                <option value="firstName">First Name (A → Z)</option>
                <option value="lastName">Last Name (A → Z)</option>
                <option value="oldest">Oldest To First</option>
            </Form.Select>
        </div>
    );
}

export default FilterDropdown;
