import './style.css'
import { useState } from "react"
import api from "../../../config/apiConfig"
import axios from "axios"

interface Endereco {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

export default function CadastroCandidato() {

    const [endereco, SetEndereco] = useState<Endereco>({})
    const [valueInput, setValueInput] = useState({
        name: "",
        apelido: "",
        Partido: "",
        cep: "",
        cidade: "",
        estado: ""
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

        const formData = new FormData();
        formData.append("name", valueInput.name)
        formData.append("apelido", valueInput.apelido)
        formData.append("Partido", valueInput.Partido)
        formData.append("cep", valueInput.cep)
        formData.append("cidade", cidade)
        formData.append("estado", cidade)
        if (imagem) {
            formData.append("imagem", imagem)
        }

        await api.post("/Candidatos", formData, { headers })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="container-cadastro-candidato">
                <form>
                    <div className="single-input">
                        <input type="text" name="name" placeholder="Nome" onChange={handleValueInput} />
                        <input type="text" name="apelido" placeholder="Apelido" onChange={handleValueInput} />
                    </div>
                    <div className="single-input">
                        <input type="text" name="Partido" placeholder="Partido" onChange={handleValueInput} />
                    </div>
                    <div className="single-input">
                        <input type="text" name="cep" placeholder="CEP" onChange={handleValueInput} />
                        <button onClick={getCep}>Buscar CEP</button>
                    </div>
                    <div className="single-input">
                        <input type="text" name="cidade" placeholder="Cidade" value={cidade} />
                        <input type="text" name="estado" placeholder="Estado" value={estado} />
                    </div>
                    <div className="single-input">
                        <input type="file" onChange={handleImagem} />
                    </div>
                    <div className="single-input">
                        <button onClick={handlePostForm}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}