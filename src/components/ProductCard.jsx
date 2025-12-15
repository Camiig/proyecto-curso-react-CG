import React from 'react';
import { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; 


const ProductCard = ({ producto }) => { 
  const { addItem } = useCart(); 

  const [showToast, setShowToast] = useState(false);

  //funcion para agregar 1 unidad del producto actual al carrito
  const handleOnAdd = (e) => {
    e.preventDefault(); 
    
  //llamamos a addItem con el producto que se recibio por props
    addItem(producto, 1);

    setShowToast(true);

  //ocultamos el toast después de 3 segundos
    setTimeout(() => setShowToast(false), 3000);
    console.log(`[ProductCard] Agregado 1 unidad de ${producto.nombre} al carrito.`);
  };
  
  //formateo de precio
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(amount);
  };


  return (
    <>
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
          <h5 className="text-success mb-2">{formatCurrency(producto.precio)}</h5>
          
          <Button 
            variant="dark" 
            className='w-100'
            onClick={handleOnAdd} 
          >
            Agregar al Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>

    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
          bg="success" 
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">🛒 Carrito</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            "{producto.nombre}" ha sido añadido al carrito.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      </>
  );
};

export default ProductCard;