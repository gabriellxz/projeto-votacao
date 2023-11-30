import { createContext, useEffect, useState } from "react";
import api from "../config/apiConfig";

export interface ContextType {
    autenticado?: boolean;
    signIn?:        (sit: boolean) => void;
    logout?: () => void;
    // cidadeUser?: string;
    // estadoUser?: string;
    // roleUser?: string;
}

const Context = createContext<ContextType>({})

function AuthProvider({ children }: any) {

    const [autenticado, setAutenticado] = useState(false)
    // const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getLogin() {
            const token = localStorage.getItem("tokenUser")

            if (token) {
                api.defaults.headers.Authorization = `Bearer ${(token)}`
                setAutenticado(true)
            }

            // setLoading(false)
        }

        getLogin()
    }, [])

    async function signIn(sit: boolean) {
        setAutenticado(sit)
    }

    function logout() {
        setAutenticado(false)
        localStorage.removeItem("tokenUser")
        localStorage.removeItem("cidadeUser")
        localStorage.removeItem("estadoUser")
        localStorage.removeItem("roleUser")
        api.defaults.headers.Authorization = ""
    }

    // if (loading) {
    //     return console.log("Carregando...")
    // }

    return (
        <Context.Provider value={{ autenticado, signIn, logout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }