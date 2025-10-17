import React from "react";
import Image from "next/image";
import logo from '../../../../assets/logo/logo-go.png'
import NavItem from "../NavItem/NavItem";
const NavBar = () => {
  return (
    <nav className="py-6 container mx-auto flex items-center justify-between dark:bg-primary">
      <div className="logo ">
        <Image
          src={logo}
          width={300}
          height={500}
          alt="Picture of the site logo"
        ></Image>
      </div>
      {/* theme and nav menu */}
      <div>
        <NavItem></NavItem>
      </div>
    </nav>
  );
};

export default NavBar;
