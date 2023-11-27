import './style.css'
import avatar_icon from '../../assets/img/user_candidato.jpg'
import logoEleicoes from '../../assets/img/eleicoes-logo.png'
import typeCandidato from '../../models/typeCandidato'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import api from '../../config/apiConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingIcon from '../loading-icon/loading-icon'
import { IconTrash } from '@tabler/icons-react'

interface PropsCandidato {
    candidato: typeCandidato
}

export default function ModalEditarCandidato(props: PropsCandidato) {

    const params = useParams()
    const navigate = useNavigate()
    const [valueInput, setValueInput] = useState({
        name: "",
        apelido: "",
        cidade: "",
        estado: "",
        Partido: "",
    })
    const [imagem, setImagem] = useState<File | null>(null)
    const [loading, setLoading] = useState({
        type: "",
        mensagem: "",
        loading: false
    })
    const [candidato, setCandidato] = useState<typeCandidato[]>([])

    function handleImagem(e: any) {
        if (e.target.files && e.target.files.length > 0) {
            setImagem(e.target.files[0])
        }
    }

    function handleInputValue(e: any) {
        setValueInput({ ...valueInput, [e.target.name]: e.target.value })
    }

    async function handlePutCand(e: any) {
        e.preventDefault()

        setLoading({
            type: "",
            mensagem: "",
            loading: true
        })

        const formData = new FormData();
        formData.append("name", valueInput.name)
        formData.append("apelido", valueInput.apelido)
        formData.append("Partido", valueInput.Partido)
        formData.append("cidade", valueInput.cidade)
        formData.append("estado", valueInput.estado)
        if (imagem) {
            formData.append("images", imagem)
        }

        const headers = {
            "Content-Type": "application/json"
        }


        try {
            if (
                valueInput.name !== null &&
                valueInput.apelido !== null &&
                valueInput.cidade !== null &&
                valueInput.estado !== null &&
                valueInput.apelido !== null
            ) {
                const response = await api.put(`/Candidatos/${Number(params.id_candidato)}`, formData, { headers })

                console.log(response.data)
                setLoading({
                    type: "sucess",
                    mensagem: "",
                    loading: false
                })

                setTimeout(() => {
                    navigate("/dashboard/Editar/listaEditarCandidato")
                    window.location.reload()
                }, 3000)
                toast.success("Candidato editado com sucesso!")
            } else {
                setLoading({
                    type: "error",
                    mensagem: "Preencha os campos corretamente!",
                    loading: false
                })
            }
        } catch (err) {
            console.log(err)
            setLoading({
                type: "error",
                mensagem: "Erro: tente mais tarde...",
                loading: false
            })
        }
    }

    async function handleDeleteCand() {

        setLoading({
            type: "sucess",
            loading: true,
            mensagem: ""
        })


        await api.delete(`/Candidatos/${Number(params.id_candidato)}`)
        .then((response) => {
            setLoading({
                type: "sucess",
                loading: false,
                mensagem: ""
            })

            console.log(response.data)
            setCandidato(candidato.filter((cand:typeCandidato) => cand.id_candidato !== Number(params.id_candidato)))
            setTimeout(() => {
                navigate("/dashboard/Editar/listaEditarCandidato")
                window.location.reload()
            }, 3000)
            toast.success("Candidato deletado com sucesso!")
        })
        .catch((err) => {
            console.log(err)
            toast.error("Erro ao deletar candidato!")
        })
    }

    return (
        <div className='container-modal-editar-candidato'>
            <div className="container-dados-candidato-editar">
                <div className="container-img-candidato-votar">
                    <img src={avatar_icon} alt="" />
                    <div className="box-top-infors">
                        <p>Candidato a prefeito de {props.candidato.cidade} - {props.candidato.estado}</p>
                        <h2>
                            {props.candidato.name} 
                            <IconTrash onClick={handleDeleteCand}/>
                        </h2>
                    </div>
                </div>
                <div className="container-infors">
                    <div className="box-bottom-infors-editar-cand">
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
            <form>
                <div className="box-form-candidato">
                    <h1>
                        Edite o candidato
                    </h1>
                    <div className="msg">
                        {loading.type === "error" ? <label className='msg-error'>{loading.mensagem}</label> : ""}
                    </div>
                    <div className="box-input-candidato">
                        <div className="single-input-candidato">
                            <label>Nome</label>
                            <input type="text" name="name" className="input-sucess" placeholder="Nome" onChange={handleInputValue} />
                        </div>
                        <div className="single-input-candidato">
                            <label>Apelido</label>
                            <input type="text" name="apelido" className='input-sucess' placeholder="Apelido" onChange={handleInputValue} />
                        </div>
                    </div>
                    <div className="box-input-candidato">
                        <div className="single-input-candidato">
                            <label>Partido</label>
                            <input type="text" name="Partido" className='input-sucess' placeholder="Partido" onChange={handleInputValue} />
                        </div>
                    </div>
                    {/* <div className="box-input-candidato">
                        <div className="single-input-candidato">
                            <input required id='input-cep' type="text" name="cep" className="input-sucess" placeholder="CEP" onChange={handleInputValue}/>
                        </div>
                        <div className="single-input-candidato">
                            <input type='button' value={"Buscar CEP"} id='button-cep' onChange={handleInputValue}/>
                        </div>
                    </div> */}
                    <div className="box-input-candidato">
                        <div className="single-input-candidato">
                            <label>Cidade</label>
                            <input type="text" name="cidade" className="input-sucess" placeholder="Cidade" onChange={handleInputValue} />
                        </div>
                        <div className="single-input-candidato">
                            <label>Estado</label>
                            <input type="text" name="estado" className="input-sucess" placeholder="Estado" onChange={handleInputValue} />
                        </div>
                    </div>
                    <div className="box-input-candidato">
                        <input type="file" id='uploadBtn' onChange={handleImagem} />
                        <label htmlFor='uploadBtn' >
                            importar imagem
                        </label>
                    </div>
                    <div className="box-candidato-btn-editar">
                        <img src={logoEleicoes} />
                        <button onClick={handlePutCand}>
                            {loading.loading ? <LoadingIcon/> : "Editar"}
                            {/* Editar */}
                        </button>
                    </div>
                </div>

                <ToastContainer />
            </form>
        </div>
    )
}