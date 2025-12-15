import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos';

const FormularioProducto = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagenURL: '',
        isFeatured: false, 
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //funcion para enviar los datos a la API (CRESTE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const nuevoProducto = {
            ...formData,
            precio: Number(formData.precio), 
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const data = await response.json();
            console.log("Producto creado exitosamente:", data);

            setSuccess(true);
            
            setTimeout(() => {
                navigate('/gestion-productos');
            }, 2000);

        } catch (err) {
            console.error("Error al crear:", err);
            setError("No se pudo guardar el producto: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Button 
                variant="secondary" 
                onClick={() => navigate('/gestion-productos')} 
                className="mb-4"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> 
                Volver al Panel
            </Button>
            
            <Card className="shadow-lg border-0">
                <Card.Header as="h3" className="text-center bg-dark text-white py-3">
                    Añadir Nuevo Producto
                </Card.Header>
                <Card.Body className="p-4">
                    
                    {/*mensajes de feedback*/}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">✅ ¡Producto añadido con exito! Redirigiendo...</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Ej: Campera North Face"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="descripcion"
                                placeholder="Breve descripción del producto..."
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Precio (ARS)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="precio"
                                        placeholder="0.00"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Categoría</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="categoria"
                                        placeholder="Ej: Abrigos"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">URL de la Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagenURL"
                                placeholder="https://link-de-la-imagen.jpg"
                                value={formData.imagenURL}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 bg-light p-3 rounded border">
                            <Form.Check 
                                type="switch"
                                id="isFeatured-switch"
                                label="¿Destacar en el Home?"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" size="lg" disabled={loading || success}>
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                                        Guardando en Base de Datos...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSave} className="me-2" />
                                        Confirmar y Guardar
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormularioProducto;