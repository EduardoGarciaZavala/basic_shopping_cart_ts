import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/data'

export const useCart = () => {



    //liminte de items en el carrito
    const MAX_ITEMS_PER_PRODUCT = 5;
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(() => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    });
    //state derivado
    const IsEmpty = useMemo(() => cart.length === 0, [cart]);
    //Calcular totales
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (parseFloat(item.quantity) * parseFloat(item.price)), 0), [cart]);

    const addToCart = (product : Guitar) => {
        if (cart.some(item => item.id === product.id)) {
            setCart(prevCart => prevCart.map(item => item.id === product.id && item.quantity < MAX_ITEMS_PER_PRODUCT  /*5*/ ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    }

    const removeToCart = (product = {}, action = '-') => {
        switch (action) {
            case '-':
                setCart(prevCart => prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)
                    .filter(item => item.quantity > 0));
                break;
            case 'x':
                setCart(prevCart => prevCart.filter((item) => item.id !== product.id));
                break;
            case 'empty':
                setCart([]);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return {
        cart, setCart, data, addToCart, removeToCart, IsEmpty, cartTotal
    }
}


