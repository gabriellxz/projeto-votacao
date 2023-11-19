import './style.css'
import { useState } from "react"
import api from "../../../config/apiConfig"
import axios from "axios"
import logoEleicoes from '../../../assets/img/eleicoes-logo.png'
import { useNavigate } from 'react-router-dom'

interface Endereco {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

interface TypeStatus {
    type: string;
    mensagem?: string;
    mensagemName?: string;
    mensagemCidade?: string;
    mensagemEstado?: string;
    loading: boolean;
}

export default function CadastroCandidato() {

    const navigate = useNavigate()

    const [endereco, SetEndereco] = useState<Endereco>({})
    const [valueInput, setValueInput] = useState({
        name: "",
        apelido: "",
        Partido: "",
        cep: "",
        cidade: "",
        estado: ""
    })
    const [status, setStatus] = useState<TypeStatus>({
        type: "",
        mensagemName: "",
        mensagemCidade: "",
        mensagemEstado: "",
        loading: false
    })
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [imagem, setImagem] = useState<File | null>(null)

    function handleValueInput(e: any) {
        setValueInput({ ...valueInput, [e.target.name]: e.target.value })
    }

    async function getCep(e: any) {
        e.preventDefault()

        await axios.get<Endereco>(`https://viacep.com.br/ws/${valueInput.cep}/json/`)
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

    function handleImagem(e: any) {
        if (e.target.files && e.target.files.length > 0) {
            setImagem(e.target.files[0])
        }
    }

    const headers = {
        "Content-Type": "multipart/form-data"
    }

    async function handlePostForm(e: any) {
        e.preventDefault()

        setStatus({
            type: "",
            mensagemName: "",
            mensagemCidade: "",
            mensagemEstado: "",
            loading: true
        })

        const formData = new FormData();
        formData.append("name", valueInput.name)
        formData.append("apelido", valueInput.apelido)
        formData.append("Partido", valueInput.Partido)
        formData.append("cep", valueInput.cep)
        formData.append("cidade", cidade)
        formData.append("estado", estado)
        if (imagem) {
            formData.append("images", imagem)
        }

        await api.post("/Candidatos", formData, { headers })
            .then((response) => {
                console.log(response.data)
                setStatus({
                    type: "sucess",
                    mensagemName: response.data,
                    mensagemCidade: response.data,
                    mensagemEstado: response.data,
                    loading: false
                })
                navigate("/dashboard/listaCandidato")
            })
            .catch((err) => {
                if (err.response) {
                    setStatus({
                        type: "error",
                        mensagemName: err.response.data.errors.body.name,
                        mensagemCidade: err.response.data.errors.body.cidade,
                        mensagemEstado: err.response.data.errors.body.estado,
                        loading: false
                    })
                } else {
                    setStatus({
                        type: "error",
                        mensagem: "Erro: Tente mais tarde...",
                        loading: false
                    })
                }
            })
    }

    return (
        <>
            <div className="container-cadastro-candidato">
                <form>
                    <div className="box-form-candidato">
                        <h1>
                            Cadastre um candidato
                        </h1>
                        <div className="box-input-candidato">
                            <div className="single-input-candidato">
                                {status.type === "error" ? <label className='msg-error'>{status.mensagemName}</label> : <label>Nome</label>}
                                <input type="text" name="name" className="input-sucess" placeholder="Nome" onChange={handleValueInput} />
                            </div>
                            <div className="single-input-candidato">
                                <label>Apelido</label>
                                <input type="text" name="apelido" className='input-sucess' placeholder="Apelido" onChange={handleValueInput} />
                            </div>
                        </div>
                        <div className="box-input-candidato">
                            <div className="single-input-candidato">
                                <label>Partido</label>
                                <input type="text" name="Partido" className='input-sucess' placeholder="Partido" onChange={handleValueInput} />
                            </div>
                        </div>
                        <div className="box-input-candidato">
                            <div className="single-input-candidato">
                                <input required id='input-cep' type="text" name="cep" className='input-sucess' placeholder="CEP" onChange={handleValueInput} />
                            </div>
                            <div className="single-input-candidato">
                                <input type='button' onClick={getCep} value={"Buscar CEP"} id='button-cep' />
                            </div>
                        </div>
                        <div className="box-input-candidato">
                            <div className="single-input-candidato">
                                {status.type === "error" ? <label className='msg-error'>{status.mensagemCidade}</label> : <label>Cidade</label>}
                                <input type="text" name="cidade" className="input-sucess" placeholder="Cidade" value={cidade} />
                            </div>
                            <div className="single-input-candidato">
                                {status.type === "error" ? <label className='msg-error'>{status.mensagemEstado}</label> : <label>Estado</label>}
                                <input type="text" name="estado" className="input-sucess" placeholder="Estado" value={estado} />
                            </div>
                        </div>
                        <div className="box-input-candidato">
                            <input type="file" id='uploadBtn' onChange={handleImagem} />
                            <label htmlFor='uploadBtn' id='label-file'>
                                importar imagem
                            </label>
                        </div>
                        <div className="box-candidato-btn">
                            <img src={logoEleicoes} />
                            <button onClick={handlePostForm}>Cadastrar</button>
                        </div>
                    </div>
                </form>
                <div style={{display:'none'}}>
                    {endereco.bairro}
                </div>
            </div>
        </>
    )
}