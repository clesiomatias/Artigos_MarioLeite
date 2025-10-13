"use client";

import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeSquare,
  faGraduationCap,
  faBriefcase,
  faBook,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('bio');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const achievements = [
    {
      icon: faGraduationCap,
      title: "Formação Acadêmica",
      items: [
        "Mestre em Engenharia de Produção - UFSC",
        "Especialista em Análise de Sistemas - UniCesumar",
        "Graduado em Engenharia - PUC/RJ",
        "Estudos em Física - UFRJ"
      ]
    },
    {
      icon: faBriefcase,
      title: "Experiência Profissional",
      items: [
        "Professor em múltiplas universidades",
        "Engenheiro de Pesquisas - ICOMI",
        "Chefe do Setor de Informações - Mineração Caraíba",
        "Consultor em Técnicas de Programação"
      ]
    },
    {
      icon: faBook,
      title: "Publicações",
      items: [
        "Autor de 10+ livros sobre programação",
        "Especialista em Lógica de Programação",
        "Material didático reconhecido",
        "Obras traduzidas e reeditadas"
      ]
    },
    {
      icon: faAward,
      title: "Reconhecimentos",
      items: [
        "Professor-tutor reconhecido",
        "Pesquisador CNPq",
        "Consultor em projetos internacionais",
        "Referência em educação tecnológica"
      ]
    }
  ];

  const contactLinks = [
    {
      icon: faEnvelopeSquare,
      label: "Email",
      href: "mailto:marleite@gmail.com",
      color: "hover:text-red-400"
    },
    {
      icon: faWhatsapp,
      label: "WhatsApp",
      href: "https://wa.me/+554491444779",
      color: "hover:text-green-400"
    },
    {
      icon: faLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mario-leite-67898923/",
      color: "hover:text-blue-400"
    },
    {
      icon: faInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/marioleite2020/",
      color: "hover:text-pink-400"
    }
  ];

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-64 h-64 bg-gray-300 rounded-full"></div>
        <div className="h-8 bg-gray-300 rounded w-64"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="text-center space-y-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <Image
                    className="relative rounded-full border-4 border-white/20 shadow-2xl"
                    src="https://avatars.githubusercontent.com/u/42276767?v=4"
                    alt="Prof. Mário Leite"
                    width={250}
                    height={250}
                    quality={90}
                    priority
                  />
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    Prof. Mário Leite
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto">
                    Educador, Engenheiro e Autor especializado em Programação e Tecnologia
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm">
                      🎓 Mestre em Engenharia
                    </span>
                    <span className="bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm">
                      📚 Autor de 10+ Livros
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm">
                      👨‍🏫 Professor Universitário
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSection('bio')}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeSection === 'bio'
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  📖 Biografia
                </button>
                <button
                  onClick={() => setActiveSection('achievements')}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeSection === 'achievements'
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  🏆 Conquistas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 pb-20">
          {activeSection === 'bio' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Trajetória Profissional
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-blue-100 leading-relaxed text-justify mb-6">
                    Cristão, natural de Tombos (MG), o Prof. Mário Leite construiu uma carreira sólida 
                    na intersecção entre engenharia, tecnologia e educação. Sua jornada acadêmica começou 
                    com estudos em Física na UFRJ, onde desenvolveu o rigor científico que marcaria toda 
                    sua trajetória profissional.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">🎓 Formação Acadêmica</h3>
                      <p className="text-blue-200 text-sm">
                        Graduado e pós-graduado em Engenharia pela PUC/RJ, onde atuou como professor 
                        auxiliar. Especialista em Análise de Sistemas e Mestre em Engenharia de Produção pela UFSC.
                      </p>
                    </div>
                    
                    <div className="bg-indigo-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">🔬 Pesquisa Científica</h3>
                      <p className="text-indigo-200 text-sm">
                        Foi aluno de Iniciação Científica no CBPF e do CNPq, desenvolvendo pesquisas 
                        avançadas em física e engenharia de materiais.
                      </p>
                    </div>
                  </div>

                  <p className="text-blue-100 leading-relaxed text-justify mb-6">
                    Na indústria, trabalhou na ICOMI (Amapá) como engenheiro de pesquisas e foi chefe 
                    do Setor de Informações Gerenciais da Mineração Caraíba (BA), onde ministrou cursos 
                    de programação para engenheiros e participou de projetos internacionais com consultores chilenos.
                  </p>

                  <p className="text-blue-100 leading-relaxed text-justify">
                    Como educador, lecionou em diversas instituições renomadas, incluindo Universidade de Uberaba, 
                    UniCesumar, CESUFOZ e UNIAMERICA. É autor de diversos livros sobre Lógica e Técnicas de 
                    Programação, reconhecidos pela qualidade didática e abordagem prática.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'achievements' && (
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-500/30 rounded-full p-3">
                        <FontAwesomeIcon icon={achievement.icon} className="text-2xl text-blue-200" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {achievement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-blue-100">
                          <span className="text-blue-400 mt-1">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Entre em Contato
              </h2>
              <p className="text-blue-200 text-lg">
                Conecte-se para discussões sobre educação, tecnologia e programação
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {contactLinks.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${contact.color}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors duration-300">
                      <FontAwesomeIcon icon={contact.icon} className="text-2xl text-white" />
                    </div>
                    <span className="text-white font-semibold">{contact.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default About;