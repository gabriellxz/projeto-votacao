import './style.css'
import * as serviceCandidato from '../../../../../services/candidato-service'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import typeCandidato from '../../../../../models/typeCandidato'
import ModalEditarCandidato from '../../../../../components/Modal-editar-candidato/modal-editar-candidato'
import { IconX } from '@tabler/icons-react'
import LoadingIcon from '../../../../../components/loading-icon/loading-icon'

export default function EditarCandidato() {

    const params = useParams()
    const [candidato, setCandidato] = useState<typeCandidato>()
    const [loading, setLoading] = useState({
        type: "",
        loading: false,
        mensagem: ""
    })

    useEffect(() => {

        setLoading({
            type: "",
            loading: true,
            mensagem: ""
        })

        serviceCandidato.candFindById(Number(params.id_candidato))
            .then((response) => {
                console.log(response.data)
                setCandidato(response.data)

                setLoading({
                    type: "sucess",
                    loading: false,
                    mensagem: ""
                })
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err)

                    setLoading({
                        type: "error",
                        loading: false,
                        mensagem: ""
                    })
                } else {
                    setLoading({
                        type: "error",
                        loading: false,
                        mensagem: "Erro: verifique sua conexão..."
                    })
                }
            })
    }, [])


    return (
        <div className="container-editar-candidato">
            <Link to={"/dashboard/Editar/listaEditarCandidato"} className='btn-back'>
                <IconX />
            </Link>
            <div className="container-loading">
                {loading.loading ? <LoadingIcon /> : ""}
                {loading.type === "error" ? <p>{loading.mensagem}</p> : ""}
            </div>
            {
                candidato &&
                <ModalEditarCandidato candidato={candidato} />
            }
        </div>
    )
}