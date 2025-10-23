import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // <-- AGREGADO 'Button' AQUI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logoSrc from '../../public/logo-stark-transparente.png';

// estilo personalizado para el header con css
const headerStyle = {
    backgroundColor: '#8d8d8d',
    color: '#212529', 
};

const Header = ({isLoggedIn, handleLogout}) => {
    return(
        <Navbar style={headerStyle} expand="lg" className="mb-4">
            <Container>
                {/*lado izquierdo: logo y titulo*/}
                <Navbar.Brand as= {Link} to="/" className="d-flex align-items-center">
                <img 
                    //uso de la ruta importada del logo
                    src={logoSrc}
                    alt="The North Shop Logo"
                    className="d-inline-block align-top me-3"
                    style={{width: '45px', height: '45px' }}
                />

                <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#212529', fontFamily: "'Cinzel', 'UnifrakturCook', Georgia, 'Times New Roman', serif"}}>
                    THE NORTH SHOP
                </span>
                </Navbar.Brand>

                {/*Lado derecho: navbar */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" style={{color: '#212529', fontWeight: '500'}} className="me-4">
                        Inicio 
                        </Nav.Link>
                        <Nav.Link as={Link} to="/productos" style={{color: '#212529', fontWeight: '500'}} className="me-4">
                        Productos 
                        </Nav.Link>
                        
                        {isLoggedIn ? (
                            <Button 
                                variant="outline-dark" 
                                onClick={handleLogout} //llama a la función de App.jsx
                                style={{ fontWeight: '500' }}
                                className="me-4">
                                    Logout
                            </Button>
                        ) : (
                        <Nav.Link as={Link} to="/login" style={{ color: '#212529', fontWeight: '500' }} className="me-4">
                        Login
                        </Nav.Link>
                        )}
                        <Link to="/carrito" className="align-middle mt-1" style={{color: '#212529'}}>
                        <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;


