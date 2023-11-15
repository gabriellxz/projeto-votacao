import './style.css'
import { useEffect, useState } from "react"
import api from '../../../config/apiConfig'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"

export default function ListaCandidato() {

    const token = localStorage.getItem("tokenUser")
    const [candidato, setCandidato] = useState<typeCandidato[]>([])


    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        async function getCandidatos() {
            await api.get("/Candidatos", { headers })
                .then((response) => {
                    console.log(response)
                    setCandidato(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getCandidatos()
    }, [])

    return (
        <>
            <div className='container-list-candidatos'>
                {
                    candidato.map((item: typeCandidato) => (
                        <CardCandidato candidato={item} key={item.id_candidato} />
                    ))
                }
            </div>
        </>
    )
}