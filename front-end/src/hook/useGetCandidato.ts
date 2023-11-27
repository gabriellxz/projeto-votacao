import api from '../config/apiConfig'
import { useEffect, useState } from 'react'
import typeCandidato from '../models/typeCandidato'
import axios from 'axios'

export default function useGetCandidato() {

    const token = localStorage.getItem("tokenUser")

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    const [valueCep, setValueCep] = useState({
        cep: "",
    })
    // const [localidade, setLocalidade] = useState("")
    // const [uf, setUf] = useState("")
    const [filtrarCandidatos, setFiltrarCandidatos] = useState<typeCandidato[]>([])
    const [loading, setLoading] = useState({
        type: "",
        loading: false,
        mensagem: ""
    })

    function handleValueCep(e: any) {
        setValueCep({ ...valueCep, [e.target.name]: e.target.value })
    }

    async function filterCandidatos() {

        setLoading({
            type: "",
            loading: true,
            mensagem: ""
        })

        await axios.get(`https://viacep.com.br/ws/${valueCep.cep}/json/`)
            .then((response) => {
                // setLocalidade(response.data.localidade)
                // setUf(response.data.uf)

                const localidade = response.data.localidade
                const uf = response.data.uf

                console.log(localidade)
                console.log(uf)

                const filtrarCandidatos = candidato.filter(
                    (cand: typeCandidato) => cand.cidade === localidade && cand.estado === uf
                )

                setFiltrarCandidatos(filtrarCandidatos)
                console.log(filtrarCandidatos)
                setLoading({
                    type: "sucess",
                    loading: false,
                    mensagem: ""
                })
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err)
                    setFiltrarCandidatos([])
                    setLoading({
                        type: "error",
                        loading: false,
                        mensagem: "Erro ao buscar candidatos..."
                    })
                } else {
                    setLoading({
                        type: "error",
                        loading: false,
                        mensagem: "Erro ao buscar candidatos..."
                    })
                }
            })
    }

    useEffect(() => {
        filterCandidatos()
    }, [])

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    async function getCandidatos() {
        await api.get("/Candidatos", { headers })
            .then((response) => {
                console.log(response)
                setFiltrarCandidatos(response.data)
                setCandidato(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCandidatos()
    }, [])

    return {
        filtrarCandidatos,
        loading,
        handleValueCep,
        filterCandidatos,
        getCandidatos,
        candidato
    }
}