import { NavLink } from "react-router-dom";
import logo from "../assets/figma/logo.png";
import userIcon from "../assets/icons/user.svg";

//all the links on the navbar for now 
//dashboard funky ????
const links = [
  { label: "Home", to: "/" },
  { label: "Contact us", to: "/contact" },
  { label: "Dashboard", to: "/VolunteerDashboard" },
  { label: "FAQ", to: "/FAQ"},
  { label: "Donate", to: "/Donate"}
];

//array+map: no repetition
//easier to change
//reusable

function Navbar() {
  return (
    <div className="navbar h-[72px] border-b-[3px] border-teal-500 bg-teal-700 px-6 shadow-[0_6px_16.9px_rgba(0,0,0,0.25)] md:px-[72px]">
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-8">
          <img src={logo} alt="" className="size-[52px]" />
          <span className="text-[18px] font-semibold text-teal-400">
            Doorway To Dignity
          </span>
        </NavLink>
      </div>

      <div className="flex-none">
        <ul className="flex items-center gap-4">

        {/* links map goes through array one at a time
        runs function
        returns new array, one list item per item */}

          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block border-b pb-1 text-[15px]/[20px] font-semibold uppercase transition-colors hover:border-teal-500 hover:text-teal-500 ${
                    isActive
                      ? "border-teal-500 text-teal-500"
                      : "border-beige text-beige"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/login"
              aria-label="Log in"
              className={({ isActive }) =>
                `block transition-colors hover:text-teal-500 ${isActive ? "text-teal-500" : "text-beige"}`
              }
            >
              <span
                aria-hidden="true"
                className="block size-7 bg-current"
                style={{
                  mask: `url("${userIcon}") center / contain no-repeat`,
                  WebkitMask: `url("${userIcon}") center / contain no-repeat`,
                }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
