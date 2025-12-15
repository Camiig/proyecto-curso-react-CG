// src/components/GestionProductos.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://68f2a286b36f9750deed427f.mockapi.io/v1/productos'; 

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(amount);
};


const GestionProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 


    //(READ)
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProductos(data); 
        } catch (e) {
            setError("Error al cargar los datos: " + e.message); 
        } finally {
            setLoading(false); 
        }
    };

    //(DELETE)
    const handleDelete = async (id, nombre) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar el producto "${nombre}" (ID: ${id})? Esta acción es irreversible.`)) {
            return; 
        }

        try {
            setLoading(true);
            
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }

            //si es exitoso se vuelve a cargar la lista actualizada
            await fetchProductos(); 
            
            console.log(`Producto ${id} eliminado exitosamente.`);
            
        } catch (e) {
            setError(`Error al eliminar el producto ${id}: ${e.message}`);
            setLoading(false); 
        }
    };

    //al cargar el componente llama al read
    useEffect(() => {
        fetchProductos();
    }, []); 


    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status" className="me-2" />
                <span>Cargando productos para la gestión...</span>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="info" onClick={fetchProductos}>Reintentar Carga</Button>
            </Container>
        );
    }
    
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Panel de Gestión de Productos</h1>
            
            <div className="d-flex justify-content-end mb-4">
                <Button 
                    variant="success" 
                    onClick={() => navigate('/gestion-productos/crear')} 
                    className="shadow"
                >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Crear Nuevo Producto
                </Button>
            </div>

            <Table striped bordered hover responsive className="shadow-sm bg-white">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th className="text-center">Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>
                                <Image 
                                    src={producto.imagenURL} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    rounded
                                />
                            </td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>{formatCurrency(producto.precio)}</td>
                            <td className="text-center">
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleEdit(producto.id)} 
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleDelete(producto.id, producto.nombre)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    );
};

export default GestionProductos;