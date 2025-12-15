import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Button, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const API_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos'; 

const Productos = () => {
    const [productos, setProductos] = useState([]); 
    
    const [filtroActivo, setFiltroActivo] = useState('Todo');
    
    const [loading, setLoading] = useState(true); 

    const [error, setError] = useState(null); 

    useEffect(() =>{
        const fetchProductos = async () => {
            try {
                const response = await fetch(API_URL); 
                const data = await response.json();
                setProductos(data); 
            } catch (e) {
                setError(e.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchProductos();
    }, []); 

    // 1. obtener categorias unicas
    const categorias = ['Todo', ...new Set(productos.map(p => p.categoria))];

    // 2. aplicar fltro
    const productosFiltrados = productos.filter(producto => 
        filtroActivo === 'Todo' || producto.categoria === filtroActivo
    );
    
    //logica de renderizado

    if (loading) {
        return <Container className="text-center mt-5"><Spinner animation="border" role="status" /><p>Cargando productos...</p></Container>;
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger">Error al cargar los datos: {error}</Alert></Container>;
    }

    return (
        <Container className="mt-5">

            <Nav variant="pills" className="justify-content-center mb-5" defaultActiveKey="Todo">
                {categorias.map(cat => (
                    <Nav.Item key={cat}>
                        <Nav.Link 
                            eventKey={cat} 
                            onClick={() => setFiltroActivo(cat)}
                            style={{ 
                                backgroundColor: filtroActivo === cat ? '#212529' : 'transparent', 
                                color: filtroActivo === cat ? 'white' : '#212529', 
                                border: '1px solid #212529', 
                                margin: '0 5px'
                            }}
                        >
                            {cat}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            {/*lista de productos filtrados*/}
            <Row xs={1} md={2} lg={3} className="g-4">
                {productosFiltrados.map(producto => (
                    <Col key={producto.id}>
                        <ProductCard producto={producto} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Productos;