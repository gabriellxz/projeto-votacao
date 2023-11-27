import { useContext, useState } from 'react'
import './style.css'
import { Context } from '../../context/authContext'
import Navbar from '../../componentsSVG/navbar-icon/navbar-icon'
import NotificationIcon from '../../componentsSVG/notification-icon/notification-icon'
import { Link, Outlet } from 'react-router-dom'
import logoElecao from '../../assets/img/eleicoes-logo.png'
import { IconEdit, IconUser } from '@tabler/icons-react'

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
                {open &&
                    <aside className='navbar-aside'>
                        <ul>
                            <li>
                                <Link to={"/dashboard/listaCandidato"} className='link'>
                                    <IconUser size={30} />
                                    Votação
                                </Link>
                            </li>
                            <li>
                                <Link to={"/dashboard/cadastrarCandidato"} className='link'>
                                    <span>+</span>
                                    Cadastrar
                                </Link>
                            </li>
                            <li>
                                <Link to={"/dashboard/Editar"} className='link'>
                                    <IconEdit/>
                                    Editar
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