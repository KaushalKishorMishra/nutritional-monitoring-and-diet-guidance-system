import React from "react";
import Logo from "/apple.svg";
import { useNavigate } from "react-router";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto flex items-center justify-between px-5 py-5 text-white">
      <img
        src={Logo}
        alt="App Logo"
        className="aspect-square w-10 object-contain"
      />
      <button
        className="btn btn-primary w-3/6 font-nunito-sans text-white md:w-2/12"
        onClick={() => navigate("/welcome")}
      >
        Let Get Started
      </button>
    </div>
  );
};

export default TopNav;
