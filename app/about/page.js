"use client";

import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import "../globals.css";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full h-full flex flex-col p-10 items-center justify-center bg-cyan-400 mt-1">
        <h1 className="w-4/5 h-8 mb-3 p1  rounded text-white text-center md:text-3xl sm:text-2xl text-bold bg-cyan-900 ">
          Sobre Prof. Mário Leite
        </h1>
        <Image
          className="rounded-full sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] block md:block"
          src="https://avatars.githubusercontent.com/u/42276767?v=4"
          alt="Foto de perfil, Prof. Mário Leite"
          width={100}
          height={100}
          quality={75}
        />

        <p className="rounded text-justify p-1 text-cyan-900 text-bold mt-5">
          Cristão, é natural de Tombos (MG).
          <br />
          Estudou física durante dois anos no Instituto de Física da UFRJ.{" "}
          <br />
          Foi aluno de Iniciação Científica no Centro Brasileiro de Pesquisas
          Físicas (CBPF) e do CNPq, no Rio de Janeiro. <br />É graduado e
          pós-graduado em engenharia pela Pontifícia Universidade Católica do
          Rio de Janeiro (PUC/RJ), onde foi professor auxiliar de ensino e
          pesquisa no Departamento de Ciências dos Materiais e Metalurgia.{" "}
          <br />É especialista em Análise de Sistemas pelo Centro Universitário
          de Maringá (UniCesumar) e mestre em Engenharia de Produção pela
          Universidade Federal de Santa Catarina (UFSC). <br />
          Trabalhou na Indústria e Comércio de Minérios (ICOMI) no estado do
          Amapá como engenheiro de pesquisas, desenvolvendo aplicações para o
          setor de produção. <br />
          Foi chefe do Setor de Informações Gerenciais da Mineração Caraíba S.A
          (BA), ministrando cursos de técnicas de programação para os
          engenheiros da empresa e desenvolvendo aplicações para os setores de
          produção e manutenção. Nesta empresa participou do projeto “Mecânica
          das Rochas”, com consultores chilenos na implantação do sistema de
          escavação da mina subterrânea na adaptação do software de elementos
          finitos para microcomputadores. <br />
          Foi professor-tutor de Algoritmos e Linguagens de Programação da
          Universidade de Uberaba. <br />
          Foi professor de Técnicas de Programação do Centro Universitário
          Maringá (UniCesumar/PR). <br />
          Foi professor de Algoritmos e Linguagens de Programação do CESUFOZ/PR.
          <br />
          Foi professor de Técnicas de Programação da Universidade União das
          Américas (UNIAMERICA) em Foz do Iguaçu/PR. <br />É autor de vários
          livros sobre Lógica e Técnicas de Programação.
        </p>
      </div>
    </div>
  );
};
export default About;
