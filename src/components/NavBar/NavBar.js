
import './NavBar.css'
import logo from'../../assets/carrito.png'
import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'


const NavBar = () => {
    
  return (
    <div className='menu-navbar-container'>
        <NavLink to="/" className="link_title"><h2 className='menu-title'> Shop Online</h2></NavLink>
        <ul className='menu-items'>
            <li>
                <NavLink to="/" className='menu-list'>
                Productos
                </NavLink>
            </li>
            <li>
                <NavLink to="/category/remeras" className='menu-list'>
                Remeras
                </NavLink>
                
            </li>
            <li>
                <NavLink to="/category/camisas" className='menu-list'>
                Camisas
                </NavLink>
                
            </li>
        </ul>
        <div>
        <CartWidget/>
        </div>

    </div>
  )
}

export default NavBar