import { createContext, useState } from "react";

export const cartContext = createContext([]);

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const addToCart = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(cart.map(product => {
                return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product
            }));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    }
    
    const totalPrice = () =>  {
        return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);
    }

    const totalProducts = () => cart.reduce((acumulador, productoActual) => acumulador + productoActual.quantity, 0);

    const clearCart = () => setCart([]);
    
    const isInCart = (id) => cart.find(product => product.id === id) ? true : false;

    const removeProduct = (id) => setCart(cart.filter(product => product.id !== id));
    
    return (
        <cartContext.Provider  value={{
            clearCart,
            isInCart,
            removeProduct,
            addToCart,
            totalPrice,
            totalProducts,
            cart
        }}>
            {children}
        </cartContext.Provider>
    )
}


export default CartProvider;