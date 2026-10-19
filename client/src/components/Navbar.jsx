import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({setMenuOpened, containerStyles}) => {
  const navLinks = [
    {path: "/", title: "Home"},
    {path: "/listing", title: "Listing"},
    {path: "/about", title: "About"},
    {path: "/blog", title: "Blog"},
    {path: "/contact", title: "Contact"},
  ]

  return (
    <nav className={containerStyles}>
      {navLinks.map((link)=>(
        <NavLink onClick={()=>{setMenuOpened(false); scrollTo(0,0)}}
        key={link.title}
        to={link.path}
        className={({isActive})=> `${isActive ? "active-link" : ""} px-4 py-2 rounded-full uppercase text-[13px] font-bold tracking-wide hover:text-solid transition`}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar