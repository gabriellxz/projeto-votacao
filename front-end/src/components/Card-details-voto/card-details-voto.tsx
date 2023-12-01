import './style.css'
import avatar_icon from '../../assets/img/user_candidato.jpg'
import { CandidatoVotos } from '../../pages/Dashboard/Resultados/resultados'

interface CandidatoVotosProps  {
    candidatoVoto: CandidatoVotos;
    porcentagem: any;
}

export default function CardDetailsVotos(props:CandidatoVotosProps) {
    return (
        <>
            <div className="card-details-voto">
                <div className="box-img-candidato">
                    <img src={avatar_icon} alt="foto candidato" />
                </div>
                <div className='box-informações-candidato'>
                    <div className='box-infor'>
                        <span>Nome: {props.candidatoVoto.name}</span>
                        <span>Apelido: </span>
                    </div>
                    <div className='box-infor'>
                        <span>Cidade: {props.candidatoVoto.cidade}</span>
                        <span>Estado: {props.candidatoVoto.estado}</span>
                    </div>
                    <div className='box-infor'>
                        <span>Votos: {props.candidatoVoto.Votos}</span>
                        <span>Porcentagem: {props.porcentagem}%</span>
                    </div>
                </div>
            </div>
        </>
    )
}