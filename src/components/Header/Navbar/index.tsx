import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import brazilFlag from "@/assets/img/brazil-flag.svg";
import mexicoFlag from "@/assets/img/mexico-flag.svg";
import argentinaFlag from "@/assets/img/argentina-flag.svg";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="menu">
      <ul className="menu-container">
        <li className="menu-item">
          <Link className="menu-link" href="/">
            Comprar carro
          </Link>
        </li>
        <li className="menu-item">
          <Link className="menu-link" href="#">
            Vender carro
          </Link>
        </li>
        <li className="menu-item">
          <Link className="menu-link" href="#">
            App NextCar
          </Link>
        </li>
        <li className="menu-item">
          <button
            className={"menu-link about-links " + (active ? "active" : "")}
            onClick={handleClick}
          >
            <span>Sobre nós</span>
            {active ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
          <div className={"dropdown-menu " + (active ? "dropdown-open" : "")}>
            <Link className="menu-link" href="#">
              Onde estamos
            </Link>
            <Link className="menu-link" href="#">
              Guia de preços
            </Link>
            <Link className="menu-link" href="#">
              Blog
            </Link>
          </div>
        </li>
        <li className="menu-item">
          <button className="menu-link select-country">
            <span>País</span>
            <Image src={brazilFlag} alt="Selecione seu país" />
          </button>
          <div>{/* Modal */}</div>
        </li>
        <li className="menu-item">
          <Link className="menu-link" href="/login">
            <FaRegUserCircle />
            <span>Cadastre-se</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
