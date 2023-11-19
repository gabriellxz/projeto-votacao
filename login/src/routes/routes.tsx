import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from '../pages/Login/login'
import { CustomRoutes } from '../routesAdm'
import Dashboard from '../pages/Dashboard/dashboard'
import ListaCandidato from '../pages/Dashboard/Lista-candidato/lista-candidato'
import CadastroCandidato from '../pages/Dashboard/Cadastro_candidato/cadastro-candidato'
import Cadastro from '../pages/Cadastro/cadastro'
import VotarCandidato from '../pages/VotarCandidato/votar-candidato'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Login />,
//         errorElement: <PageError />
//     },
//     {
//         path: "dashboard",
//         element: <CustomRoutes>
//             <Dashboard />
//         </CustomRoutes>,
//         children: [
//             {
//                 path: "listaCandidato",
//                 element: <ListaCandidato/>
//             }
//         ]
//     }
// ])

export default function RoutesPage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='cadastro' element={<Cadastro />} />
                <Route path='dashboard' element={
                    <CustomRoutes>
                        <Dashboard />
                    </CustomRoutes>
                }>
                    <Route index element={<ListaCandidato />} />
                    <Route path='listaCandidato' element={<ListaCandidato />}>
                        <Route path='votarCandidato/:id_candidato' element={<VotarCandidato />} />
                    </Route>
                    <Route path='cadastrarCandidato' element={<CadastroCandidato />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}