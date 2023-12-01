import './style.css'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"
import { Outlet } from 'react-router-dom'
import LoadingIcon from '../../../components/loading-icon/loading-icon'
import { useEffect, useState } from 'react'
import api from '../../../config/apiConfig'
// import { useEffect } from 'react'

export default function ListaCandidatoAdm() {

    // const { loading, /*candidato*/ filtrarCandidato } = useGetCandidato()

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    const [filtrarCandidato, setFiltrarCandidato] = useState<typeCandidato[]>([])
    const [loading, setLoading] = useState({
        type: "",
        loading: false,
        mensagem: ""
    })


    const token = localStorage.getItem("tokenUser")
    const roleUser = localStorage.getItem("roleUser")


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

        await api.get<typeCandidato[]>("/Candidatos", { headers })
            .then((response) => {

                setLoading({
                    type: "",
                    loading: false,
                    mensagem: ""
                })

                console.log(response.data)

                setCandidato(response.data)

                const candidates = response.data

                const cidadeUser = localStorage.getItem("cidadeUser")
                const estadoUser = localStorage.getItem("estadoUser")

                const candidatosObtidos = candidates.filter(cand => {
                    return(
                        cand.cidade === cidadeUser &&
                        cand.estado  === estadoUser
                    )
                })

                setFiltrarCandidato(candidatosObtidos)
                console.log(candidatosObtidos)
            })
            .catch((err) => {
                console.log(err)

                setLoading({
                    type: "",
                    loading: false,
                    mensagem: ""
                })
            })

    }

    useEffect(() => {
        getCandidatos()
    }, [])

    // useEffect(() => {
    //     getCandidatos
    // }, [])

    return (
        <div className='container-list'>
            <div className="container-title-list">
                <h1>Confirme seu voto</h1>
            </div>
            {
                roleUser === "1" ?
                    (
                        <div className='container-list-candidatos'>

                            {
                                loading.loading ? <LoadingIcon />
                                    :
                                    filtrarCandidato.map((item: typeCandidato) => (
                                        <CardCandidato candidato={item} key={item.id_candidato} />
                                    ))
                            }
                            <Outlet />
                        </div>
                    )
                    :
                    (
                        <div className='container-list-candidatos'>

                            {
                                loading.loading ? <LoadingIcon />
                                    :
                                    candidato.map((item: typeCandidato) => (
                                        <CardCandidato candidato={item} key={item.id_candidato} />
                                    ))
                            }
                            <Outlet />
                        </div>
                    )
            }
        </div>
    )
}