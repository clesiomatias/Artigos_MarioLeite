"use client";
import NavBar from "@/src/components/NavBar";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import "../globals.css";
import { useState, useEffect } from "react";
import { getPosts, lastPost } from "@/src/services/api";

const Codes = () => {
  const [postNames, setPostNames] = useState([]);
  const [lastPostData, setLastPostData] = useState({
    firstName: "",
    firstUrl: "",
    firstDate: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [names, lastPostInfo] = await Promise.all([
          getPosts(),
          lastPost()
        ]);
        setPostNames(names);
        setLastPostData(lastPostInfo || { firstName: "", firstUrl: "", firstDate: '' });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    switch (ext) {
      case 'pdf': return '📄';
      case 'docx': case 'doc': return '📝';
      case 'txt': return '📃';
      case 'py': return '🐍';
      case 'js': return '🟨';
      case 'html': return '🌐';
      default: return '📋';
    }
  };

  const filteredPosts = postNames.filter(name => {
    const ext = getFileExtension(name);
    if (filter === 'pdf') return ext === 'pdf';
    if (filter === 'docx') return ['docx', 'doc'].includes(ext);
    if (filter === 'code') return ['py', 'js', 'html', 'css', 'cpp', 'c', 'java'].includes(ext);
    return true;
  });

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <Card className="h-[180px] bg-white/90">
        <CardHeader className="pb-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </CardHeader>
        <CardBody className="pt-2">
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
        {/* Hero Section - Artigo em Destaque */}
        {lastPostData.firstName && (
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  ⭐ Artigo em Destaque
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Publicado em {lastPostData.firstDate}
                </h1>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <div className="flex items-center gap-4 w-full">
                      <div className="text-4xl">{getFileIcon(lastPostData.firstName)}</div>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold">
                          {lastPostData.firstName.split(".").shift()}
                        </h2>
                        <p className="text-indigo-100 mt-1">
                          Arquivo: {lastPostData.firstName}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-6">
                    <a
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      href={lastPostData.firstUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>🔗</span>
                      Ver no GitHub
                    </a>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Seção Principal - Todos os Artigos */}
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Biblioteca de Códigos
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Explore nossa coleção de artigos, códigos e materiais didáticos
            </p>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'all'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Todos ({postNames.length})
              </button>
              <button
                onClick={() => setFilter('pdf')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'pdf'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                📄 PDFs ({postNames.filter(name => getFileExtension(name) === 'pdf').length})
              </button>
              <button
                onClick={() => setFilter('docx')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'docx'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                📝 Word ({postNames.filter(name => ['docx', 'doc'].includes(getFileExtension(name))).length})
              </button>
              <button
                onClick={() => setFilter('code')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'code'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                💻 Códigos ({postNames.filter(name => ['py', 'js', 'html', 'css', 'cpp', 'c', 'java'].includes(getFileExtension(name))).length})
              </button>
            </div>
          </div>

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredPosts.map((name, index) => {
                  const cleanName = name.split(".").shift();
                  const fileExtension = getFileExtension(name);
                  const fileIcon = getFileIcon(name);
                  
                  return (
                    <div
                      key={index}
                      className="group transform transition-all duration-500 hover:scale-105"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isLoading ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <Card className="h-full bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                        <CardHeader className="pb-2 pt-4 px-4">
                          <div className="flex items-center gap-3 w-full">
                            <div className="text-2xl">{fileIcon}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2 leading-tight">
                                {cleanName}
                              </h3>
                              <span className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${
                                fileExtension === 'pdf' ? 'bg-red-100 text-red-700' :
                                ['docx', 'doc'].includes(fileExtension) ? 'bg-blue-100 text-blue-700' :
                                ['py', 'js', 'html'].includes(fileExtension) ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                .{fileExtension}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardBody className="pt-2 px-4">
                          <p className="text-xs text-gray-600 mb-4">
                            Arquivo: {name}
                          </p>
                        </CardBody>
                        
                        <CardFooter className="pt-0 px-4 pb-4">
                          <a
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                            href={`https://github.com/ProfMLE/Rep01/blob/master/${name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>🔗</span>
                            Ver no GitHub
                          </a>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })
            }
          </div>

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <p className="text-white text-xl mb-2">Nenhum arquivo encontrado</p>
              <p className="text-white/70">Tente alterar os filtros de busca</p>
            </div>
          )}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Codes;