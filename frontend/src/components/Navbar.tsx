import { NavLink } from 'react-router-dom'


function Navbar () {

    <NavLink to={link.to} className={({ isActive }) => (isActive ? 'text-teal-500' : 'text-beige')}>
  {link.label}
</NavLink>

    return(
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="menu menu-horizontal px-1">
            
  <li><Link to="/">Home</Link></li>
  <li><Link to="/faq">FAQ</Link></li>
  <li><Link to="/contact">Contact us</Link></li>
</ul>

        </details>
      </li>
    </ul>
  </div>
</div>
</div>
    )
}

export default Navbar