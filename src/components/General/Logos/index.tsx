import Image from "next/image";
import whiteLogo from "@/assets/img/logo-white.svg";
import blackLogo from "@/assets/img/logo-black.svg";

export const WhiteLogo = () => {
  return <Image className="white-logo" src={whiteLogo} alt="Logo NEXTCar" />;
};

export const BlackLogo = () => {
  return <Image className="black-logo" src={blackLogo} alt="Logo NEXTCar" />;
};
