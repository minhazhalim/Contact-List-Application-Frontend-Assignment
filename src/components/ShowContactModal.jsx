import { Modal, Button, Row, Col } from 'react-bootstrap';

function ShowContactModal({ show, onHide, contact, onEdit }) {
    if (!contact) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="card-title">
                <Modal.Title>
                    <strong>Contact Details</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-3">
                    <Col md={4}>
                        <label className="col-form-label fw-bold">First Name</label>
                    </Col>
                    <Col md={8}>
                        <p className="form-control-plaintext text-muted">{contact.firstName}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <label className="col-form-label fw-bold">Last Name</label>
                    </Col>
                    <Col md={8}>
                        <p className="form-control-plaintext text-muted">{contact.lastName}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <label className="col-form-label fw-bold">Email</label>
                    </Col>
                    <Col md={8}>
                        <p className="form-control-plaintext text-muted">{contact.email}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <label className="col-form-label fw-bold">Phone</label>
                    </Col>
                    <Col md={8}>
                        <p className="form-control-plaintext text-muted">{contact.phone}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <label className="col-form-label fw-bold">Address</label>
                    </Col>
                    <Col md={8}>
                        <p className="form-control-plaintext text-muted">{contact.address || 'N/A'}</p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={onEdit}>
                    <i className="fa fa-edit me-1"></i> Edit
                </Button>
                <Button variant="outline-secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowContactModal;
