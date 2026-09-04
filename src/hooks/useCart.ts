import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/data'
import type { CartItem, Guitar } from '../types'

export const useCart = () => {

    //liminte de items en el carrito
    const MAX_ITEMS_PER_PRODUCT = 5;
    const [data, setData] = useState(db);
    const [cart, setCart] = useState((): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    });
    //state derivado
    const IsEmpty = useMemo(() => cart.length === 0, [cart]);
    //Calcular totales
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    const addToCart = (product: Guitar) => {
        if (cart.some(item => item.id === product.id)) {
            setCart(prevCart => prevCart.map(item => item.id === product.id && item.quantity < MAX_ITEMS_PER_PRODUCT  /*5*/ ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    }

    const removeToCart = (product: CartItem, action: string = '-') => {
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

    const clearCart = () => {
        setCart([]);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return {
        cart, setCart, data, addToCart, removeToCart, clearCart, IsEmpty, cartTotal
    }
}


