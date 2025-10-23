import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';

//estilo personalizado para el footer con css
const footerStyle = {
  backgroundColor: '#8d8d8d',
}

const Footer = () => {
  return(
    <footer style={footerStyle} className="text-dark py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-1">
              <FontAwesomeIcon icon={faClock} className="me-2" />
              Lunes a Viernes: 10 a 20 hs
            </p>
            <p className="mb-0">
              <FontAwesomeIcon icon={faLocationDot} className="me-2" />
              Av. Libertador 858, Palermo
            </p>
          </Col>

          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-dark me-3 fs-5">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-dark me-3 fs-5">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="text-dark fs-5">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <small>© 2025 The North Shop - Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;