import './style.css'
// import davi from '../../assets/img/davi.jpeg'
import typeCandidato from '../../models/typeCandidato'
// import { useState } from 'react'
// import typeCandidato from '../../models/typeCandidato'
// import api from '../../config/apiConfig'

interface PropsCandidato {
    candidato: typeCandidato
}

export default function CardCandidato(props: PropsCandidato) {

    return (
        <>
            <div className="container-card-candidato">
                <div className="container-img-candidato">
                    <img src="" alt="foto_candidato" />
                    <div className="container-nome-candidato">
                        <h1>{props.candidato.name}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}