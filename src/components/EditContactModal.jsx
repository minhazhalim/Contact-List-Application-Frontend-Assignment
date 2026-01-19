import { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

function EditContactModal({ show, onHide, contact }) {
    const { updateContact, loading } = useContacts();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });

    const [validated, setValidated] = useState(false);

    // Update form when contact changes
    useEffect(() => {
        if (contact) {
            setFormData({
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                email: contact.email || '',
                phone: contact.phone || '',
                address: contact.address || '',
            });
            setValidated(false);
        }
    }, [contact]);

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
            await updateContact(contact.id, formData);
            onHide();
        } catch (error) {
            console.error('Failed to update contact:', error);
        }
    }, [contact, formData, updateContact, onHide]);

    if (!contact) return null;

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton className="card-title">
                <Modal.Title>
                    <strong>Edit Contact</strong>
                </Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label className="col-form-label">First Name</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control
                                type="text"
                                name="firstName"
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
                            <Form.Label className="col-form-label">Last Name</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control
                                type="text"
                                name="lastName"
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
                            <Form.Label className="col-form-label">Email</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label className="col-form-label">Phone</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control
                                type="text"
                                name="phone"
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
                            <Form.Label className="col-form-label">Address</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-1" />
                                Updating...
                            </>
                        ) : (
                            'Update Contact'
                        )}
                    </Button>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditContactModal;
