import { NavLink } from 'react-router-dom'
import logo from '../assets/figma/logo.png'


const links = [
  { label: 'Home', to: '/' },
  { label: 'LogIn', to: '/login' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Dashboard', to: '/VolunteerDashboard'}
]

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">

      <div className="flex-1">
  <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold">
    <img src={logo} alt="" className="size-12" />
    Doorway To Dignity
  </NavLink>
</div>


      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? 'text-teal-500' : 'text-teal-800')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar