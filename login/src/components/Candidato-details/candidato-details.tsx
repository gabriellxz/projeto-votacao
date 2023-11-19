import typeCandidato from "../../models/typeCandidato"

interface Candidato {
    candidato: typeCandidato;
}

export default function CandidatoDetails(props:Candidato) {
    return(
        <>
            <div className="container-details">
                <h1>{props.candidato.name}</h1>
            </div>
        </>
    )
}