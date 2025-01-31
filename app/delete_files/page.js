"use client";
import NavBar from "@/src/components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

const DeleteFiles = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função para carregar arquivos
  const loadFiles = async () => {
    try {
      const response = await axios.get(
        "https://marleite.pythonanywhere.com/files"
      );
      setFiles(response.data);
    } catch (error) {
      setErrorMessage("Erro ao carregar os arquivos!");
      console.error("Erro ao carregar arquivos:", error);
    }
  };

  // Função para deletar um arquivo
  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este arquivo?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setErrorMessage("Token de autenticação não encontrado.");
          return;
        }

        const response = await axios.delete(
          `https://marleite.pythonanywhere.com/delete/${fileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Arquivo excluído com sucesso!");
          loadFiles(); // Recarrega a lista de arquivos após a exclusão
        } else {
          setErrorMessage("Erro ao excluir o arquivo.");
        }
      } catch (error) {
        setErrorMessage("Erro ao conectar com o servidor.");
        console.error("Erro ao excluir arquivo:", error);
      }
    }
  };

  // Carrega os arquivos ao montar a página
  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full h-full min-h-screen flex flex-col p-10 items-center justify-start bg-cyan-400 mt-1">
        <div className="w-full flex justify-end items-center mb-4">
          <button className="rounded-md bg-cyan-900 shadow-xs text-white p-3">
            <Link href="/login">Uploads</Link>
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-5 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-5 text-center">
            Arquivos Disponíveis para Exclusão
          </h2>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}

          <div className="files-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.id}
                  className="file-item p-4 border rounded-md flex flex-col items-center"
                >
                  <span className="font-medium mb-2">{file.filename}</span>
                  <button
                    className="bg-red-500 text-white rounded-md py-2 px-4"
                    onClick={() => handleDelete(file.id)}
                  >
                    Excluir
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center w-full">Nenhum arquivo disponível.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFiles;
