import { useState, useContext } from 'react';
import { cartContext } from '../../context/CartProvider';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css'
 
const ItemDetail = ({ productSelected }) => {
  const [count, setCount] = useState(1);
  const {cart, addToCart} = useContext(cartContext);
  console.log(cart)
  return (
    <div className='contenedor_prod'>
      <div className='producto'>
        <img src={`/imagenes/${productSelected.img}`}  className="foto" alt={productSelected.nombre}/>
        <h2>{productSelected.nombre}</h2>
        <h5>${productSelected.precio}</h5>
        <h5>Cantidad: {count}</h5>
        <ItemCount setCount={setCount}/>
        <button className='btn btn-primary boton' onClick={() => addToCart(productSelected, count)}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ItemDetail