import { Link } from "react-router-dom"
import './Item.css'

const Item = ({product}) => {
  return (
    
    <div className="contenedor_producto">
      
      <Link to={`/item/${product.id}`} className="link_item">
        <img src={`/imagenes/${product.img}`} className="foto_item" alt={product.nombre}/>
        <h2 className="titulo">{product.nombre}</h2>
      </Link>
        <h4>${product.precio}</h4>
    </div>
    
  )
}

export default Item