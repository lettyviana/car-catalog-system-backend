"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import appStoreBanner from "@/assets/img/app-store.svg";
import googlePlayBanner from "@/assets/img/google-play.svg";
import reclameAquiBanner from "@/assets/img/claim-here.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { BlackLogo, WhiteLogo } from "../General/Logos";

const Footer = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isPublicPage = pathname !== "/login" && "/admin";

  return (
    <>
      {isLoginPage && (
        <footer className="login-footer-container">
          <div className="container">
            <div className="login-logo-copyright-container">
              <div className="login-logo-container">
                <BlackLogo />
              </div>
              <span>Copyright © 2024 NEXTCar Todos os direitos reservados</span>
            </div>
            <div className="login-footer-links">
              <Link href="#">Política de Privacidade</Link> ·{" "}
              <Link href="#">Termos e Condições</Link>
            </div>
          </div>
        </footer>
      )}
      {isPublicPage && (
        <footer className="footer-container">
          <div className="main-container">
            <div className="logo-container">
              <WhiteLogo />
            </div>
            <div className="footer-menu-container">
              <ul className="footer-menu">
                <li className="footer-menu-list">
                  <Link href="#">Comprar carro</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Vender carro</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">App NEXTCar</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Onde estamos</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Perguntas frequentes</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Blog</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Guia de preços</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Carreiras</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Contato</Link>
                </li>
                <li className="footer-menu-list">
                  <Link href="#">Imprensa</Link>
                </li>
                <li className="footer-menu-span">
                  <span>BR </span>
                  <span>Brasil</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="media-container">
            <div className="social-media-container">
              <Link className="media-link" href="#">
                <FaFacebookF />
              </Link>
              <Link className="media-link" href="#">
                <FaInstagram />
              </Link>
              <Link className="media-link" href="#">
                <FaYoutube />
              </Link>
              <Link className="media-link" href="#">
                <FaLinkedinIn />
              </Link>
              <Link className="media-link" href="#">
                <FaTiktok />
              </Link>
            </div>
            <div className="other-media">
              <Link className="other-media-link" href="#">
                <Image src={appStoreBanner} alt="App Store" />
              </Link>
              <Link className="other-media-link" href="#">
                <Image src={googlePlayBanner} alt="Google Play" />
              </Link>
              <Link className="other-media-link" href="#">
                <Image src={reclameAquiBanner} alt="Reclame aqui" />
              </Link>
            </div>
          </div>
          <div className="copyright-text-container">
            <p>
              Copyright © 2022 KAVAK. Todos os direitos reservados.
              <span>
                {" "}
                <span>·</span> <Link href="#">Política de Privacidade</Link>
              </span>
              <span>
                {" "}
                <span>·</span> <Link href="#">Termos e Condições</Link>
              </span>
              <span>
                {" "}
                <span>·</span> <button>Definições de cookies</button>
              </span>
              <span>
                {" "}
                <span>·</span> <Link href="#">Transparência</Link>
              </span>
            </p>
            <p>
              NEXTCar COMERCIO DE VEICULOS LTDA., inscrita no CNPJ sob o nº
              00.000.000/0000-00, com sede na Rua 123, nº 345, Bairro Tal,
              Cidade/Estado, CEP 00.000-000
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
