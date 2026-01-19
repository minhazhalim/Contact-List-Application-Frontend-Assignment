import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

function ContactForm() {
    const navigate = useNavigate();
    const { addContact, loading } = useContacts();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });

    const [validated, setValidated] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            await addContact(formData);
            navigate('/');
        } catch (error) {
            console.error('Failed to add contact:', error);
        }
    }, [formData, addContact, navigate]);

    const handleCancel = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="firstName" className="col-form-label">
                        First Name
                    </Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter first name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a first name.
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="lastName" className="col-form-label">
                        Last Name
                    </Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter last name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a last name.
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="email" className="col-form-label">
                        Email
                    </Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="phone" className="col-form-label">
                        Phone
                    </Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a phone number.
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="address" className="col-form-label">
                        Address
                    </Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                    />
                </Col>
            </Row>

            <hr />

            <Row className="mb-0">
                <Col md={{ span: 9, offset: 3 }}>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-1" />
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>{' '}
                    <Button variant="outline-secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ContactForm;
