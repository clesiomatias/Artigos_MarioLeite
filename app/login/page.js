"use client";
import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios"; // Importando Axios
import "../globals.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Limpa qualquer mensagem de erro anterior

    const url = "https://marleite.pythonanywhere.com/login";

    try {
      const response = await axios.post(
        url,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do servidor:", response.data); // Log para depuração

      if (response.status === 200) {
        const token = response.data.token; // Supondo que o token seja retornado assim

        // Armazena o token no localStorage (ou sessionStorage)
        localStorage.setItem("authToken", token);
        console.log("Token armazenado:", localStorage.getItem("authToken")); // Log para depuração

        window.location.href = "/upload_form"; // redirecionar após login bem-sucedido
      } else {
        setErrorMessage("Erro no login. Usuário ou senha inválido!");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <NavBar />

      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/favicon.png"
              width="64"
              height="64"
              alt="Company Logo"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
              Entre em sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="user-name" className="sr-only">
                  Usuário
                </label>
                <Input
                  id="user-name"
                  name="username"
                  type="text"
                  required
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p> // Exibindo a mensagem de erro
            )}

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
