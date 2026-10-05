import { NavLink } from "react-router-dom";
import logo from "../assets/figma/logo.png";
import userIcon from "../assets/icons/user.svg";

//all the links on the navbar for now
//dash fubky??

const links = [
  { label: "Home", to: "/" },
  { label: "Contact us", to: "/contact" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "FAQ", to: "/faq" },
  { label: "Donate", to: "/donate" },
];

//array+map: no repetition
//easier to change
//reusable 


function closeMenu() {
  (document.activeElement as HTMLElement | null)?.blur();
}

function Navbar() {
  return (
    <div className="navbar h-[72px] border-b-[3px] border-teal-500 bg-teal-700 px-6 shadow-[0_6px_16.9px_rgba(0,0,0,0.25)] md:px-[72px]">
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-3 md:gap-8">
          <img src={logo} alt="" className="size-[52px]" />
          <span className="text-[16px] font-semibold text-teal-400 md:text-[18px]">
            Doorway To Dignity
          </span>
        </NavLink>
      </div>

      <div className="flex flex-none items-center gap-4">
        {/* desktop links: hidden below lg */}
        <ul className="hidden items-center gap-4 lg:flex">
          {/* links map goes through array one at a time
          runs function
          returns new array, one list item per item */}

          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                // end: "/" is only active on the homepage, not on every page
                //if not home would be seen as active on every page
                //tells navlink only to be active at exact match
                end={link.to === "/"}
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
        </ul>

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

        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open menu"
            className="btn btn-ghost btn-square text-beige hover:bg-teal-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-30 mt-3 w-56 rounded-box border border-teal-500 bg-teal-700 p-2 shadow-lg [--menu-active-bg:transparent] [--menu-active-fg:var(--color-teal-500)]"
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-[15px] font-semibold uppercase ${isActive ? "text-teal-500" : "text-beige"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
