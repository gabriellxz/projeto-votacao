import './App.css'
import { AuthProvider } from './context/authContext'
import RoutesPage from './routes/routes.tsx'

function App() {

  return (
    <>
      <AuthProvider>
        <RoutesPage/>
      </AuthProvider>
    </>
  )
}

export default App
