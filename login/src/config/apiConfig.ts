import axios from 'axios'

export default axios.create({
    baseURL: "https://api-sistema-de-votacao.vercel.app"
})