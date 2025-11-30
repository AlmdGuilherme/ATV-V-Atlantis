import { Link, useLocation } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <h1>Atlantis - Water Park</h1>
      <ul>
        <Link to={'/'} className={location.pathname === '/' ? 'is-active':'not-active'}>
          Home
        </Link>
        <Link to={'/hospedagens'} className={location.pathname === '/hospedagens' ? 'is-active':'not-active'}>
          Hospedagens
        </Link>
        <Link to={'/clientes'} className={location.pathname === '/clientes' ? 'is-active':'not-active'}>
          Clientes
        </Link>
      </ul>
    </nav>
  )
}