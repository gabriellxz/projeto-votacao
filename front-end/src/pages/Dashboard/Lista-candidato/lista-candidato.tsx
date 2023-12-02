import './style.css'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"
import { Outlet } from 'react-router-dom'
import LoadingIcon from '../../../components/loading-icon/loading-icon'
import { useEffect, useState } from 'react'
import api from '../../../config/apiConfig'
import slugify from 'react-slugify'

export default function ListaCandidatoAdm() {

    // const { loading, /*candidato*/ filtrarCandidato } = useGetCandidato()

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    const [filtrarCandidato, setFiltrarCandidato] = useState<typeCandidato[]>([])
    const [loading, setLoading] = useState({
        type: "",
        loading: false,
        mensagem: ""
    })
    const [cidade, setCidade] = useState<string | null>("")
    const [estado, setEstado] = useState<string | null>("")


    const token = localStorage.getItem("tokenUser")
    const roleUser = localStorage.getItem("roleUser")


    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }


    useEffect(() => {
        async function getCandidatos() {

            setLoading({
                type: "",
                loading: true,
                mensagem: ""
            })

            const cidadeUser = localStorage.getItem("cidadeUser")
            const estadoUser = localStorage.getItem("estadoUser")
            setCidade(cidadeUser)
            setEstado(estadoUser)

            await api.get("/Candidatos", { headers })
                .then((response) => {

                    setLoading({
                        type: "",
                        loading: false,
                        mensagem: ""
                    })

                    console.log(response.data)

                    setCandidato(response.data)

                    const listaDeCandidatos = response.data
                    console.log(cidadeUser)
                    console.log(estadoUser)

                    const filtrarCandidatos = listaDeCandidatos.filter((cand: typeCandidato) => {
                        return slugify(cand.cidade) == slugify(cidadeUser) && slugify(cand.estado) == slugify(cand.estado)
                    })

                    setFiltrarCandidato(filtrarCandidatos)
                    console.log(filtrarCandidatos)
                })
                .catch((err) => {
                    console.log(err)

                    if (err.response) {
                        setLoading({
                            type: "error",
                            loading: false,
                            mensagem: "Erro na solicitações de candidatos..."
                        })
                    } else {
                        setLoading({
                            type: "errpr",
                            loading: false,
                            mensagem: "Erro tente mais tarde"
                        })
                    }
                })
        }


        getCandidatos()
    }, [])

    // useEffect(() => {
    //     getCandidatos
    // }, [])

    return (
        <div className='container-list'>
            <div className="container-title-list">
                <h1>Confirme seu voto</h1>
                {roleUser == "1" ? <p>pesquisador cadastrado em: {cidade}, {estado}</p> : ""}
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
                            {loading.type == "error" ? <p className='msg-error'>{loading.mensagem}</p> : ""}
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