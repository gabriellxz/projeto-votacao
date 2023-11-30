import './style.css'
import { Link, Outlet } from 'react-router-dom'

export function Editar() {
    return (
        <div className='container-editar'>
            <header className="header-editar">
                <ul>
                    <Link to={"/dashboard/Editar/listaPesquisadores"} className='link-header-editar'>
                        <li>Pesquisador</li>
                    </Link>
                    <Link to={"/dashboard/Editar/listaEditarCandidato"} className='link-header-editar'>
                        <li>Candidato</li>
                    </Link>
                </ul>
            </header>
            <div className='container-list-editar'>
                <Outlet />
            </div>
        </div>
    )
}