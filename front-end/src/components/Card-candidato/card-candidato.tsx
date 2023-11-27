import { Link } from "react-router-dom";
import typeCandidato from "../../models/typeCandidato";
import avatar_icon from '../../assets/img/user_candidato.jpg'

interface Candidato {
    candidato: typeCandidato
}

export default function CardCandidato(props:Candidato) {

    // const foto_candidato = props.candidato.images[0].Url
    

    return (
        <Link to={`/dashboard/listaCandidato/votarCandidato/${props.candidato.id_candidato}`} className='link'>
            <div className="container-card-candidato" >
                <div className="container-img-candidato">
                    <img src={avatar_icon} alt="foto_candidato" />
                    <div className="container-nome-candidato">
                        <h1>{props.candidato.name}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}