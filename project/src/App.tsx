import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Routes/Login/login'
import Cadastro from './Routes/Cadastro/cadastro'
import Dashboard from './Routes/Dashboard/dashboard'
import { AuthProvider } from './context/authContext'
import { CustomRoutes } from './routesAdm'

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
                <Dashboard/>
              </CustomRoutes>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
