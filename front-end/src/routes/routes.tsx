import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from '../pages/Login/login'
import Cadastro from '../pages/Cadastro/cadastro'
import Dashboard from '../pages/Dashboard/dashboard'

{/*AMDMINISTRADOR*/}
import ListaCandidato from '../pages/Dashboard/adm/Lista-candidato/lista-candidato'
import CadastroCandidato from '../pages/Dashboard/adm/Cadastro_candidato/cadastro-candidato'
import VotarCandidato from '../pages/Dashboard/adm/Lista-candidato/VotarCandidato/votar-candidato'
import { Editar } from '../pages/Dashboard/adm/Editar-cand-pesq/editar'
import ListaPesquisadores from '../pages/Dashboard/adm/Editar-cand-pesq/Lista-pesquisadores/lista-pesquisadores'
import EditarPesquisador from '../pages/Dashboard/adm/Editar-cand-pesq/Lista-pesquisadores/Editar-pesquisador/editar-pesquisador'
import ListaEditarCandidato from '../pages/Dashboard/adm/Editar-cand-pesq/lista-editar-candidato/lista-editar-candidato'
import EditarCandidato from '../pages/Dashboard/adm/Editar-cand-pesq/lista-editar-candidato/Editar-candidato/editar-candidato'

{/*PESQUISADOR*/}

import { CustomRoutes } from '../routesAdm'
// import CrudListCandidato from '../pages/Dashboard/Editar-cand-pesq/Crud-candidato-list/crud-list-candidato'
// import MoadalEditCand from '../components/modal-edit-cand/modal-edit-cand'
// import CrudCandidato from '../pages/Dashboard/Editar-cand-pesq/Crud-candidato-list/Crud-candidato/crud-candidato'


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


                    {/*ROTAS ADM*/}

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
                        {/*lista de pesquisadores ---> editar ---> dashboard*/}
                        <Route index element={<ListaPesquisadores />} />
                        <Route path='listaPesquisadores' element={<ListaPesquisadores />}>
                            {/*editar pesquisador ---> lista de pesquisadores ---> editar ---> dashboard*/}
                            <Route path='editarPesquisador/:id_Pesquisador' element={<EditarPesquisador />} />
                        </Route>

                        {/*crud de candidatos ---> editar ---> dashboard*/}
                        <Route path='listaEditarCandidato' element={<ListaEditarCandidato />}>
                            {/*editar candidato ---> lista de editar candidato ---> editar ---> dashboard*/}
                            <Route path='editarCandidato/:id_candidato' element={<EditarCandidato />} />
                        </Route>
                    </Route>
                </Route>

                {/*ROTAS PESQUISADOR*/}
                
            </Routes>
        </BrowserRouter>
    )
}