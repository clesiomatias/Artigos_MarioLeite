"use client";
import NavBar from "@/src/components/NavBar";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios";
import "../globals.css";

const UploadForm = () => {
  const [file, setFile] = useState(null); // Estado para armazenar o arquivo
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função que será chamada ao submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      setErrorMessage("Selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Adiciona o arquivo ao FormData
    formData.append("uploader", "nome_do_uploader"); // Adiciona o campo uploader

    const url = "https://marleite.pythonanywhere.com/upload";

    try {
      // Recupere o token do localStorage
      const token = localStorage.getItem("authToken");
     

      // Verifique se o token está presente
      if (!token) {
        setErrorMessage("Token de autenticação não encontrado.");
        return;
      }

      // Envia a requisição com o token de autenticação no cabeçalho
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Arquivo enviado com sucesso!");
      } else {
        setErrorMessage("Erro ao fazer upload do arquivo.");
      }
    } catch (error) {
      console.error(
        "Erro:",
        error.response ? error.response.data : error.message
      );
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
              Upload de Arquivos
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="file-upload" className="sr-only">
                  Selecione o arquivo
                </label>
                <Input
                  id="file-upload"
                  name="file"
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])} // Define o arquivo no estado
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            {/* Mensagem de sucesso ou erro */}
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </Button>
            </div>
          </form>

          <div className="flex justify-between mt-4">
            <a
              href="/download_items"
              className="text-indigo-500 hover:underline"
            >
              Voltar aos arquivos
            </a>
            <a href="/delete_files" className="text-red-500 hover:underline">
              Apagar arquivos
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadForm;
