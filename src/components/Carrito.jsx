import React from 'react';
import { Container, Row, Col, Button, Table, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; 

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(amount);
};

const Carrito = () => {
    const { cart, removeItem, clearCart, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice(); 

    //carrito vacio
    if (cart.length === 0) {
        return (
            <Container className="mt-5 text-center p-5 border rounded shadow-sm bg-white">
                <h1 className="mb-4">🛒 Carrito Vacío</h1>
                <p className="lead">¡Parece que no has añadido nada todavía!</p>
                <Link to="/productos">
                    <Button variant="dark" size="lg" className="mt-3">
                        Ver Catálogo
                    </Button>
                </Link>
            </Container>
        );
    }

    //carrito con items
    return (
        <Container className="my-5">
            
            <Row>
                <Col lg={8}>
                    {/*boton vaciar carrito*/}
                    <div className="d-flex justify-content-end mb-3">
                        <Button 
                            variant="outline-danger" 
                            onClick={clearCart} 
                            className="text-uppercase"
                        >
                            Vaciar Carrito
                        </Button>
                    </div>

                    {/*tabla de productos*/}
                    <Table hover responsive className="shadow-sm bg-white rounded">
                        <thead className="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th className="text-center">Cant.</th>
                                <th className="text-end">Precio U.</th>
                                <th className="text-end">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td className="d-flex align-items-center">
                                        <Image src={item.imagenURL} rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="me-3" />
                                        <div>
                                            <p className="mb-0 fw-bold">{item.nombre}</p>
                                            <small className="text-muted">{item.categoria}</small>
                                        </div>
                                    </td>
                                    <td className="text-center align-middle">{item.quantity}</td>
                                    <td className="text-end align-middle">{formatCurrency(item.precio)}</td>
                                    <td className="text-end align-middle fw-bold">{formatCurrency(item.precio * item.quantity)}</td>
                                    <td className="text-center align-middle">

                                        {/*boton eliminar*/}
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => removeItem(item.id)} 
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                {/*resumen*/}
                <Col lg={4}>
                    <Card className="shadow-lg sticky-top" style={{ top: '20px' }}>
                        <Card.Body>
                            <Card.Title as="h3" className="mb-4 border-bottom pb-2">Resumen del Pedido</Card.Title>
                            
                            <div className="d-flex justify-content-between mb-3 fw-bold border-top pt-3">
                                <span className="text-uppercase">Total a pagar:</span>
                                <span className="text-danger fs-4">{formatCurrency(totalPrice)}</span>
                            </div>

                            <Button variant="success" size="lg" className="w-100 mt-3">
                                Finalizar Compra
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Carrito;
