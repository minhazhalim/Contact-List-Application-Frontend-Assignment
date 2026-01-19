import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Container } from 'react-bootstrap';

function Navbar() {
    return (
        <BsNavbar expand="lg" className="navbar-light">
            <Container>
                <Link to="/" className="navbar-brand text-uppercase">
                    <strong>Contact</strong> App
                </Link>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
