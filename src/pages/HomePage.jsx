import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import ContactTable from '../components/ContactTable';

function HomePage() {
    return (
        <main className="py-5">
            <Container>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header className="card-title">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h2 className="mb-0">All Contacts</h2>
                                    <div className="search-container">
                                        <SearchBar />
                                    </div>
                                    <div>
                                        <Link to="/add" className="btn btn-success">
                                            <i className="fa fa-plus-circle"></i> Add New
                                        </Link>
                                    </div>
                                </div>
                            </Card.Header>
                            <FilterDropdown />
                            <Card.Body>
                                <ContactTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default HomePage;
