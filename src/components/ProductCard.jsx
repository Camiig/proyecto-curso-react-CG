import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => { 

  return (
    <Card className="shadow-sm h-100">
      <Link to={`/producto/${producto.id}`}> 
        <Card.Img 
          variant="top" 
          src={producto.imagenURL} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
      </Link>
      
      <Card.Body className="d-flex flex-column">
        <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
          <Card.Title>{producto.nombre}</Card.Title>
        </Link>
        
        <Card.Subtitle className="mb-2 text-muted">{producto.categoria}</Card.Subtitle>
        
        <div className="mt-auto">
          <h5 className="text-success mb-2">${producto.precio.toFixed(2)}</h5>
          
          <Button 
            variant="dark" 
            //(La logica del carrito iria aqui) 
          >
            Agregar al Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;