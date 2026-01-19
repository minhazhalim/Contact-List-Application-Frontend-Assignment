import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';

function AddContactPage() {
    return (
        <main className="py-5">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header className="card-title">
                                <strong>Add New Contact</strong>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={12}>
                                        <ContactForm />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default AddContactPage;
