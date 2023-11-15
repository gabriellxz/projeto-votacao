import './style.css'
import Navbar from "../../componentsSVG/navbar-icon/navbar-icon";
import NotificationIcon from "../../componentsSVG/notification-icon/notification-icon";
import logoElecao from '../../assets/img/eleicoes-logo.png'
// import iconPerfil from '../../assets/img/icon-perfil.svg'
import { useContext, useState } from 'react';
import { Context } from '../../context/authContext';
import { Link, Outlet } from 'react-router-dom';
import { IconUser } from '@tabler/icons-react';
import Grid from '../../components/grid';

export default function Dashboard() {

    const [open, setOpen] = useState(false)

    // function handleOpenNavbar() {
    //     setOpen(!setOpen)
    // }

    const { autenticado, logout } = useContext(Context)
    console.log("Usuário logado: " + autenticado)

    return (
        <>
            <header className='header-dashboard'>
                <div className="container-navbar-icon">
                    <Navbar openNavbar={() => setOpen(!open)} />
                    <img src={logoElecao} alt="" />
                </div>
                <div className="container-btn-logout">
                    <NotificationIcon />
                    <Link to={"/"} onClick={logout} className='btn-dashboard'>
                        Sair
                    </Link>
                </div>
            </header>
            <main className='main-dashboard'>
                <Grid open={open}/> 
                <section className='section-dashboard'>
                    <Outlet/>
                </section>
            </main>
        </>
    )
}