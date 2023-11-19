import api from '../config/apiConfig'

export function candFindById(id: number) {
    return api.get(`/Candidatos/${id}`)
}