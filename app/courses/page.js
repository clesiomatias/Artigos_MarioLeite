"use client";
import NavBar from "@/src/components/NavBar";

import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
const Courses = () => {
  return (
    <>
      <NavBar />
      <div className="w-full h-full min-h-screen flex flex-col p-10 items-center justify-center bg-cyan-400 mt-1">
        <h1 className="text-2xl font-bold text-cyan-900">Minicursos</h1>

        <div className="flex p-10 items-center justify-center gap-10 md:flex-col sm:felx-col">
          <a href="https://github.com/ProfMLE/Rep02" target="_blank">
            <Card className="flex items-center">
              <CardHeader>
                <Image
                  alt="Imagem ícone do curso de Lógica de Programação"
                  className="object-cover rounded-xl"
                  src="/imgs/logica.png"
                  width={270}
                  height={270}
                />
              </CardHeader>
              <CardFooter className="flex items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 bg-white ">
                <h1 className="text-cyan-900 text-bold">
                  {" "}
                  Lógica de Programação
                </h1>
              </CardFooter>
            </Card>
          </a>
          <a href="https://github.com/ProfMLE/Rep004" target="_blank">
            <Card>
              <CardHeader>
                <Image
                  alt="Imagem ícone do curso de Lógica de Programação"
                  className="object-cover rounded-xl"
                  src="/imgs/banco de dados.png"
                  width={270}
                  height={270}
                />
              </CardHeader>
              <CardFooter className="flex items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 bg-white  ">
                <h1 className="text-cyan-900 text-bold"> Banco de Dados</h1>
              </CardFooter>
            </Card>
          </a>
          <a href="https://github.com/ProfMLE/Rep004" target="_blank">
            <Card>
              <CardHeader>
                <Image
                  alt="Imagem ícone do curso de Lógica de Programação"
                  className="object-cover rounded-xl"
                  src="/imgs/criptografia.png"
                  width={270}
                  height={270}
                />
              </CardHeader>
              <CardFooter className="flex items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 bg-white ">
                <h1 className="text-cyan-900 text-bold"> Criptografia</h1>
              </CardFooter>
            </Card>
          </a>
        </div>
      </div>
      ;
    </>
  );
};
export default Courses;
