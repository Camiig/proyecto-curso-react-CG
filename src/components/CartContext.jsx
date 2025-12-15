import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Custom Hook para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

// 3. Provider: Componente que envuelve la app y provee el estado
export const CartProvider = ({ children }) => {
    // Estado donde guardaremos la lista de productos
    const [cart, setCart] = useState([]);

    // FUNCIÓN DEPURACIÓN (Muestra el estado cada vez que cambia)
    useEffect(() => {
        console.log("ESTADO FINAL DEL CARRITO:", cart);
    }, [cart]);

    // FUNCIONES CLAVE DEL CARRITO

    // A. Verificar si un item ya está en el carrito
    const isInCart = (id) => {
        const idString = id.toString();
        // Compara ID string con el ID string de los items en el carrito
        return cart.some(item => item.id.toString() === idString);
    };

    // B. Agregar un item al carrito (o actualizar la cantidad)
    const addItem = (item, quantity) => {
        //Aseguramos que el item que se añade tiene su ID como string
        const newItemWithIdString = { ...item, id: item.id.toString() };
        const newCartItem = { ...newItemWithIdString, quantity };

        if (isInCart(newItemWithIdString.id)) {
            setCart(prevCart =>
                prevCart.map(prod =>
                    //Forzamos la comparación a string en el map
                    prod.id.toString() === newItemWithIdString.id 
                        ? { ...prod, quantity: prod.quantity + quantity }
                        : prod
                )
            );
        } else {
            setCart(prevCart => [...prevCart, newCartItem]);
        }
    };

    // C. Eliminar un item por ID
    const removeItem = (id) => {
        const idString = id.toString();
        setCart(prevCart => prevCart.filter(item => item.id.toString() !== idString));
    };

    // D. Vaciar todo el carrito
    const clearCart = () => {
        setCart([]);
    };

    // E. Calcular la cantidad total de ítems
    const getTotalItems = () => {
        return cart.length;
    };
    
    // F. Calcular el precio total
    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };


    const contextValue = {
        cart,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        getTotalItems,
        getTotalPrice,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};