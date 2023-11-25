import './style.css'
import ChevronRight from '../../componentsSVG/chevron-right/chevron-right'
import { useState } from 'react'
import typeCadastro from '../../models/typeCadastro'
import api from "../../config/apiConfig"
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../../components/loading-icon/loading-icon'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {

    const navigate = useNavigate()

    const [user, setUser] = useState<typeCadastro>({
        name: "",
        email: "",
        senha: "",
        cpf: ""
    })

    const [mensagem, setMensagem] = useState({
        type: "",
        mensagem: "",
        loading: false
    })

    const [validation, setValidation] = useState({
        type: "",
        cpf: "",
        email: "",
        name: "",
        senha: "",
    })

    function handleInput(e: any) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const headers = {
        "Content-Type": "application/json"
    }

    async function handlePostForm(e: any) {
        e.preventDefault()
        setMensagem({
            type: "",
            mensagem: "",
            loading: true
        })

        await api.post("/cadastro", user, { headers })
            .then((response) => {
                console.log(response.data)
                setMensagem({
                    type: "sucess",
                    mensagem: response.data.msg,
                    loading: false
                })
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    setValidation({
                        type: "error",
                        cpf: err.response.data.errors.body.cpf,
                        email: err.response.data.errors.body.email,
                        name: err.response.data.errors.body.name,
                        senha: err.response.data.errors.body.senha,
                    })
                    setMensagem({
                        type: "error",
                        mensagem: "Não foi possivel registrar o usuário...",
                        loading: false
                    })
                } else {
                    setMensagem({
                        type: "error",
                        mensagem: "Erro: tente mais tarde...",
                        loading: false
                    })
                }
            })
    }

    return (
        <>
            <div className="container">
                <div className="container-cadastro">
                    <div>
                        <div className="container-top-cadastro">
                            <div className="title">
                                <h1>Cadastrar Usuário</h1>
                                <div className='msg-error'>
                                    {mensagem.type === "error" ? <label>{mensagem.mensagem}</label> : ""}
                                </div>
                                <p>
                                    Insira informações do usuário
                                </p>
                                {mensagem.loading ? <LoadingIcon /> : ""}
                            </div>
                        </div>

                        <div className="container-form-cadastro">
                            <form onSubmit={handlePostForm}>
                                <div className="box-input-cadastro">
                                    <h2>Nome completo</h2>
                                    <input required type="text" placeholder='Insira seu nome completo' name='name' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.name}</p> : ""}
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-email">
                                        <h2>E-mail</h2>
                                        <input required type="email" placeholder='Digite seu e-mail' name='email' className='input-cadastro' id='email' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.email}</p> : ""}
                                    </div>
                                    <div className="input-senha">
                                        <h2>Senha</h2>
                                        <input required type="text" placeholder='Insira sua senha' name='senha' className='input-cadastro' id='senha' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.senha}</p> : ""}
                                    </div>
                                </div>
                                <div className="box-input-cadastro">
                                    <h2>CPF</h2>
                                    <input required type="text" placeholder='Digite seu CPF' name='cpf' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.cpf}</p> : ""}
                                </div>
                                <div className="box-btn-cadastro">
                                    <button className='btn-cadastro'>
                                        Fazer cadastro
                                        <ChevronRight />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}