import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Contact from './pages/Contact'
import VolunteerDashboard from './pages/VolunteerDashboard'
import FAQ from './pages/FAQ'
import Donate from './pages/Donate'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<VolunteerDashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </>
  )
}

export default App
