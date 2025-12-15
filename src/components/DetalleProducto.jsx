import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Spinner, Alert, Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './CartContext'; 

const API_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(amount);
};

const DetalleProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 


    const { addItem } = useCart(); 
    const [added, setAdded] = useState(false); 


    const [producto, setProducto] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

//funcion para agregar al carrito
    const handleOnAdd = () => {
        //aseguramos que el producto exista antes de agregarlo
        if (!producto || !producto.id) {
            console.error("Error al agregar: Producto no definido o sin ID.");
            return;
        }
        
        // Llama a addItem del CartContext
        addItem(producto, 1); 
        
        // Activa el feedback visual
        setAdded(true); 
    };


    //efecto para cargar el producto desde la api
    useEffect(() =>{
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Producto no encontrado`);
                }
                
                const data = await response.json();
                setProducto(data); 
            } catch (e) {
                setError(e.message); 
            } finally {
                setLoading(false); 
            }
        };
        
        fetchProducto();
    }, [id]);


    //loading y error
    if (loading){
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status" className="me-2" />
                <span>Cargando producto...</span>
            </Container>
        );
    }

    if (error){
        return (
            <Container className="mt-5">
                <Alert variant="danger">Error al cargar el producto: {error}</Alert>
                <Button variant="secondary" onClick={() => navigate(-1)} className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver
                </Button>
            </Container>
        );
    }

    if (!producto) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">Producto no encontrado.</Alert>
                <Button variant="secondary" onClick={() => navigate(-1)} className="mt-3">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver
                </Button>
            </Container>
        );
    }
    
    //renderizado final: producto cargado
    return (
        <Container className="my-5">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver a Productos
            </Button>
            
            <Card className="shadow-lg border-0">
                <Row className="g-0">
                    <Col md={6}>
                        <Card.Img 
                            src={producto.imagenURL} 
                            alt={producto.nombre} 
                            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} 
                            className="p-3"
                        />
                    </Col>
                    <Col md={6}>
                        <Card.Body className="p-5 d-flex flex-column justify-content-between">
                            <div>
                                <h1 className="display-4 fw-bold">{producto.nombre}</h1>
                                <p className="text-muted text-uppercase mb-3">{producto.categoria}</p>
                                
                                <p className="lead mt-4">{producto.descripcion || "Descripción del producto."}</p>
                            </div>
                            
                            <div className="mt-5">
                                {/*muestra el precio*/}
                                <h2 className="text-success display-5 fw-bold mb-4">{formatCurrency(producto.precio)}</h2>


                                
                                {/*logica condicional para el feedback*/}
                                {
                                    added ? (
                                        //muestra mensaje y botones de accion despues de agregar
                                        <div className="d-grid gap-2">
                                            <p className='text-success fw-bold'>✅ ¡Producto añadido al carrito!</p>
                                            <Link to="/carrito" className="d-grid">
                                                <Button variant="success" size="lg">
                                                    Finalizar Compra
                                                </Button>
                                            </Link>
                                            <Button variant="outline-secondary" onClick={() => setAdded(false)}>
                                                Agregar otra unidad
                                            </Button>
                                        </div>
                                    ) : (

                                        <Button 
                                            variant="dark"
                                            size="lg"
                                            className="w-100"
                                            onClick={handleOnAdd} 
                                        >
                                            Agregar al Carrito
                                        </Button>
                                    )
                                }
                                
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default DetalleProducto;