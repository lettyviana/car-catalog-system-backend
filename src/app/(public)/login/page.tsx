import Image from "next/image";
import LoginForm from "@/components/Login/LoginForm";

import image from "@/assets/img/hero-login-banner.jpg";

export default function Login() {
  return (
    <section className="login-container">
      <Image src={image} alt="Em busca do seu próximo carro." />
      <LoginForm />
    </section>
  );
}
