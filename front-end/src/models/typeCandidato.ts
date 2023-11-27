export default interface typeCandidato {
    id_candidato: number;
    Partido: string;
    apelido: string;
    images: [
        {
            FotoId: number,
            Url: string,
            id: number
        }
    ];
    name: string;
    estado: string;
    cidade: string;
}