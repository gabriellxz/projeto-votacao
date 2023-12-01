import { useContext, useState } from 'react'
import './style.css'
import { Context } from '../../context/authContext'
import Navbar from '../../componentsSVG/navbar-icon/navbar-icon'
import NotificationIcon from '../../componentsSVG/notification-icon/notification-icon'
import { Link, Outlet } from 'react-router-dom'
import logoElecao from '../../assets/img/eleicoes-logo.png'
import { IconArticle, IconEdit, IconLogout, IconUser } from '@tabler/icons-react'

export default function Dashboard() {

    const [open, setOpen] = useState(false)

    // function handleOpenNavbar() {
    //     setOpen(!setOpen)
    // }

    const { autenticado, logout } = useContext(Context)
    console.log("Usuário logado: " + autenticado)
    const roleUser = localStorage.getItem("roleUser")

    return (
        <>
            <header className='header-dashboard'>
                <div className="container-navbar-icon">
                    <Navbar openNavbar={() => setOpen(!open)} />
                    <img src={logoElecao} alt="" />
                </div>
                <div className="container-btn-logout">
                    <NotificationIcon />
                </div>
            </header>
            <main className='main-dashboard'>
                {open &&
                    <aside className='navbar-aside'>
                        <ul>
                            <li>
                                <Link to={"/dashboard/listaCandidato"} className='link' onClick={() => setOpen(!open)}>
                                    <IconUser size={30} />
                                    Votação
                                </Link>
                            </li>
                            <li className={roleUser === "1" ? "display-none" : ""}>
                                <Link to={"/dashboard/cadastroDashboard"} className='link' onClick={() => setOpen(!open)}>
                                    <span>+</span>
                                    Cadastrar
                                </Link>
                            </li>
                            <li className={roleUser === "1" ? "display-none" : ""}>
                                <Link to={"/dashboard/resultados"} className='link' onClick={() => setOpen(!open)}>
                                    <IconArticle/>
                                    Resultados
                                </Link>
                            </li>
                            <li className={roleUser === "1" ? "display-none" : ""} onClick={() => setOpen(!open)}>
                                <Link to={"/dashboard/Editar"} className='link'>
                                    <IconEdit />
                                    Editar
                                </Link>
                            </li>
                            <li>
                                <Link to={"/"} onClick={logout} className='link'>
                                    <IconLogout/>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </aside>
                }
                <section className='section-dashboard'>
                    <Outlet />
                </section>
            </main>
        </>
    )
}