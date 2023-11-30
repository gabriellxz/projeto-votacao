import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from '../pages/Login/login'
import Cadastro from '../pages/Dashboard/Cadastro-dashboard/Cadastro/cadastro'

{/*AMDMINISTRADOR*/ }
import Dashboard from '../pages/Dashboard/dashboard'
import ListaCandidato from '../pages/Dashboard/Lista-candidato/lista-candidato'
import CadastroCandidato from '../pages/Dashboard/Cadastro-dashboard/Cadastro_candidato/cadastro-candidato'
import VotarCandidato from '../pages/Dashboard/Lista-candidato/VotarCandidato/votar-candidato'
import { Editar } from '../pages/Dashboard/Editar-cand-pesq/editar'
import ListaPesquisadores from '../pages/Dashboard/Editar-cand-pesq/Lista-pesquisadores/lista-pesquisadores'
import EditarPesquisador from '../pages/Dashboard/Editar-cand-pesq/Lista-pesquisadores/Editar-pesquisador/editar-pesquisador'
import ListaEditarCandidato from '../pages/Dashboard/Editar-cand-pesq/lista-editar-candidato/lista-editar-candidato'
import EditarCandidato from '../pages/Dashboard/Editar-cand-pesq/lista-editar-candidato/Editar-candidato/editar-candidato'
import { CustomRoutes, NivelAcess } from '../routesAdm'
import PageAcessNegado from '../pages/Page-acess-negado/page-acess-negado'
import Page404 from '../pages/Page-404/page-404'
import CadastroDashboard from '../pages/Dashboard/Cadastro-dashboard/cadastro-dashboard'
import Resultados from '../pages/Dashboard/Resultados/resultados'


{/*PESQUISADOR*/ }

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
                {/*cadastrar candidadato ---> dashboard*/}
                <Route path='cadastrarCandidato' element={<NivelAcess><CadastroCandidato /></NivelAcess>} />

                {/*cadastro pesquisador*/}
                <Route path='cadastro' element={<NivelAcess><Cadastro /></NivelAcess>} />

                <Route path='dashboard' element={
                    <CustomRoutes>
                        <Dashboard />
                    </CustomRoutes>
                }>

                    <Route path='cadastroDashboard' element={<NivelAcess><CadastroDashboard /></NivelAcess>} />

                    {/*lista de candidatos ---> dashboard*/}
                    <Route index element={
                        <ListaCandidato />
                    } />
                    <Route path='listaCandidato' element={
                        <ListaCandidato />
                    }>
                        {/*votar no candidato ---> lista de candidatos ---> dashboard*/}
                        <Route path='votarCandidato/:id_candidato' element={<VotarCandidato />} />
                    </Route>

                    <Route path='resultados' element={<Resultados />} />

                    {/*editar ---> dashboard*/}
                    <Route path='Editar' element={<NivelAcess><Editar /></NivelAcess>}>
                        {/*lista de pesquisadores ---> editar ---> dashboard*/}
                        <Route index element={<NivelAcess><ListaPesquisadores /></NivelAcess>} />
                        <Route path='listaPesquisadores' element={<NivelAcess><ListaPesquisadores /></NivelAcess>}>
                            {/*editar pesquisador ---> lista de pesquisadores ---> editar ---> dashboard*/}
                            <Route path='editarPesquisador/:id_Pesquisador' element={<NivelAcess><EditarPesquisador /></NivelAcess>} />
                        </Route>

                        {/*crud de candidatos ---> editar ---> dashboard*/}
                        <Route path='listaEditarCandidato' element={<NivelAcess><ListaEditarCandidato /></NivelAcess>}>
                            {/*editar candidato ---> lista de editar candidato ---> editar ---> dashboard*/}
                            <Route path='editarCandidato/:id_candidato' element={<NivelAcess><EditarCandidato /></NivelAcess>} />
                        </Route>
                    </Route>
                </Route>
                <Route path='/acessoNegado' element={<PageAcessNegado />} />
                <Route path='*' element={<Page404 />} />

            </Routes>
        </BrowserRouter >
    )
}
