"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import { BlackLogo } from "../General/Logos";

const Header = () => {
  return (
    <header className="header">
      <Link className="logo-container" href="/">
        <BlackLogo />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
