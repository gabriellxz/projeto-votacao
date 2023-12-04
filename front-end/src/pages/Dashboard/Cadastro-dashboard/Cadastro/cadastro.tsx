import './style.css'
import { useState } from 'react'
import typeCadastro from '../../../../models/typeCadastro'
import api from "../../../../config/apiConfig"
import { useNavigate } from 'react-router-dom'
// import LoadingIcon from '../../../../components/loading-icon/loading-icon'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import LoadingIcon from '../../../../components/loading-icon/loading-icon'

interface Endereco {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

interface validation {
    type?: string;
    loading: boolean;
    mensagem?: string;
    name?: string;
    email?: string;
    senha?: string;
    cpf?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
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
    const [validation, setValidation] = useState<validation>({
        type: "",
        loading: false,
        name: "",
        email: "",
        senha: "",
        cep: "",
        cpf: "",
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

        setValidation({
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
                if (
                    user.name !== null &&
                    user.email !== null &&
                    user.senha !== null &&
                    user.cpf !== null &&
                    user.estado !== null &&
                    user.cidade !== null &&
                    user.cep !== null
                ) {
                    console.log(response.data)
                    console.log(endereco)

                    setValidation({
                        loading: false
                    })

                    setTimeout(() => {
                        navigate("/dashboard/Editar/listaPesquisadores")
                    }, 3000)
                    toast.success("Pesquisador cadastrado com sucesso!")
                }
            })
            .catch((err) => {
                if (err.response) {
                    if (
                        user.name === "" &&
                        user.email === "" &&
                        user.senha === "" &&
                        user.cpf === "" &&
                        user.cep === ""
                    ) {
                        console.log(err)
                        setValidation({
                            type: "null",
                            loading: false,
                            mensagem: "Campo obrigatório!"
                        })
                    } else if (
                        (user.name.length < 3) &&
                        (user.email.length < 6) &&
                        (user.senha.length < 5) &&
                        (user.cpf.length !== 11) &&
                        (user.cep.length !== 8)
                    ) {
                        console.log(err)
                        setValidation({
                            type: "length",
                            loading: false,
                            name: err.response.data.errors.body.name,
                            email: err.response.data.errors.body.email,
                            senha: err.response.data.errors.body.senha,
                            cpf: err.response.data.errors.body.cpf,
                            cep: "CEP deve conter 8 caracteres"
                        })
                    } else {
                        console.log(err)
                        setValidation({
                            type: "erro_2",
                            loading: false,
                            mensagem: err.response.data.msg
                        })
                    }
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
                                    {validation.type === "error" ? <label className='msg-error'>{validation.mensagem}</label> : ""}
                                    {validation.type === "erro_2" ? <label className='msg-error'>{validation.mensagem}</label> : ""}
                                </div>
                                <p>
                                    Insira informações do pesquisador
                                </p>
                            </div>
                        </div>

                        <div className="container-form-cadastro">
                            <form onSubmit={handlePostForm}>
                                <div className="box-input-cadastro">
                                    <label>Nome completo</label>
                                    <input required type="text" placeholder='Insira o nome completo' name='name' className='input-cadastro' onChange={handleInput} />
                                    {validation.type === "null" ? <p>{validation.mensagem}</p> : ""}
                                    {validation.type === "length" ? <p className='msg-error'>{validation.name}</p> : ""}
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-email">
                                        <label>E-mail</label>
                                        <input required type="email" placeholder='Digite o e-mail' name='email' className='input-cadastro' id='email' onChange={handleInput} />
                                        {validation.type === "null" ? <p>{validation.mensagem}</p> : ""}
                                        {validation.type === "length" ? <p className='msg-error'>{validation.email}</p> : ""}
                                    </div>
                                    <div className="input-senha">
                                        <label>Senha</label>
                                        <input required type="text" placeholder='Insira a senha' name='senha' className='input-cadastro' id='senha' onChange={handleInput} />
                                        {validation.type === "null" ? <p>{validation.mensagem}</p> : ""}
                                        {validation.type === "length" ? <p className='msg-error'>{validation.senha}</p> : ""}
                                    </div>
                                </div>
                                <div className="box-input-cadastro" id="input-central">
                                    <div className="input-cep">
                                        <input required type="text" placeholder='Digite o CEP' name='cep' className='input-cadastro' id='cep' onChange={handleInput} />
                                        {validation.type === "null" ? <p>{validation.mensagem}</p> : ""}
                                        {validation.type === "length" ? <p className='msg-error'>{validation.cep}</p> : ""}
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
                                    {validation.type === "null" ? <p>{validation.mensagem}</p> : ""}
                                    {validation.type === "length" ? <p className='msg-error'>{validation.cpf}</p> : ""}
                                </div>
                                <div className="box-btn-cadastro">
                                    <button onClick={handlePostForm} className='btn-cadastro'>
                                        {validation.loading ? <LoadingIcon /> : <p>Fazer cadastro</p>}
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