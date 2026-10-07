import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/figma/logo.png";
import userIcon from "../assets/icons/user.svg";
import menuIcon from "../assets/icons/menu.svg";
import closeIcon from "../assets/icons/x-circle.svg";
import Icon from "./Icon";

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


function Navbar() {

    const [open, setOpen] = useState(false);

useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="navbar h-[72px] border-b-[3px] border-primary-topaz-blue-500 bg-topaz-blue-700 px-6 shadow-[0_6px_16.9px_rgba(0,0,0,0.25)] md:px-[72px]">
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-3 md:gap-8">
          <img src={logo} alt="" className="size-[52px]" />
          <span className="text-[16px] font-semibold text-topaz-blue-400 md:text-[18px]">
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
                  `block border-b pb-1 text-[15px]/[20px] font-semibold uppercase transition-colors hover:border-primary-topaz-blue-500 hover:text-primary-topaz-blue-500 ${
                    isActive
                      ? "border-primary-topaz-blue-500 text-primary-topaz-blue-500"
                      : "border-soft-amber-100 text-soft-amber-100"
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
            `block transition-colors hover:text-primary-topaz-blue-500 ${isActive ? "text-primary-topaz-blue-500" : "text-soft-amber-100"}`
          }
        >
          <Icon src={userIcon} className="size-7" />
        </NavLink>

         
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="btn btn-ghost btn-square text-soft-amber-100 hover:bg-topaz-blue-800 lg:hidden"
        >
          <Icon src={menuIcon} className="size-7" />
        </button>

      </div>
            
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-topaz-blue-800 lg:hidden">
         
          <div className="flex items-center justify-between border-b border-topaz-blue-700 px-4 py-4">
            <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img src={logo} alt="" className="size-12" />
              <span className="text-[18px] font-semibold text-cream">Doorway To Dignity</span>
            </NavLink>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center text-cream transition-colors hover:text-primary-topaz-blue-500"
            >
              <Icon src={closeIcon} className="size-8" />
            </button>
          </div>

          
          <ul className="flex flex-col gap-2 px-4 py-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center justify-between rounded-[14px] px-5 py-4 text-[20px] font-semibold uppercase tracking-wide text-cream ${
                      isActive
                        ? "bg-topaz-blue-700 before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary-topaz-blue-500"
                        : ""
                    }`
                  }
                >
                  {link.label}
                  <span aria-hidden="true" className="text-soft-amber-100/70">›</span>
                </NavLink>
              </li>
            ))}
          </ul>

         
          <div className="mt-auto flex flex-col gap-3 px-4 pb-6">
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 rounded-[14px] border border-cream/30 px-5 py-4 text-[17px] font-semibold text-cream"
            >
              <Icon src={userIcon} className="size-6" />
              <span className="flex-1">My account</span>
              <span aria-hidden="true">›</span>
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setOpen(false)}
              className="rounded-[14px] bg-primary-topaz-blue-500 py-4 text-center text-[17px] font-semibold text-topaz-blue-800"
            >
              Become a volunteer
            </NavLink>
          </div>
        </div>
      )}

    </div>
  );
}

export default Navbar;
