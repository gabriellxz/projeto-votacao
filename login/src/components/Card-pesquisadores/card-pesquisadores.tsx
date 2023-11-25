import './style.css'
import avatar_icon from '../../assets/img/user_candidato.jpg'
import Pesquisador from '../../models/pesquisador'
import { Link } from 'react-router-dom'

interface PropsPesquisador {
    pesquisador: Pesquisador
}

export default function CardPesquisadores(props: PropsPesquisador) {
    return (
        <>
            <Link to={`/dashboard/Editar/listaPesquisadores/editarPesquisador`} className='link'>
                <div className="container-card-pesquisador" >
                    <div className="container-img-pesquisador">
                        <img src={avatar_icon} alt="foto_pesquisador" />
                        <div className="container-nome-pesquisador">
                            <h1>{props.pesquisador.name}</h1>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}