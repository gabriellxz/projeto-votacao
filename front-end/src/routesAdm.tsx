// import { useContext } from "react"
// import { Context } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export function CustomRoutes({ children }: Props) {
    // const { autenticado } = useContext(Context)
    const tokenValidation = localStorage.getItem("tokenUser")

    if (!tokenValidation) {
        return <Navigate to={"/"} />
    }

    return children
}

export function NivelAcess({children}: Props) {
    const roleUser = localStorage.getItem("roleUser");

    if(roleUser == "1") {
        return <Navigate to={"/acessoNegado"} />
    }

    return children
}

// export function VotarAcess({children }: Props) {
//     const roleUser = localStorage.getItem("roleUser");

//     if(roleUser == "1" || roleUser == "2") {
//         return <Navigate to={"/"} />
//     }

//     return children
// }