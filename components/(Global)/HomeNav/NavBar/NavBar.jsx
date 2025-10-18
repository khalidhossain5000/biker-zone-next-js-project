import React from "react";
import Image from "next/image";
import logo from "../../../../assets/logo/logo-go.png";
import darklogo from "../../../../assets/logo/n-dark.png";
import NavItem from "../NavItem/NavItem";
import ResponsiveMenu from "../../ReponsiveSIdebarMenu/ResponsiveMenu";

const NavBar = () => {
  return (
    <nav className="sticky  top-0 py-6 container mx-auto flex items-center justify-between lg:pr-3 xl:pr-1">
      <div className="logo dark:hidden">
        <Image
          src={logo}
          width={300}
          height={500}
          className="w-46 lg:w-[300px]"
          alt="Picture of the site logo"
        ></Image>
      </div>

      {/* dark logo */}
      <div className="logo hidden dark:block">
        <Image
          src={darklogo}
          width={300}
          height={500}
          className="w-46 lg:w-[300px"
          alt="Picture of the site logo"
        ></Image>
      </div>
      {/* theme and nav menu */}
      <div className="hidden lg:block">
        <NavItem></NavItem>
      </div>

      {/* mobile responsive menu start here */}
      <ResponsiveMenu/>
    </nav>
  );
};

export default NavBar;
