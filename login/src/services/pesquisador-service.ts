import api from '../config/apiConfig'

export function deletePesqById(id:number) {
    return api.delete(`/Pesquisador/${id}`)
}

export function pesFindById(id: number) {
    return api.get(`/Pesquisador/${id}`)
}