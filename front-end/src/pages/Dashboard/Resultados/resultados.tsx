import './style.css'
import { useEffect, useState } from "react"
import api from '../../../config/apiConfig'
import CardDetailsVotos from '../../../components/Card-details-voto/card-details-voto';

export interface CandidatoVotos {
    Votos: number;
    cidade: string;
    estado: string;
    id_candidato: number;
    name: string;
    partido: string
}

export default function Resultados() {

    const token = localStorage.getItem("tokenUser")
    const [votosTotal, setVotosTotal] = useState<number>(0)
    const [candidatoVoto, setCandidatoVoto] = useState<CandidatoVotos[]>([])

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    async function getVotos() {
        await api.get<CandidatoVotos[]>("/Resultado", { headers })
            .then((response) => {
                console.log(response.data)
                const candidatoVotos = response.data
                setCandidatoVoto(response.data)
                const totalVotos = candidatoVotos.reduce((acc, candidato) => acc + candidato.Votos, 0)
                setVotosTotal(totalVotos)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getVotos()
    }, [])

    return (
        <div className="container-resultados">
            <div className="container-title-list">
                <h1>Resultado de votos</h1>
                <div className="container-total-votos">
                    <p>Total de votos: {votosTotal}</p>
                </div>
            </div>
            <div className="container-list-cand-votos">
                {
                    candidatoVoto.map((cand: CandidatoVotos) => (
                        <CardDetailsVotos candidatoVoto={cand} key={cand.id_candidato} porcentagem={((cand.Votos / votosTotal) * 100).toFixed(2)}/>
                    ))
                }
            </div>
        </div>
    )
}