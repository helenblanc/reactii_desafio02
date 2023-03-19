import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const CustomNavbar = () => {
    return (
            <Navbar bg="dark" variant="dark">
                <Container className="justify-content-start">
                    <Navbar.Brand>HELEN BLANC</Navbar.Brand>
                    <Link to="/" className="text-white ms-3 text-decoration-none">
                    Home
                    </Link>
                    <Link to="/favorite" className="text-white ms-3 text-decoration-none">
                    Favorite
                    </Link>
                </Container>
            </Navbar>
    );
};

export default CustomNavbar;