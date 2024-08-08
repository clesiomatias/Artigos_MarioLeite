"use client";
import NavBar from "@/src/components/NavBar";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavBar />
      <section
        id="codes"
        className="text-white h-screen bg-cyan-600  text-center flex"
      >
        <h1 className="text-3xl md:text-8xl m-auto font-waterfall text-7xl text-white font-bold flex flex-col items-center space-y-2.5">
          <Link href={"/codes"}>Textos e Códigos</Link>
          <p className="text-center font-semibold text-lg md:textbase sm:text-sm">
            Aqui você pode acompanhar os textos e códigos lançados semanalmente!
          </p>
        </h1>
      </section>

      <section id="books" className=" text-cyan-900 h-screen bg-sky-300 flex">
        <h1 className="text-3xl md:text-8xl m-auto font-waterfall text-7xl text-cyan-900 font-bold flex flex-col items-center space-y-2.5">
          <Link href={"/books"}>Livros</Link>
          <p className="text-center font-semibold text-lg md:textbase sm:text-sm">
            Confira os livros já lançados
          </p>
        </h1>
      </section>

      <section
        id="courses"
        className=" text-white h-screen bg-cyan-600  text-center flex"
      >
        <h1 className="text-3xl md:text-8xl m-auto font-waterfall text-7xl text-cwhite font-bold flex flex-col items-center space-y-2.5">
          <Link href={"/courses"}>Minicursos</Link>
          <p className="text-center font-semibold text-lg md:textbase sm:text-sm">
            Tenha acesso a minicursos e aulas, aumentando seu conhecimento!
          </p>
        </h1>
      </section>

      <section
        id="download_items"        
        className="text-cyan-900 h-screen bg-sky-300 flex">
        <h1 className="text-3xl md:text-8xl m-auto font-waterfall text-7xl  text-cyan-900  font-bold  flex flex-col items-center space-y-2.5">
          <Link href={"/download_items"}>Arquivos para baixar</Link>
          <p className="text-center font-semibold text-lg md:textbase sm:text-sm">
            O Prof. Mário Leite disponibiliza para baixar diversos arquivos como
            material de estudo e complemento dos cursos e outros!
          </p>
        </h1>
      </section>
      <section id="about" 
      className=" text-white h-screen bg-cyan-600 flex"
      >
        <h1 className="text-3xl md:text-8xl m-auto font-waterfall text-7xl text-white font-bold flex flex-col items-center space-y-2.5 ">
          <Link href={"/about"}>Sobre</Link>
          <p className="text-center font-semibold text-lg md:textbase sm:text-sm">
            Conheça um pouco da história do Prof. Mário Leite.
          </p>
        </h1>
      </section>
    </div>
  );
}
