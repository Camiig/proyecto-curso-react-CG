import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import './Home.css'; 

import ItemListContainer from './ItemListContainer'; 

import heroImage from '../../public/home-got.jpg'; 

const Home = () => {
  return (
    <> 
      <Container fluid className="p-0">
        <div className="home-hero-section">
          <Container>
            <Row className="align-items-center">
              
                {/*COLUMNA IZQUIERDA*/}
              <Col 
                lg={6} 
                md={12} 
                className="p-5 d-flex flex-column justify-content-center" 
                style={{ minHeight: '400px' }} 
              >
                <div className="text-center"> 
                  <h1 className="home-hero-title">
                    ¿A qué casa juras lealtad?
                  </h1>
                  <Button 
                    variant="dark" 
                    size="lg" 
                    className="mt-5" 
                    href="/productos" 
                  >
                    Ver Productos
                  </Button>
                </div>
              </Col>

              {/*COLUMNA DERECHA*/}
              <Col lg={6} md={12} className="d-none d-lg-block">
                <div 
                  className="home-hero-image-col" 
                  style={{ backgroundImage: `url(${heroImage})` }}
                >
                </div>
              </Col>

            </Row>
          </Container>
        </div>
      </Container>
      



      <ItemListContainer greeting="Productos Destacados" /> 
    </>
  );
};

export default Home;