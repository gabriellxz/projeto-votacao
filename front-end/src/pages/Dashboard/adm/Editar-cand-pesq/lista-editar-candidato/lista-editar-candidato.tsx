import './style.css'
import CardEditarCandidato from "../../../../components/Card-editar-candidato/card-editar-candidato"
import useGetCandidato from "../../../../hook/useGetCandidato"
import typeCandidato from "../../../../models/typeCandidato"
import { Outlet } from 'react-router-dom'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'

export default function ListaEditarCandidato() {

    const { candidato, loading } = useGetCandidato()

    return (
        <div className="container-lista-editar-candidato">
            {/* <h1>Lista editar candidato</h1> */}
            {loading.loading ? <LoadingIcon /> : ""}
            <div className="lista-editar-candidato">
                {
                    candidato.map((cand: typeCandidato) => (
                        <CardEditarCandidato candidato={cand} key={cand.id_candidato} />
                    ))
                }
                <Outlet />
            </div>
        </div>
    )
}