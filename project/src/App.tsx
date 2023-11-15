import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Routes/Login/login'
import Cadastro from './Routes/Cadastro/cadastro'
import { AuthProvider } from './context/authContext'
import { CustomRoutes } from './routesAdm.tsx'
import Dashboard from './Routes/Dashboard/dashboard.tsx'
import ListaCandidato from './Routes/Dashboard/Lista-candidato/lista-candidato.tsx'
import CadastroCandidato from './Routes/Dashboard/Cadastro_candiadato/cadastro-candidato.tsx'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='cadastro' element={<Cadastro />} />

            
            <Route path='dashboard' element={
              <CustomRoutes>
                <Dashboard />
              </CustomRoutes>
            }>
              {/* <Route index element={<ListaCandidato />} /> */}
              <Route path='listaCandidato' element={<ListaCandidato />} />
              <Route index element={<CadastroCandidato />} />
              <Route path='cadastrarCadidato' element={<CadastroCandidato/>} />
            </Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
