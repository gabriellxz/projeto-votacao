import './style.css'
import ChevronRight from '../../../../componentsSVG/chevron-right/chevron-right'
import { useState } from 'react'
import typeCadastro from '../../../../models/typeCadastro'
import api from "../../../../config/apiConfig"
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {

    const navigate = useNavigate()

    const [user, setUser] = useState<typeCadastro>({
        name: "",
        email: "",
        senha: "",
        cpf: "",
        cidade: "",
        estado: ""
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
        cidade: "",
        estado: ""
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
                setTimeout(() => {
                    navigate("/dashboard/Editar/listaPesquisadores")
                }, 3000)
                toast.success("Pesquisador cadastrado com sucesso!")
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
                        cidade: err.response.data.errors.body.cidade,
                        estado: err.response.data.errors.body.estado,
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
                                    <label>Nome completo</label>
                                    <input required type="text" placeholder='Insira seu nome completo' name='name' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.name}</p> : ""}
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-email">
                                        <label>E-mail</label>
                                        <input required type="email" placeholder='Digite seu e-mail' name='email' className='input-cadastro' id='email' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.email}</p> : ""}
                                    </div>
                                    <div className="input-senha">
                                        <label>Senha</label>
                                        <input required type="text" placeholder='Insira sua senha' name='senha' className='input-cadastro' id='senha' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.senha}</p> : ""}
                                    </div>
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-email">
                                        <label>Cidade</label>
                                        <input required type="cidade" placeholder='Digite sua cidade' name='cidade' className='input-cadastro' id='cidade' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.cidade}</p> : ""}
                                    </div>
                                    <div className="input-senha">
                                        <label>Estado</label>
                                        <input required type="text" placeholder='Digite seu estado' name='estado' className='input-cadastro' id='estado' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.estado}</p> : ""}
                                    </div>
                                </div>
                                <div className="box-input-cadastro">
                                    <label>CPF</label>
                                    <input required type="text" placeholder='Digite seu CPF' name='cpf' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.cpf}</p> : ""}
                                </div>
                                <div className="box-btn-cadastro">
                                    <button className='btn-cadastro'>
                                        Fazer cadastro
                                        <ChevronRight />
                                    </button>
                                </div>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}