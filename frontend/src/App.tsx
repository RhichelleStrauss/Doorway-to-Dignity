import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import AuthPage from './pages/AuthPage'
import Contact from './pages/Contact'
import VolunteerDashboard from './pages/VolunteerDashboard'
import FAQ from './pages/FAQ'
import Donate from './pages/Donate'
import Layout from './components/Layout'
import ComingSoon from './components/ComingSoon'
import ScrollToTop from './components/ScrollToTop'


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<VolunteerDashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />

        {/* log in and sign up show Coming Soon while the site is shared for analytics */}
        <Route path="/login" element={<ComingSoon text="Volunteer accounts are on their way. Log in will be available soon." />} />
<Route path="/signup" element={<ComingSoon text="Volunteer sign-ups are on their way. In the meantime, get in touch through our contact page." />} />

       </Route>

{/* swap these back in (and the AuthPage import) when accounts are ready */}
{/* <Route path="/login" element={<AuthPage mode="login" />} /> */}
{/* <Route path="/signup" element={<AuthPage mode="signup" />} /> */}
      </Routes>
    </>
  )
}

export default App
