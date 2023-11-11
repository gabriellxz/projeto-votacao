import './style.css'
import davi from '../../assets/img/davi.jpeg'

export default function CardCandidato() {
    return (
        <>
            <div className="container-card-candidato">
                <div className="container-img-candidato">
                    <img src={davi} alt="" />
                    <div className="container-nome-candidato">
                        <h1>Davi Benevides</h1>
                    </div>
                </div>
            </div>
        </>
    )
}