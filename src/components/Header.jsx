import React from "react";
import logo from "../assets/lws-logo-en.svg"; // If you're using this later

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#191D26] z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6 py-6 md:py-8 px-4">
        <a href="/">
          <h1 className="text-2xl font-bold text-white">Tasker</h1>
        </a>
      </div>
    </nav>
  );
};

export default Header;
