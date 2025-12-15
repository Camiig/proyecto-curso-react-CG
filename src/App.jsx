import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';

import Home from './components/Home';
import Productos from './components/Productos';
import Login from './components/Login';
import Carrito from './components/Carrito';
import DetalleProducto from './components/DetalleProducto';
import GestionProductos from './components/GestionProductos';
import FormularioProducto from './components/FormularioProducto';

import { CartProvider } from './components/CartContext';
import { Navigate } from 'react-router-dom';

function App() {
    //de entrada no esta logueado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //funciones para ,anejar el estado
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return(
        <CartProvider>
        <div className = "d-flex flex-column min-vh-100 bg-light">
            {/*pasamos el estado y la funcion al header*/}
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 

            <main className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route 
                        path="/gestion-productos" 
                        //solo si isLoggedIn es true, muestra el componente, Si no, redirige a login
                        element={isLoggedIn ? <GestionProductos /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/gestion-productos/crear" 
                        element={isLoggedIn ? <FormularioProducto /> : <Navigate to="/login" />} 
                    />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/producto/:id" element={<DetalleProducto />} />

                    <Route 
                        path="/login" 
                        element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} 
                    />
                </Routes>
            </main>

      <Footer />

    </div>
    </CartProvider>
);

};

export default App;