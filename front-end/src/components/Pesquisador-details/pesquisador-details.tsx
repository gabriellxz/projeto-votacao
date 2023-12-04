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
        name: props.pesquisador.name,
        email: props.pesquisador.email,
        senha: "",
        cpf: props.pesquisador.cpf,
        cidade: props.pesquisador.cidade,
        estado: props.pesquisador.estado
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
                editPes.cpf !== null &&
                editPes.cidade !== null &&
                editPes.estado !== null
            ) {
                const response = await api.put(`/Pesquisador/${Number(params.id_Pesquisador)}`, editPes, { headers })

                console.log(response.data)
                setLoading({
                    type: "sucess",
                    mensagem: "",
                    loading: false
                })

                setTimeout(() => {
                    navigate("/dashboard/Editar/listaPesquisadores")
                    window.location.reload()
                }, 3000)
                toast.success("Pesquisador editado com sucesso!")
            } else {
                setLoading({
                    type: "error",
                    mensagem: "Preencha os campos corretamente",
                    loading: false
                })
                toast.error("Preencha os campos corretamente")
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
                        <div className="layout-email-mobile">
                            <p>{props.pesquisador.email}</p>
                        </div>
                        <img src={avatar_icon} alt="" />
                        <div className="box-top-infors-pesquisador">
                            <h2>{props.pesquisador.name}</h2>
                            <IconTrash onClick={handleDeletePes} className='btn-trash' />
                        </div>
                    </div>
                    <div className="container-infors">
                        <div className="box-bottom-infors-pesquisador">
                            <div>
                                <p id='partido-title'>Cidade</p>
                                <p>{props.pesquisador.cidade}</p>
                            </div>
                            <div>
                                <p id='partido-title'>Estado</p>
                                <p>{props.pesquisador.estado}</p>
                            </div>
                            <div>
                                <p id='partido-title' className='email'>E-mail</p>
                                <p className='email'>{props.pesquisador.email}</p>
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
                                    <input type="text" name='name' placeholder='Nome do pesquisador' value={editPes.name} onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>E-mail do pesquisador</label>
                                    <input type="email" name='email' placeholder='E-mail do pesquisador' value={editPes.email} onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>Senha do pesquisador</label>
                                    <input type="text" name='senha' placeholder='Confirme ou altere a senha' onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar">
                                <div className="single-editar">
                                    <label>CPF do pesquisador</label>
                                    <input type="text" name='cpf' placeholder='CPF do pesquisador' value={editPes.cpf} onChange={handleInputValue} />
                                </div>
                            </div>
                            <div className="box-single-editar cidadeEstado">
                                <div className="single-editar-cidade">
                                    <label>Cidade do pesquisador</label>
                                    <input type="text" name='cidade' placeholder='Cidade do pesquisador' value={editPes.cidade} onChange={handleInputValue} id='cidadePes'/>
                                </div>
                                <div className="single-editar-estado">
                                    <label>Estado do pesquisador</label>
                                    <input type="text" name='estado' placeholder='Estado do pesquisador' value={editPes.estado} onChange={handleInputValue} id='estadoPes'/>
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