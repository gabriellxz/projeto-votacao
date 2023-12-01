import './style.css'
import ChevronRight from '../../../../componentsSVG/chevron-right/chevron-right'
import { useState } from 'react'
import typeCadastro from '../../../../models/typeCadastro'
import api from "../../../../config/apiConfig"
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

interface Endereco {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

export default function Cadastro() {

    const navigate = useNavigate()

    const [endereco, SetEndereco] = useState<Endereco>({})
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [user, setUser] = useState<typeCadastro>({
        name: "",
        email: "",
        senha: "",
        cep: "",
        cpf: "",
        cidade: cidade,
        estado: estado
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

    async function getCep(e: any) {
        e.preventDefault()

        await axios.get<Endereco>(`https://viacep.com.br/ws/${user.cep}/json/`)
            .then((response) => {
                console.log(response.data)
                SetEndereco(response.data)
                preencherCampos(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function preencherCampos(endereco: Endereco) {
        setCidade(endereco.localidade || "")
        setEstado(endereco.uf || "")
    }

    async function handlePostForm(e: any) {
        e.preventDefault()
        setMensagem({
            type: "",
            mensagem: "",
            loading: true
        })

        const dadosUser = {
            name: user.name,
            email: user.email,
            senha: user.senha,
            cpf: user.cpf,
            cidade: cidade,
            estado: estado
        }

        await api.post("/cadastro", dadosUser, { headers })
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
                                <h1>Cadastrar pesquisador</h1>
                                <div className='msg-error'>
                                    {mensagem.type === "error" ? <label>{mensagem.mensagem}</label> : ""}
                                </div>
                                <p>
                                    Insira informações do pesquisador
                                </p>
                                {mensagem.loading ? <LoadingIcon /> : ""}
                            </div>
                        </div>

                        <div className="container-form-cadastro">
                            <form onSubmit={handlePostForm}>
                                <div className="box-input-cadastro">
                                    <label>Nome completo</label>
                                    <input required type="text" placeholder='Insira o nome completo' name='name' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.name}</p> : ""}
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-email">
                                        <label>E-mail</label>
                                        <input required type="email" placeholder='Digite o e-mail' name='email' className='input-cadastro' id='email' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.email}</p> : ""}
                                    </div>
                                    <div className="input-senha">
                                        <label>Senha</label>
                                        <input required type="text" placeholder='Insira a senha' name='senha' className='input-cadastro' id='senha' onChange={handleInput} />
                                        {validation.type === "error" ? <p>{validation.senha}</p> : ""}
                                    </div>
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-cep">
                                        <input required type="text" placeholder='Digite o CEP' name='cep' className='input-cadastro' id='cep' onChange={handleInput} />
                                        {/* {validation.type === "error" ? <p>{validation.cep}</p> : ""} */}
                                    </div>
                                    <div className="input-senha">
                                        <button onClick={getCep} id='button-cep'>Buscar CEP</button>
                                    </div>
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-estado">
                                        <label>Cidade: {cidade}</label>
                                    </div>
                                    <div className="input-cidade">
                                        <label>Estado: {estado}</label>
                                    </div>
                                </div>
                                <div className="box-input-cadastro">
                                    <label>CPF</label>
                                    <input required type="text" placeholder='Digite o CPF' name='cpf' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "error" ? <p>{validation.cpf}</p> : ""}
                                </div>
                                <div className="box-btn-cadastro">
                                    <button onClick={handlePostForm} className='btn-cadastro'>
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