// import { useContext } from "react"
// import { Context } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export function CustomRoutes({children}: Props) {
    // const { autenticado } = useContext(Context)
    const tokenValidation = localStorage.getItem("tokenUser")

    if(tokenValidation === undefined || tokenValidation === null || tokenValidation === "") {
        return <Navigate to={"/"}/>
    }
    return children
}
