export default interface Pesquisador {
    id_pesquisador: number;
    name: string;
    email: string;
    cpf: string;
    roleId?: number;
    senha: string;
    cidade: string;
    estado: string
}