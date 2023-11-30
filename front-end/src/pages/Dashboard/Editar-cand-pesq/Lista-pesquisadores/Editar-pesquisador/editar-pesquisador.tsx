import './style.css'
import * as pesquisadorService from '../../../../../services/pesquisador-service'
import { Link, useParams } from 'react-router-dom'
import Pesquisador from '../../../../../models/pesquisador'
import { useState, useEffect } from 'react'
import PesquisadorDetails from '../../../../../components/Pesquisador-details/pesquisador-details'
import { IconX } from '@tabler/icons-react'
import LoadingIcon from '../../../../../components/loading-icon/loading-icon'

export default function EditarPesquisador() {

    const params = useParams()
    const [pesquisador, setPesquisador] = useState<Pesquisador>()
    const [loading, setLoading] = useState({
        loading: false
    })

    useEffect(() => {

        setLoading({
            loading: true
        })

        pesquisadorService.pesFindById(Number(params.id_Pesquisador))
            .then((response) => {
                console.log(response.data)
                setPesquisador(response.data)
                setLoading({
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
                setLoading({
                    loading: false
                })
            })
    }, [])

    return (
        <div className='container-edit-pesquisador'>
            <div className="btn-back">
                <Link to={"/dashboard/Editar/listaPesquisadores"}>
                    <IconX />
                </Link>
            </div>
            <div className="container-loading">
                {loading.loading ? <LoadingIcon/> : ""}
            </div>
            {pesquisador &&
                <PesquisadorDetails pesquisador={pesquisador} />
            }
        </div>
    )
}