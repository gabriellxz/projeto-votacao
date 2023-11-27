export default interface Pesquisador {
    id_Pesquisador: number;
    name: string;
    email: string;
    cpf: string;
    roleId?: number;
    senha: string;
    cidade: string;
    estado: string
}