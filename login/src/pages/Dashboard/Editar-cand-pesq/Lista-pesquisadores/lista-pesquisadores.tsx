import { useEffect, useState } from "react"
import api from '../../../../config/apiConfig'

interface Pesquisador {
    id_pesquisador: number;
    name: string;
    email: string;
    cpf: string;
    roleId?: number;
    senha: string

}

export function ListaPesquisadores() {

    const [pesquisadores, setPesquisadores] = useState<Pesquisador[]>([])

    const headers = {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + token
    }

    async function getPesquisadores() {
        try {
            const response = await api.get("/Pesquisadores", { headers })
            console.log(response.data)
            setPesquisadores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPesquisadores
    })

    return (
        <>
            <h1>Pesquisadores</h1>
            <ul>
                {
                    pesquisadores.map((item:Pesquisador) => (
                        <li>{item.name}</li>
                    ))
                }
            </ul>
        </>
    )
}