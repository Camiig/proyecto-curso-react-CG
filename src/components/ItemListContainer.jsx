import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

const MOCKAPI_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos'; 

const ItemListContainer = ({ greeting }) => {
  //estados para manejar los datos y la UI
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(MOCKAPI_URL);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // DESTACADOS solo incluye ítems con isFeatured: true y toma los primeros 4
        const featuredItems = data
          .filter(item => item.isFeatured === true)
          .slice(0, 4); 
        
        setItems(featuredItems);
        setError(null);
        
      } catch (e) {
        console.error("Error al cargar los productos:", e);
        setError("No pudimos cargar los productos destacados.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); 

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5" style={{ fontFamily: "'Cinzel', serif" }}>
        {greeting}
      </h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {loading && !error ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="dark">
            <span className="visually-hidden">Cargando productos...</span>
          </Spinner>
        </div>
      ) : (

        //grid de productos 
        <Row className="g-4"> 
          {items.map(item => (
            <Col key={item.id} sm={6} md={4} lg={3}> 
              <Card className="text-center shadow-sm h-100">
                <Card.Img 
                    variant="top" 
                    src={item.imagenURL || 'https://via.placeholder.com/200'} 
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{item.nombre || 'Producto Sin Nombre'}</Card.Title>
                  <Card.Text className="text-danger fw-bold">${item.precio || 'N/A'}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/producto/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="dark" size="sm" className="w-100">Ver Detalle</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ItemListContainer;