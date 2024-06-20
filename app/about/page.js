"use client";

import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeSquare,  
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

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
      <div className="w-full flex flex-col p-10 items-center justify-center bg-cyan-600 mt-1">
        <h1 className="w-4/5 h-8 mb-3 p1 rounded text-white text-center md:text-3xl sm:text-2xl font-bold bg-cyan-900">
          Contatos
        </h1>
        <div className="flex text-white items-center justify-center rounded border-2 border-cyan-400 w-full min-h-30">
          <div className="flex gap-10">
            <a
              className="flex gap-5 items-center justify-center"
              href="mailto:marleite@gmail.com?"
              target="__blank"
              subject="subject text"
            >
              <FontAwesomeIcon icon={faEnvelopeSquare} />
              <h1>Email</h1>
            </a>

            <a
              className="flex gap-5 items-center justify-center"
              href="https://wa.me/+554491444779"
              target="_blank"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <h1 >Whatsapp</h1>
            </a>
          
            <a
              className="flex gap-5 items-center justify-center"
              href="https://www.linkedin.com/in/mario-leite-67898923/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <h1 >Linkedin</h1>
            </a>

            <a
               className="flex gap-5 items-center justify-center"             
               href="https://www.instagram.com/marioleite2020/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
              <h1>Instagram</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
