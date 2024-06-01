"use client";
import { useEffect, useState } from "react";
import { UserServices } from "@/lib/services/UserServices";
import { TUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

const userServices = new UserServices();

const AdminNavbar = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const getUserData = async () => {
    try {
      const response = await userServices.getUser();
      const userData = await response.data?.user;
      setUser(userData);
    } catch (error: any) {
      console.error(error.response?.data?.error);
      setError(`Não foi possível carregar os dados do usuário: ${error}`);
    }
  };

  const onLogout = async () => {
    try {
      await userServices.logout();

      router.push("/");
    } catch (error: any) {
      console.log(error);
      setError(`Não foi possível fazer o logout: ${error}`);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="user-details">
          <h2 className="section-title">
            Boas-vindas,
            <span className="username"> {user?.username}</span>
          </h2>
        </div>
        <div className="options">
          <Link href="/admin/carros/novo-carro">Cadastrar novo carro</Link>
          <button type="button" className="logout-button" onClick={onLogout}>
            Sair
          </button>
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>
    </nav>
  );
};

export default AdminNavbar;
