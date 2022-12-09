import React from 'react'
import logo from'../../assets/carrito.png'
import './CartWidget.css'
import { useContext } from 'react'
import { cartContext } from '../../context/CartProvider'
import { Link,} from 'react-router-dom'


const CartWidget = () => {
  const {cart} = useContext(cartContext);
  return (
    <div className='menu_navbar__logo'>
      <Link  to="/cart" className='carrito'><i className="bi bi-cart3"></i>{cart.length > 0 && cart.length}</Link>
    </div>
  )
}

export default CartWidget