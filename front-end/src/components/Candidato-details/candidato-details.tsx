import './style.css'
import typeCandidato from "../../models/typeCandidato"
import avatar_icon from '../../assets/img/user_candidato.jpg'
import { useState } from 'react'
import api from '../../config/apiConfig'
import slug from 'react-slugify'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../loading-icon/loading-icon'
// import * as yup from 'yup'
// import LoadingIcon from '../loading-icon/loading-icon'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Candidato {
    candidato: typeCandidato;
}

interface votacao {
    nome: string;
    Idade: number;
    Localidade: string;
}

interface typeStatus {
    type: string;
    mensagem: string;
    loading: boolean;
}

// const validationSchema = yup.object({
//     nome: yup.string().required("Preencha o nome.").min(3, "Nome deve conter no mínimo 3 caracteres."),
//     Idade: yup.number().required("Preencha a idade.").max(2, "Senha deve conter no mínimo 2 caracteres."),
//     Localidade: yup.string().required("Preencha o email.").min(3, "Email deve conter no mínimo 3 caracteres."),
// })

export default function CandidatoDetails(props: Candidato) {
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState<votacao>({
        nome: "",
        Idade: 0,
        Localidade: ""
    })
    const [status, setStatus] = useState<typeStatus>({
        type: "",
        mensagem: "",
        loading: false
    })

    function handleVotacaoValue(e: any) {
        setInputValue({ ...inputValue, [e.target.name]: [e.target.value] })
    }

    const headers = {
        "Content-Type": "application/json"
    }

    async function handleVotacaoPost(e: any) {
        e.preventDefault()

        const dados = {
            nome: inputValue.nome,
            Idade: Number(inputValue.Idade),
            Localidade: slug(inputValue.Localidade),
            candidatoId: props.candidato.id_candidato,
            Votar: true
        }

        setStatus({
            type: "",
            mensagem: "",
            loading: true
        })

        try {
            if (inputValue.nome != null && inputValue.Localidade != null && inputValue.Idade) {
                const response = await api.post("/votar", dados, { headers })

                setTimeout(() => {
                    setStatus({
                        type: "success",
                        mensagem: "Voto registrado com sucesso!",
                        loading: false
                    })
                    navigate("/dashboard/listaCandidato")
                }, 3000)
                console.log(response.data)
                toast.success("Voto registrado com sucesso!")
            } else {
                setStatus({
                    type: "error",
                    mensagem: "Preencha os campos corretamente",
                    loading: false
                })
            }
        } catch (err) {
            if (err) {
                setStatus({
                    type: "error",
                    mensagem: "Erro ao registrar o voto!",
                    loading: false
                })
            } else {
                setStatus({
                    type: "error",
                    mensagem: "Erro: tente mais tarde...",
                    loading: false
                })
            }
        }


    }

    // function formEleitor(e: any) {
    //     e.preventDefault()

    //     setStatus({
    //         type: "error",
    //         mensagem: "",
    //         loading: true
    //     })

    //     if (inputValue.nome != null && inputValue.Idade != null && inputValue.Localidade) {
    //         handleVotacaoPost

    //         setStatus({
    //             type: "sucess",
    //             mensagem: "",
    //             loading: false
    //         })

    //     } else {
    //         setStatus({
    //             type: "error",
    //             mensagem: "Preencha os campos corretamente",
    //             loading: false
    //         })
    //         // console.log("erro")
    //     }
    // }

    return (
        <>
            <div className="container-details">
                <div className="container-dados-candidato">
                    <div className="container-img-candidato-votar">
                        <img src={avatar_icon} alt="" />
                        <div className="box-top-infors">
                            <p>Candidato a prefeito de {props.candidato.cidade} - {props.candidato.estado}</p>
                            <h2>{props.candidato.name}</h2>
                        </div>
                    </div>
                    <div className="container-infors">
                        <div className="box-bottom-infors">
                            <div>
                                <p id='partido-title'>Partido</p>
                                <p>{props.candidato.Partido}</p>
                            </div>

                            <div>
                                <p id='partido-title'>Cidade</p>
                                <p>{props.candidato.cidade}</p>
                            </div>

                            <div>
                                <p id='partido-title'>Estado</p>
                                <p>{props.candidato.estado}</p>
                            </div>

                            <div>
                                <p id='partido-title'>Apelido</p>
                                <p>{props.candidato.apelido}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-form-votar">
                    <form>
                        <div className="title-form-votar">
                            <h1>confirme seu voto</h1>
                        </div>
                        <div className="form-votar">
                            <div className="msg">
                                {status.type === "error" ? <p className='msg-error'>{status.mensagem}</p> : ""}
                            </div>
                            <div className="box-single-votar">
                                <div className="single-votar">
                                    <label>Nome do eleitor</label>
                                    <input type="text" name='nome' placeholder='Nome de eleitor' onChange={handleVotacaoValue} />
                                </div>
                            </div>
                            <div className="box-single-votar">
                                <div className="single-votar">
                                    <label>Idade do eleitor</label>
                                    <input type="number" name='Idade' placeholder='Idade de eleitor' onChange={handleVotacaoValue} />
                                </div>
                            </div>
                            <div className="box-single-votar">
                                <div className="single-votar">
                                    <label>Localidade do eleitor</label>
                                    <input type="text" name='Localidade' placeholder='Localidade de eleitor' onChange={handleVotacaoValue} />
                                </div>
                            </div>
                            <div className="btn-votar box-single-votar">
                                <button onClick={handleVotacaoPost}>
                                    {status.loading ? <LoadingIcon /> : "Votar"}
                                    {/* Votar */}
                                </button>
                            </div>
                        </div>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </>
    )
}