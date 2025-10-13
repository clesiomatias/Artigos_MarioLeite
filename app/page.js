"use client";
import NavBar from "@/src/components/NavBar";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      id: "codes",
      title: "Textos e Códigos",
      description: "Explore nossa biblioteca de artigos, códigos e materiais didáticos atualizados semanalmente",
      href: "/codes",
      icon: "💻",
      gradient: "from-purple-600 via-blue-600 to-indigo-700",
      stats: "50+ Artigos"
    },
    {
      id: "books",
      title: "Biblioteca Digital",
      description: "Descubra nossa coleção completa de livros sobre programação e tecnologia",
      href: "/books",
      icon: "📚",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      stats: "14 Livros Publicados"
    },
    {
      id: "courses",
      title: "Minicursos",
      description: "Aprenda com nossos cursos especializados em programação e desenvolvimento",
      href: "/courses",
      icon: "🎓",
      gradient: "from-cyan-400 via-teal-500 to-blue-600",
      stats: "3 Cursos Disponíveis"
    },
    {
      id: "downloads",
      title: "Centro de Downloads",
      description: "Acesse materiais complementares, códigos de exemplo e recursos educacionais",
      href: "/download_items",
      icon: "📥",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      stats: "Material Gratuito"
    },
    {
      id: "about",
      title: "Sobre o Professor",
      description: "Conheça a trajetória acadêmica e profissional do Prof. Mário Leite",
      href: "/about",
      icon: "👨‍🏫",
      gradient: "from-slate-700 via-blue-800 to-indigo-900",
      stats: "30+ Anos de Experiência"
    }
  ];

  const SkeletonSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 animate-pulse">
      <div className="text-center space-y-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <NavBar />
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonSection key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <NavBar />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8 max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                Prof. Mário Leite
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 font-light">
                Educação em Programação e Tecnologia
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                🎓 Mestre em Engenharia
              </span>
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                📚 14 Livros Publicados
              </span>
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                👨‍🏫 30+ Anos de Experiência
              </span>
            </div>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Bem-vindo ao portal educacional do Prof. Mário Leite. Aqui você encontra uma vasta 
              coleção de recursos para aprender programação, desde conceitos básicos até técnicas avançadas, 
              com uma abordagem prática e didática desenvolvida ao longo de décadas de ensino.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  📚 Explorar Livros
                </button>
              </Link>
              <Link href="/codes">
                <button className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  💻 Ver Códigos
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Navigation Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`min-h-screen bg-gradient-to-br ${section.gradient} relative overflow-hidden`}
          style={{
            animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
            <div className="text-center space-y-8 max-w-4xl">
              <div className="text-8xl mb-6 animate-pulse">
                {section.icon}
              </div>
              
              <div className="space-y-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {section.stats}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {section.title}
                </h2>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {section.description}
                </p>
              </div>

              <Link href={section.href}>
                <button className="group bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-xl">
                  <span className="flex items-center gap-2">
                    Explorar {section.title}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para começar sua jornada?
            </h3>
            <p className="text-xl text-blue-200">
              Junte-se a milhares de estudantes que já transformaram suas carreiras 
              com nossos materiais educacionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  Começar Agora
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  Conhecer o Professor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}