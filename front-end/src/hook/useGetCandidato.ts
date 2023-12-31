import api from '../config/apiConfig'
import { useEffect, useState } from 'react'
import typeCandidato from '../models/typeCandidato'

export default function useGetCandidato() {

    const token = localStorage.getItem("tokenUser")
    // const cidadeUser = localStorage.getItem("cidadeUser")
    // const estadoUser = localStorage.getItem("estadoUser")

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    // const [filtrarCandidato, setFiltrarCandidato] = useState<typeCandidato[]>([])
    const [loading, setLoading] = useState({
        type: "",
        loading: false,
        mensagem: ""
    })

    // function filterCandidatos() {
    //     const filtraCandidatos = candidato.filter(
    //         (cand:typeCandidato) => cand.cidade === cidadeUser && cand.estado === estadoUser
    //     )

    //     setFiltrarCandidato(filtraCandidatos)
    // }

    // useEffect(() => {
    //     filterCandidatos()
    // }, [])

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    async function getCandidatos() {

        setLoading({
            type: "",
            loading: true,
            mensagem: ""
        })

        await api.get("/Candidatos", { headers })
            .then((response) => {

                setLoading({
                    type: "sucess",
                    loading: false,
                    mensagem: "sucess"
                })

                console.log(response)
                setCandidato(response.data)
            })
            .catch((err) => {
                console.log(err)

                setLoading({
                    type: "error",
                    loading: false,
                    mensagem: ""
                })
            })
    }

    useEffect(() => {
        getCandidatos()
    }, [])

    return {
        loading,
        getCandidatos,
        candidato,
    }
}