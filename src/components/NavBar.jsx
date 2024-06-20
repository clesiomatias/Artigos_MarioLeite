import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const toggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <>
      <nav className="bg-black p-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  href="/"
                  className="lg:text-2xl text-white font-bold mr-5 md:text-md"
                >
                  Professor Mario Leite
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a
                  href="/about"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Sobre
                </a>
                <a
                  href="/books"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Livros
                </a>
                <a
                  href="/codes"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Códigos e Textos
                </a>
                <a
                  href="/courses"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Minicursos
                </a>
                <a
                  href="/download_items"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Arquivos para baixar
                </a>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
              >
                {navbar ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {navbar && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              
                <a
                  href="/about"
                  className="text-white block hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Sobre
                </a>
                <a
                  href="/books"
                  className="text-white block hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Livros
                </a>
                <a
                  href="/codes"
                  className="text-white block hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Códigos e Textos
                </a>
                <a
                  href="/courses"
                  className="text-white block hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Minicursos
                </a>
                <a
                  href="/download_items"
                  className="text-white block hover:bg-white hover:text-black px-3 py-2 rounded-lg"
                >
                  Arquivos para baixar
                </a>
              
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
