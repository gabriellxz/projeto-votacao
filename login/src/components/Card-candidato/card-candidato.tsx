import './style.css'
import { Link } from "react-router-dom";
import typeCandidato from "../../models/typeCandidato";

interface Candidato {
    candidato: typeCandidato
}

export default function CardCandidato(props:Candidato) {
    return (
        <Link to={`/dashboard/listaCandidato/votarCandidato/${props.candidato.id_candidato}`}>
            <div className="container-card-candidato" >
                <div className="container-img-candidato">
                    <img src="" alt="foto_candidato" />
                    <div className="container-nome-candidato">
                        <h1>{props.candidato.name}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}