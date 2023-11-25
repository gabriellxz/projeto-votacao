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
import VotarCandidato from '../pages/Dashboard/Lista-candidato/VotarCandidato/votar-candidato'
import { Editar } from '../pages/Dashboard/Editar-cand-pesq/editar'
import ListaPesquisadores from '../pages/Dashboard/Editar-cand-pesq/Lista-pesquisadores/lista-pesquisadores'
import EditarPesquisador from '../pages/Dashboard/Editar-cand-pesq/Lista-pesquisadores/Editar-pesquisador/editar-pesquisador'


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

                {/*Dashboard*/}
                <Route path='dashboard' element={
                    <CustomRoutes>
                        <Dashboard />
                    </CustomRoutes>
                }>

                    {/*lista de candidatos ---> dashboard*/}
                    <Route index element={<ListaCandidato />} />
                    <Route path='listaCandidato' element={<ListaCandidato />}>
                        {/*votar no candidato ---> lista de candidatos ---> dashboard*/}
                        <Route path='votarCandidato/:id_candidato' element={<VotarCandidato />} />
                    </Route>
                    {/*cadastrar candidadato ---> dashboard*/}
                    <Route path='cadastrarCandidato' element={<CadastroCandidato />} />

                    {/*editar ---> dashboard*/}
                    <Route path='Editar' element={<Editar />}>
                        <Route index element={<ListaPesquisadores />} />
                        {/*lista de pesquisadores ---> editar ---> dashboard*/}
                        <Route path='listaPesquisadores' element={<ListaPesquisadores />}>
                            {/*editar pesquisador ---> lista de pesquisadores ---> editar ---> dashboard*/}
                            <Route path='editarPesquisador' element={<EditarPesquisador />}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}