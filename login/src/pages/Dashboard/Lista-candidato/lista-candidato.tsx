import './style.css'
import { useEffect, useState } from "react"
import api from '../../../config/apiConfig'
import CardCandidato from "../../../components/Card-candidato/card-candidato"
import typeCandidato from "../../../models/typeCandidato"
import axios from 'axios'
import { Outlet } from 'react-router-dom'

export default function ListaCandidato() {

    const token = localStorage.getItem("tokenUser")

    const [candidato, setCandidato] = useState<typeCandidato[]>([])
    const [valueCep, setValueCep] = useState({
        cep: ""
    })
    const [localidade, setLocalidade] = useState("")
    const [uf, setUf] = useState("")
    const [filtrarCandidatos, setFiltrarCandidatos] = useState<typeCandidato[]>([])
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    function handleValueCep(e: any) {
        setValueCep({ ...valueCep, [e.target.name]: e.target.value })
    }

    async function filterCandidatos() {
        await axios.get(`https://viacep.com.br/ws/${valueCep.cep}/json/`)
            .then((response) => {
                setLocalidade(response.data.localidade)
                setUf(response.data.uf)

                console.log(localidade)
                console.log(uf)

                const filtrarCandidatos = candidato.filter(
                    (cand: typeCandidato) => cand.cidade === localidade && cand.estado === uf
                )

                setFiltrarCandidatos(filtrarCandidatos)
                console.log(filtrarCandidatos)
            })
            .catch((err) => {
                console.log(err)
                setFiltrarCandidatos([])
            })
    }

    useEffect(() => {
        filterCandidatos()
    }, [filtrarCandidatos])

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }

    async function getCandidatos() {
        await api.get("/Candidatos", { headers })
            .then((response) => {
                console.log(response)
                setCandidato(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCandidatos()
    }, [valueCep.cep])

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                const stateData = response.data;

                const stateNames = stateData.map((state: any) => ({
                    id: state.id,
                    nome: state.nome,
                    sigla: state.sigla
                }));

                setStates(stateNames);
            } catch (err) {
                setStates([]);
            }
        };

        fetchStates();
    }, []);

    const handleStateChange = async (e: any) => {
        const stateValue = e.target.value;

        setSelectedState(stateValue);
        setSelectedCity('');

        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`);
            const cityData = response.data;

            const cityNames = cityData.map((city: any) => city.nome);

            setCities(cityNames);
        } catch (err) {
            setCities([]);
        }
    };

    const handleCityChange = (e: any) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div className='container-list'>
            <div className="container-input-search">
                <div>
                    <label htmlFor="estados">Estado:</label>
                    <select value={selectedState} onChange={handleStateChange} name="estados" id="estados">
                        <option value="">Selecione...</option>
                        {states.map((state: any) => (
                            <option key={state.id} value={state.sigla}>{state.sigla}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="cidades">Cidade:</label>
                    <select value={selectedCity} onChange={handleCityChange} name="cidades" id="cidades">
                        <option value="">Selecione...</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type="text" placeholder='Pesquisar' name='cep' onChange={handleValueCep} />
                    {/* <button onClick={filterCandidatos}>Procurar</button> */}
                </div>
            </div>
            <div className='container-list-candidatos'>
                {
                    candidato.map((item: typeCandidato) => (
                        <CardCandidato candidato={item} key={item.id_candidato} />
                    ))
                }
                <Outlet/>
            </div>
        </div>
    )
}