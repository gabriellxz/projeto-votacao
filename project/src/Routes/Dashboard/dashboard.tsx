import './style.css'
import Navbar from "../../componentsSVG/navbar-icon/navbar-icon";
import NotificationIcon from "../../componentsSVG/notification-icon/notification-icon";
import logoElecao from '../../assets/img/eleicoes-logo.png'
// import iconPerfil from '../../assets/img/icon-perfil.svg'
import { useContext, useEffect } from 'react';
import { Context, ContextType } from '../../context/authContext';
import { Link } from 'react-router-dom';
import api from '../../config/apiConfig'

export default function Dashboard() {

    const { autenticado, logout } = useContext(Context)
    console.log("Usuário logado: " + autenticado)
    const token = localStorage.getItem("tokenUser")




    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        async function getCandidatos() {
            await api.get("/Candidatos", { headers })
                .then((response) => {
                    if (autenticado === true) {
                        console.log(response)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getCandidatos()
    }, [])

    return (
        <>
            <header className='header-dashboard'>
                <div className="container-navbar-icon">
                    <Navbar />
                    <img src={logoElecao} alt="" />
                </div>
                <div className="container-btn-logout">
                    <NotificationIcon />
                    <Link to={"/"} onClick={logout} className='btn-dashboard'>
                        Sair
                    </Link>
                </div>
            </header>
            <main>
                <section>
                    <div>

                    </div>
                </section>
            </main>
        </>
    )
}