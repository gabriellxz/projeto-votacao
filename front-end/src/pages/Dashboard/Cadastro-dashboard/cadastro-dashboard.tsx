import './style.css'
import { useNavigate } from "react-router-dom"

export default function CadastroDashboard() {

    const navigate = useNavigate()

    const navigateCadastroCandidato = () => {
        navigate("/cadastrarCandidato")
    }

    const navigateCadastroPesquisador = () => {
        navigate("/cadastro")
    }

    return (
        <div className='container-cad-dash'>
            <div className="container-cadastro-btn-dashboard">
                <div className="container-btn-dash">
                    <button onClick={navigateCadastroCandidato}>Cadastrar candidato</button>
                </div>
                <div className="container-btn-dash">
                    <button onClick={navigateCadastroPesquisador}>Cadastrar pequisador</button>
                </div>
            </div>
        </div>
    )
}