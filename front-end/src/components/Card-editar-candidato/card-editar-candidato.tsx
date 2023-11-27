import { Link } from 'react-router-dom'
import avatar_icon from '../../assets/img/user_candidato.jpg'
import typeCandidato from '../../models/typeCandidato'

interface PropsCandidato {
    candidato: typeCandidato
}

export default function CardEditarCandidato(props: PropsCandidato) {
    return (
        <>
            <Link to={`/dashboard/Editar/listaEditarCandidato/editarCandidato/${props.candidato.id_candidato}`}>
                <div className="container-card-candidato" >
                    <div className="container-img-candidato">
                        <img src={avatar_icon} alt="foto_candidato" />
                        <div className="container-nome-candidato">
                            <h1>{props.candidato.name}</h1>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}