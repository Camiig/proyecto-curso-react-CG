import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Alert, Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos';

//formateo de precio
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(amount);
};

const DetalleProducto = () => {
    //useNavigate para poder volver a la página anterior
    const navigate = useNavigate();
    //useParams() extrae los parametros de la url. si la ruta es /productos/101, id será "101"
    const { id } = useParams(); 
    
    const [producto, setProducto] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() =>{
        const fetchProducto = async () => {
            try {
                //fetch a la url con el ID específico
                const response = await fetch(`${API_URL}/${id}`); 
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();

                if (!data || Object.keys(data).length === 0) {
                     //si el producto no viene, lanza un error
                     throw new Error(`Producto con ID ${id} no encontrado.`);
                }
                
                setProducto(data); 
            } catch (e) {
                //capturamos cualquier error de red o no encontrado
                setError(e.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchProducto();
    }, [id]); 

    //manejo de estados (carga y error)

    if (loading) {
        //muestra esto mientras espera la respuesta de la API 
        return (
            <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" role="status" variant="dark" className="me-2" />
                <h2>Cargando Detalles del Producto...</h2>
            </Container>
        );
    }

    if (error || !producto) {
        //muestra esto si hay un error o el producto no existe
        return (
            <Container className="mt-5">
                <Alert variant="danger" className="text-center">
                    <Alert.Heading>¡Error al cargar el producto!</Alert.Heading>
                    <p>
                        {error ? error : `El producto con ID ${id} no fue encontrado.`}
                    </p>
                    {/*Boton de volver*/}
                    <hr />
                    <Button variant="outline-dark" onClick={() => navigate('/productos')}>
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Volver al Catálogo
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            {/* Boton para volver al catalogo */}
            <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver
            </Button>
            
            <Card className="shadow-lg p-3">
                <Row className="g-0">
                    <Col md={6}>
                        {/* muestra la imagen */}
                        <Card.Img 
                            variant="top" 
                            src={producto.imagenURL} 
                            style={{ height: 'auto', objectFit: 'contain', maxHeight: '500px' }} 
                            className="p-3"
                        />
                    </Col>
                    <Col md={6}>
                        <Card.Body className="p-5 d-flex flex-column justify-content-between">
                            <div>
                                <h1 className="display-4 fw-bold">{producto.nombre}</h1>
                                <p className="text-muted text-uppercase mb-3">{producto.categoria}</p>
                                
                                {/* Muestra la descripcion */}
                                <p className="lead mt-4">{producto.descripcion || "Descripción del producto."}</p>
                            </div>
                            
                            <div className="mt-5">
                                {/* Muestra el precio */}
                                <h2 className="text-success display-5 fw-bold mb-4">{formatCurrency(producto.precio)}</h2>
                                <Button 
                                    variant="dark"
                                    size="lg"
                                    className="w-100">
                                ¡Comprar Ahora!
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default DetalleProducto;