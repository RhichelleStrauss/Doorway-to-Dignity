import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Contact from './pages/Contact'
import VolunteerDashboard from './pages/VolunteerDashboard'
import FAQ from './pages/FAQ'
import Donate from './pages/Donate'
import Layout from './components/Layout'
// import ComingSoon from './components/ComingSoon'
import ScrollToTop from './components/ScrollToTop'
import NeedAuth from './components/NeedAuth'



function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<NeedAuth><VolunteerDashboard /></NeedAuth>} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />

        {/* coming soon stuffies */}
        {/* <Route path="/login" element={<ComingSoon text="Volunteer accounts are on their way. Log in will be available soon." />} />
<Route path="/signup" element={<ComingSoon text="Volunteer sign-ups are on their way. In the meantime, get in touch through our contact page." />} /> */}

       </Route> 

{/* real */}
<Route path="/login" element={<AuthPage mode="login" />} />
<Route path="/signup" element={<AuthPage mode="signup" />} />
      </Routes>
    </>
  )
}

export default App
