import './style.css'
import { useEffect, useState } from "react"
import api from '../../../config/apiConfig'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { IconSearch } from '@tabler/icons-react'
import LoadingIcon from '../../../components/loading-icon/loading-icon'

export default function ListaCandidato() {

    const token = localStorage.getItem("tokenUser")

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    const [valueCep, setValueCep] = useState({
        cep: "",
    })
    // const [localidade, setLocalidade] = useState("")
    // const [uf, setUf] = useState("")
    const [filtrarCandidatos, setFiltrarCandidatos] = useState<typeCandidato[]>([])
    const [loading, setLoading] = useState({
        loading: false
    })

    function handleValueCep(e: any) {
        setValueCep({ ...valueCep, [e.target.name]: e.target.value })
    }

    async function filterCandidatos() {

        setLoading({
            loading: true
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
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
                setFiltrarCandidatos([])
                setLoading({
                    loading: false
                })
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

    return (
        <div className='container-list'>
            <div className="container-input-search">
                <div className='container-search'>
                    <input type="text" placeholder='CEP' name='cep' onChange={handleValueCep} className='input-search' />
                    <IconSearch onClick={filterCandidatos} size={30} className='btn-search' />
                </div>
            </div>
            <div className='container-list-candidatos'>
                {
                    loading.loading ? <LoadingIcon/> 
                    :
                    filtrarCandidatos.map((item: typeCandidato) => (
                        <CardCandidato candidato={item} key={item.id_candidato} />
                    ))
                }
                <Outlet />
            </div>
        </div>
    )
}