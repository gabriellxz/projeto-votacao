import { Link, useParams } from 'react-router-dom'
import './style.css'
import typeCandidato from '../../../../models/typeCandidato'
import { useEffect, useState } from 'react'
import CandidatoDetails from '../../../../components/Candidato-details/candidato-details'
import * as candidatoService from '../../../../services/candidato-service'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'
import { IconX } from '@tabler/icons-react'

export default function VotarCandidatoPesquisador() {

    const [candidato, setCandidato] = useState<typeCandidato>()
    const [status, setStatus] = useState({
        loading: false,
    })
    const params = useParams()


    useEffect(() => {
        setStatus({
            loading: true,
        })

        candidatoService.candFindById(Number(params.id_candidato))
            .then((response) => {
                console.log(response.data)
                setCandidato(response.data)
                setStatus({
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
                setStatus({
                    loading: false
                })
            })
    }, [])

    return (
        <>
            <div className="container-votar-candidato">
                <div className="btn-back">
                    <Link to={"/dashboard/listaCandidato"}>
                        <IconX/>
                    </Link>
                </div>
                <div className="container-loading">
                    {status.loading ? <LoadingIcon /> : ""}
                </div>
                {
                    candidato &&
                    <CandidatoDetails candidato={candidato} />
                }
            </div>
        </>
    )
}