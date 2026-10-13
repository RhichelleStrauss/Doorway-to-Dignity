import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Contact from './pages/Contact'
import VolunteerDashboard from './pages/VolunteerDashboard'
import FAQ from './pages/FAQ'
import Donate from './pages/Donate'
import Layout from './components/Layout'


function App() {
  return (
    <>
     
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<VolunteerDashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />
       </Route>

<Route path="/login" element={<AuthPage mode="login" />} />
<Route path="/signup" element={<AuthPage mode="signup" />} />
      </Routes>
    </>
  )
}

export default App
