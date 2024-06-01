"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/General/FormInput";
import SubmitButton from "@/components/General/SubmitButton";
import { UserServices } from "@/lib/services/UserServices";

const userService = new UserServices();

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Continuar");
  const [disabled, setDisabled] = useState(true);
  const [focusedField, setFocusedField] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (userInfo.email && userInfo.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userInfo]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setButtonText("Por favor, aguarde...");

    try {
      await userService.login(userInfo);

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.error);
      setUserInfo({
        email: "",
        password: "",
      });
      setButtonText("Continuar");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form login-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Continue sua jornada! Faça login</h1>
      <p>Crie sua conta ou faça login para uma experiência personalizada.</p>
      <FormInput
        id="email"
        label="E-mail"
        name="email"
        autoComplete="on"
        type="text"
        placeholder=""
        value={userInfo.email}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField("")}
        onChange={onChange}
      />
      <FormInput
        id="password"
        label="Senha"
        name="password"
        autoComplete="on"
        type="password"
        placeholder=""
        value={userInfo.password}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField("")}
        onChange={onChange}
      />
      {loading && (
        <span className="loading-message">Por favor, aguarde...</span>
      )}
      {error && <span className="error-message">{error}</span>}
      <SubmitButton
        extraStyle={loading ? "loading" : ""}
        disabled={disabled || loading}
        buttonType="submit"
        buttonText={buttonText}
      />
    </form>
  );
};

export default LoginForm;
