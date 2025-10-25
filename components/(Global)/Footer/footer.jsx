"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import play from '../../../assets/others/android.png'
import ios from '../../../assets/others/ios.png'
const Footer = () => {
  // 🔹 Footer menu arrays
  const topLinks = [
    { name: "Download Now", href: "#" },
    { name: "License", href: "#" },
  ];

  const menuLinks = [
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Help", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#0B0C14] text-gray-400 py-10 xl:py-14 px-6 md:px-16 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* ===== Left Section ===== */}
        <div className="flex flex-col space-y-4">
          {/* Top Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Menu Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-lg font-bold text-gray-200 mt-4">
            © 2020 bike. All rights reserved
          </p>
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm text-white font-medium">Get the App</h3>
          <div className="">
            {/* Replace these with your actual image paths */}
           
              <Image
                src={play}
                alt="Download on the App Store"
                width={140}
                height={40}
                className="cursor-pointer hover:opacity-90 transition-opacity py-3"
              />
       
         
              <Image
                src={ios}
                alt="Get it on Google Play"
                width={140}
                height={40}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
