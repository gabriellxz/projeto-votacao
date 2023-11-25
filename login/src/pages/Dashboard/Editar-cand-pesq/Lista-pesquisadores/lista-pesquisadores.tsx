import './style.css'
import { useState, useEffect } from 'react'
import api from '../../../../config/apiConfig'
import Pesquisador from '../../../../models/pesquisador'
import CardPesquisadores from '../../../../components/Card-pesquisadores/card-pesquisadores'
import { Outlet } from 'react-router-dom'

export default function ListaPesquisadores() {

    const [pesquisador, setPesquisador] = useState<Pesquisador[]>([])

    useEffect(() => {
        async function getPesquisadores() {
            const response = await api.get("/Pesquisadores")
            try {
                setPesquisador(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        getPesquisadores()
    }, [])

    return (
        <div className='container-pesquisadores'>
            <h1>Lista de pesquisadores</h1>
            <div className='container-lista-pesquisador'>
                {
                    pesquisador.map((pes: Pesquisador) => (
                        <CardPesquisadores key={pes.id_pesquisador} pesquisador={pes} />
                    ))
                }
                <Outlet/>
            </div>
        </div>
    )
}