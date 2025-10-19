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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando busca de dados...');
        const names = await getPosts();
        console.log('Posts encontrados:', names?.length || 0, 'itens');
        setPostNames(names || []);
        
        try {
          console.log('Buscando último post...');
          const lastPostInfo = await lastPost();
          console.log('Resposta lastPost():', lastPostInfo);
          console.log('firstName:', lastPostInfo?.firstName);
          console.log('firstUrl:', lastPostInfo?.firstUrl);
          console.log('firstDate:', lastPostInfo?.firstDate);
          
          if (lastPostInfo && lastPostInfo.firstName) {
            console.log('Definindo lastPostData com dados válidos');
            setLastPostData(lastPostInfo);
          } else {
            console.log('lastPost retornou dados inválidos, usando fallback com dados de exemplo');
            // Fallback com dados de exemplo do primeiro arquivo da lista
            if (names && names.length > 0) {
              setLastPostData({
                firstName: names[0],
                firstUrl: `https://github.com/ProfMLE/Rep01/blob/master/${names[0]}`,
                firstDate: new Date().toLocaleDateString('pt-BR')
              });
            } else {
              setLastPostData({ firstName: "", firstUrl: "", firstDate: '' });
            }
          }
        } catch (lastPostError) {
          console.error('Erro ao buscar último post:', lastPostError);
          // Fallback: usar o primeiro arquivo da lista se houver erro
          if (names && names.length > 0) {
            console.log('Usando primeiro arquivo como fallback:', names[0]);
            setLastPostData({
              firstName: names[0],
              firstUrl: `https://github.com/ProfMLE/Rep01/blob/master/${names[0]}`,
              firstDate: new Date().toLocaleDateString('pt-BR')
            });
          } else {
            setLastPostData({ firstName: "", firstUrl: "", firstDate: '' });
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError('Erro ao carregar os artigos. Verifique sua conexão com a internet.');
        setPostNames([]);
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
        {/* Hero Section - Última Postagem */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded-full w-48 mx-auto mb-4"></div>
                  <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-8"></div>
                  <div className="max-w-4xl mx-auto">
                    <div className="h-64 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ) : (lastPostData?.firstName && lastPostData.firstName.trim() !== '') ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    ⭐ Última Postagem
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    Publicado em {lastPostData.firstDate || 'Data não disponível'}
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
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  📚 Biblioteca de Códigos
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Bem-vindo à Nossa Biblioteca
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Explore nossa coleção de códigos, artigos e materiais didáticos para acelerar seu aprendizado em programação.
                </p>
              </div>
            )}
          </div>
        </div>

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

          {/* Mensagem de Erro */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                <p className="text-red-100 font-semibold">⚠️ {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-red-500/30 hover:bg-red-500/50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

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
                      className="group transform transition-all duration-500 hover:scale-105 animate-fade-in"
                      style={{
                        animationDelay: `${index * 50}ms`
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
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
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