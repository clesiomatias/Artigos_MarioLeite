"use client";
import NavBar from "@/src/components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

const DownloadItems = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para carregar arquivos com botões de download
  const loadFilesWithDownloadButtons = async () => {
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

  useEffect(() => {
    loadFilesWithDownloadButtons();
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
            Arquivos Disponíveis para Download
          </h2>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <div className="files-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.id}
                  className="file-item p-4 border rounded-md flex flex-col items-center"
                >
                  <span className="font-medium mb-2">{file.filename}</span>
                  <a
                    href={`https://marleite.pythonanywhere.com/download/${file.id}`}
                    className="text-blue-500 underline mb-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Baixar
                  </a>
                  <button
                    className="bg-cyan-900 text-white rounded-md py-2 px-4"
                    onClick={() =>
                      window.open(
                        `https://marleite.pythonanywhere.com/download/${file.id}`,
                        "_blank"
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center w-full">Nenhum arquivo disponível.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full py-4 bg-gray-800 text-center text-white">
        <h4 className="dev">
          © {new Date().getFullYear()} - Developed by @clesiofmatias
        </h4>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://clesiomatias-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-code text-white"></i>
          </a>
          <a href="https://www.facebook.com/clesio.matias.583" target="_blank">
            <i className="fab fa-facebook text-white"></i>
          </a>
          <a href="https://www.instagram.com/clesiomatias/" target="_blank">
            <i className="fab fa-instagram text-white"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/cl%C3%A9sio-matias-0533011a2/"
            target="_blank"
          >
            <i className="fab fa-linkedin text-white"></i>
          </a>
          <a href="https://github.com/clesiomatias" target="_blank">
            <i className="fab fa-github text-white"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default DownloadItems;
