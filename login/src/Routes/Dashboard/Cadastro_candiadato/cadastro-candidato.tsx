import { useState } from "react"
import api from "../../../config/apiConfig"
import axios from "axios"

interface viacep {
    localidade: string;
    uf: string;
}

export default function CadastroCandidato() {

    const [valueInput, setValueInput] = useState({
        name: "",
        apelido: "",
        Partido: "",
        cep: "",
        localidade: "",
        uf: ""
    })

    const [endereco, setEndereco] = useState<viacep>()
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")

    const [file, setFile] = useState(null)

    function handleFile(e: any) {
        setFile(e.target.files[0])
    }

    function handleValueInput(e: any) {
        setValueInput({ ...valueInput, [e.target.name]: e.target.value })
    }

    const headers = {
        "headers": {
            "Content-Type": "multipart/form-data",
        }
    }

    async function handleSubmitForm(e: any) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", valueInput.name)
        formData.append("apelido", valueInput.apelido)
        formData.append("Partido", valueInput.Partido)
        formData.append("localidade", valueInput.localidade)
        formData.append("uf", valueInput.uf)

        if (file) {
            formData.append("images", file)
        }

        // await api.post("/Candidatos", formData, headers)
        //     .then((response) => {
        //        setValueInput(response.data)
        //        console.log(response.data)
        //     })
        //    .catch((err) => {
        //      console.log(err)
        //    })

        await api.post("https://api-sistema-de-votacao.vercel.app/Candidatos", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    async function getCep() {
        await axios.get(`https://viacep.com.br/ws/${valueInput.cep}/json/`)
            .then((response) => {
                console.log(response.data)
                preencherEndereco(response.data)
                setEndereco(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function preencherEndereco(endereco: viacep) {
        setCidade(endereco.localidade)
        setEstado(endereco.uf)
    }

    return (
        <>
            <div className="container-cadastro-candidato">
                <form onSubmit={handleSubmitForm}>
                    <input type="text" name="name" placeholder="Nome" onChange={handleValueInput} />
                    <input type="text" name="apelido" placeholder="Apelido" onChange={handleValueInput} />
                    <input type="text" name="Partido" placeholder="Partido" onChange={handleValueInput} />
                    <input type="text" name="cep" placeholder="CEP" onChange={handleValueInput} />
                    <button onClick={getCep}>Buscar CEP</button>
                    <input type="text" name="localidade" placeholder="Cidade" onChange={handleValueInput} value={cidade} />
                    <input type="text" name="uf" placeholder="Estado" onChange={handleValueInput} value={estado} />
                    <input type="file" onChange={handleFile} />
                    <button>Cadastrar</button>
                </form>
            </div>
        </>
    )
}