import { Link, useParams } from 'react-router-dom'
import './style.css'
import typeCandidato from '../../models/typeCandidato'
import { useEffect, useState } from 'react'
import CandidatoDetails from '../../components/Candidato-details/candidato-details'
import * as candidatoService from '../../services/candidato-service'

export default function VotarCandidato() {

    const [candidato, setCandidato] = useState<typeCandidato>()
    const params = useParams()


    useEffect(() => {
        candidatoService.candFindById(Number(params.id_candidato))
            .then((response) => {
                console.log(response.data)
                setCandidato(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="container-votar-candidato">
                <h1>Votar Candidato</h1>
                {
                    candidato &&
                    <CandidatoDetails candidato={candidato} />
                }
                <Link to={"/dashboard/listaCandidato"}>
                    Voltar
                </Link>
            </div>
        </>
    )
}