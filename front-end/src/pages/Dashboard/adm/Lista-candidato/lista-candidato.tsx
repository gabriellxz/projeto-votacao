import './style.css'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"
import { Outlet } from 'react-router-dom'
import { IconSearch } from '@tabler/icons-react'
import LoadingIcon from '../../../components/loading-icon/loading-icon'
import useGetCandidato from '../../../hook/useGetCandidato'
// import { useEffect } from 'react'

export default function ListaCandidato() {

    const { handleValueCep, filterCandidatos, loading, filtrarCandidatos } = useGetCandidato()

    // useEffect(() => {
    //     getCandidatos
    // }, [])

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
                    loading.loading ? <LoadingIcon />
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