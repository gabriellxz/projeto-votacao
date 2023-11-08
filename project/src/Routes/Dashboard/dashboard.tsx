import './style.css'
import Navbar from "../../componentsSVG/navbar-icon/navbar-icon";
import NotificationIcon from "../../componentsSVG/notification-icon/notification-icon";
// import iconPerfil from '../../assets/img/icon-perfil.svg'
import { useContext } from 'react';
import { Context } from '../../context/authContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {

    const { autenticado, logout } = useContext(Context)
    console.log("Usuário logado: " + autenticado)

    return (
        <>
            <header className='header-dashboard'>
                <div className="container-navbar-icon">
                    <Navbar/>
                </div>
                <div className="container-btn-logout">
                    <NotificationIcon/>
                    <Link to={"/"} onClick={logout} className='btn-dashboard'>
                        <button>
                            sair
                        </button>
                    </Link>
                </div>
            </header>
        </>
    )
}