import './style.css'
import { useState, useEffect } from 'react'
import api from '../../../../config/apiConfig'
import Pesquisador from '../../../../models/pesquisador'
import CardPesquisadores from '../../../../components/Card-pesquisadores/card-pesquisadores'
import { Outlet } from 'react-router-dom'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'

export default function ListaPesquisadores() {

    const [pesquisador, setPesquisador] = useState<Pesquisador[]>([])
    const [loading, setLoading] = useState({
        loading: false
    })

    useEffect(() => {

        setLoading({
            loading: true
        })

        async function getPesquisadores() {
            const response = await api.get("/Pesquisadores")
            try {
                console.log(response.data)
                setPesquisador(response.data)

                setLoading({
                    loading: false
                })
            } catch (err) {
                console.log(err)
                setLoading({
                    loading: false
                })
            }
        }

        getPesquisadores()
    }, [])

    return (
        <div className='container-pesquisadores'>
            <div className='container-lista-pesquisador'>
                {
                    loading.loading ?
                        <LoadingIcon />
                        :
                        pesquisador.map((pes: Pesquisador) => (
                            <CardPesquisadores key={pes.id_Pesquisador} pesquisador={pes} />
                        ))
                }
                <Outlet />
            </div>
        </div>
    )
}