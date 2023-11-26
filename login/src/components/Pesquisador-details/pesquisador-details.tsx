import './style.css'
import Pesquisador from "../../models/pesquisador"
import avatar_icon from '../../assets/img/user_candidato.jpg'
// import * as pesquisadorService from '../../services/pesquisador-service'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import api from '../../config/apiConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingIcon from '../loading-icon/loading-icon'
import { IconTrash } from '@tabler/icons-react'

interface PropsPesquisador {
    pesquisador: Pesquisador
}

export default function PesquisadorDetails(props: PropsPesquisador) {

    const params = useParams()
    const navigate = useNavigate()
    const [editPes, setEditPes] = useState({
        name: "",
        email: "",
        senha: "",
        cpf: "",
        cidade: "",
        estado: ""
    })
    const [loading, setLoading] = useState({
        type: "",
        mensagem: "",
        loading: false
    })
    const [pesquisador, setPesquisador] = useState<Pesquisador[]>([])

    function handleInputValue(e: any) {
        setEditPes({ ...editPes, [e.target.name]: e.target.value })
    }

    const headers = {
        "Content-Type": "application/json"
    }

    async function handleEdit(e: any) {
        e.preventDefault()

        setLoading({
            type: "",
            mensagem: "",
            loading: true
        })

        try {
            if (
                editPes.name !== null &&
                editPes.cidade !== null &&
                editPes.email !== null &&
                editPes.estado !== null &&
                editPes.senha !== null &&
                editPes.cpf !== null
            ) {
                const response = await api.put(`/Pesquisador/${Number(params.id_Pesquisador)}`, editPes, { headers })

                console.log(response.data)

                setLoading({
                    type: "error",
                    mensagem: "Preencha os campos corretamente",
                    loading: false
                })

                setTimeout(() => {
                    navigate("/dashboard/Editar/listaPesquisadores")
                    window.location.reload()
                }, 3000)
                toast.success("Pesquisador editado com sucesso!")
            } else {

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

    async function handleDeletePes() {

        setLoading({
            type: "",
            mensagem: "",
            loading: true
        })

        await api.delete(`/Pesquisador/${Number(params.id_Pesquisador)}`)
            .then((response) => {

                setLoading({
                    type: "",
                    mensagem: "",
                    loading: false
                })

                console.log(response.data)
                setPesquisador(pesquisador.filter((pes: Pesquisador) => pes.id_Pesquisador !== Number(params.id_Pesquisador)))
                setTimeout(() => {
                    navigate("/dashboard/Editar/listaPesquisadores")
                    window.location.reload()
                }, 3000)
                toast.success("Pesquisador deletado com sucesso!")
            })
            .catch((err) => {
                console.log(err)
                setLoading({
                    type: "error",
                    mensagem: "",
                    loading: false
                })
                toast.error("Erro ao deletar pesquisador...")
            })
    }

    return (
        <>
            <div className="container-details">
                <div className="container-dados-pesquisador">
                    <div className="container-img-pesquisador-editar">
                        <img src={avatar_icon} alt="" />
                        <div className="box-top-infors">
                            <h2>{loading.loading ? <LoadingIcon/> : <h1>{props.pesquisador.name}</h1>}</h2>
                            <IconTrash onClick={handleDeletePes} className='btn-trash'/>
                        </div>
                    </div>
                    <div className="container-infors">
                        <div className="box-bottom-infors">
                            <div>
                                <p id='partido-title'>Cidade</p>
                                <p>{props.pesquisador.cidade}</p>
                            </div>
                            <div>
                                <p id='partido-title'>Estado</p>
                                <p>{props.pesquisador.estado}</p>
                            </div>
                            <div>
                                <p id='partido-title'>E-mail</p>
                                <p>{props.pesquisador.email}</p>
                            </div>
                            <div>
                                <p id='partido-title'>CPF</p>
                                <p>{props.pesquisador.cpf}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-form-editar">
                    <form>
                        <div className="title-form-editar">
                            <h1>editar pesquisador</h1>
                        </div>
                        <div className="form-editar">
                            <div className="msg">
                                {loading.type === "error" ? <label className='msg-error'>{loading.mensagem}</label> : ""}
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>Nome do Pesquisador</label>
                                    <input type="text" name='name' placeholder='Nome do pesquisador' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>E-mail do pesquisador</label>
                                    <input type="email" name='email' placeholder='E-mail do pesquisador' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>Senha do pesquisador</label>
                                    <input type="text" name='senha' placeholder='Senha do pesquisador' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>CPF do pesquisador</label>
                                    <input type="text" name='cpf' placeholder='CPF do pesquisador' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar box-dual">
                                <div className="single-editar">
                                    <label>Cidade do pesquisador</label>
                                    <input type="text" name='cidade' placeholder='Cidade do pesquisador' onChange={handleInputValue} />
                                </div>
                                <div className="single-editar">
                                    <label>Estado do pesquisador</label>
                                    <input type="text" name='estado' placeholder='Estado do pesquisador' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="btn-editar box-single-editar">
                                <button onClick={handleEdit}>
                                    {loading.loading ? <LoadingIcon /> : "Editar"}
                                    {/* Editar */}
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