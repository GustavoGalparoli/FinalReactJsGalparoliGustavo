import './Cart.css'
import { useContext, useState, useEffect } from 'react'
import { cartContext } from '../../context/CartProvider'
import { Link } from 'react-router-dom'
import { collection, addDoc, getFirestore, doc, updateDoc} from 'firebase/firestore';
import swal from 'sweetalert'
import moment from 'moment'

const Cart = (product) => {
  const { cart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const {removeProduct} = useContext(cartContext);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const getTotalPrice = () => {
     setTotal(cart.reduce((acc, product) => acc + product.precio * product.quantity, 0)
     );
  };

  const createOrder = () => {
    const db = getFirestore();
    const query = collection(db, 'order');
    const newOrder = {
      buyer: {
        name: formValues.name,
        phone: formValues.phone,
        email: formValues.email,
      },
      date: moment().format('DD/MM/YYYY'),
      items: cart,
      total: total,
    };
    addDoc(query, newOrder)
    .then((response) => {
      swal(`Orden creada con el id ${response.id}`)
      return(response)
    })
    .then((res) => {
      cart.forEach((product) => {
        const query = doc(db, 'products', product.id);
        updateDoc(query,{
          stock: product.stock - product.quantity,
        }) 
      });
    })
    .catch((error) => console.log(error));
  };



  useEffect(() => {
    getTotalPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])
   
  const handleInputChange = (event) => {
    setFormValues ({
      ...formValues,
      [event.target.name] : event.target.value,
    });
  }

  if (cart.length === 0) {
    return (
        <div className='carrito_vacio'>
            <h3 className="m-5 noElements">No hay elementos en el carrito.</h3>
            <Link to='/'><button className='btn btn-primary boton'>Hacer compras</button></Link>
           
        </div>
    );
}
  return (
    <div className='contenedor_principal'>
      {cart.map((product) => (
        <div key={product.id} className="contenedor_carrito">
          <img src={`/imagenes/${product.img}`} alt={product.nombre} className="foto" />
          <h4>{product.nombre}</h4>
          <h4>Precio: ${product.precio}</h4>
          <h4>Cantidad: {product.quantity}</h4>
          <h4>SubTotal: ${product.precio * product.quantity}</h4>
          <button className='btn btn-primary boton_carrito' onClick={() => removeProduct(product.id)}>Eliminar</button>

        </div>
      ))}
      <div className='contenedor_total'>
        <h2>Total: ${total}</h2>
        <div className='formulario'>
        <h3>Formulario</h3>
        <input 
          name='name' 
          type="text" 
          placeholder='Nombre'
          value= {formValues.name}
          onChange={handleInputChange}
        />
        <input 
          name='phone' 
          type="text" 
          placeholder='Telefono'
          value= {formValues.phone}
          onChange={handleInputChange}
        />
        <input 
          name='email' 
          type="text" 
          placeholder='Email'
          value= {formValues.email}
          onChange={handleInputChange}
          />
      </div>
        <button className='btn btn-primary boton_carrito' onClick={createOrder}>Crear Orden</button>
      </div>
      
    </div>
  )
}

export default Cart