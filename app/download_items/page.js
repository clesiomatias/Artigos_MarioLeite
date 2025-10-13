"use client";
import NavBar from "@/src/components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

const DownloadItems = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [downloadingFiles, setDownloadingFiles] = useState(new Set());

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://marleite.pythonanywhere.com/files"
      );
      setFiles(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar os arquivos!");
      console.error("Erro ao carregar arquivos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
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
      case 'zip': case 'rar': return '📦';
      case 'py': return '🐍';
      case 'js': return '🟨';
      case 'html': return '🌐';
      case 'xlsx': case 'xls': return '📊';
      case 'pptx': case 'ppt': return '📊';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return '🖼️';
      default: return '📋';
    }
  };

  const getFileSize = (filename) => {
    // Simulação de tamanho - em produção viria da API
    const sizes = ['1.2 MB', '850 KB', '2.1 MB', '450 KB', '3.5 MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const handleDownload = async (fileId, filename) => {
    setDownloadingFiles(prev => new Set([...prev, fileId]));
    
    try {
      // Simula delay de download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(
        `https://marleite.pythonanywhere.com/download/${fileId}`,
        "_blank"
      );
    } catch (error) {
      console.error("Erro no download:", error);
    } finally {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const filteredFiles = files.filter(file => {
    const ext = getFileExtension(file.filename);
    if (filter === 'documents') return ['pdf', 'docx', 'doc', 'txt'].includes(ext);
    if (filter === 'code') return ['py', 'js', 'html', 'css', 'cpp', 'c', 'java'].includes(ext);
    if (filter === 'archives') return ['zip', 'rar', '7z'].includes(ext);
    return true;
  });

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="bg-white/90 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📥 Centro de Downloads
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Arquivos para Download
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Acesse materiais didáticos, códigos de exemplo e recursos complementares 
              disponibilizados pelo Prof. Mário Leite
            </p>
            
            {/* Admin Button */}
            <div className="flex justify-center mb-8">
              <Link href="/login">
                <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🔐 Área Administrativa
                </button>
              </Link>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'all'
                    ? 'bg-white text-emerald-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Todos ({files.length})
              </button>
              <button
                onClick={() => setFilter('documents')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'documents'
                    ? 'bg-white text-emerald-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                📄 Documentos ({files.filter(f => ['pdf', 'docx', 'doc', 'txt'].includes(getFileExtension(f.filename))).length})
              </button>
              <button
                onClick={() => setFilter('code')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'code'
                    ? 'bg-white text-emerald-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                💻 Códigos ({files.filter(f => ['py', 'js', 'html', 'css', 'cpp', 'c', 'java'].includes(getFileExtension(f.filename))).length})
              </button>
              <button
                onClick={() => setFilter('archives')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'archives'
                    ? 'bg-white text-emerald-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                📦 Arquivos ({files.filter(f => ['zip', 'rar', '7z'].includes(getFileExtension(f.filename))).length})
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                <p className="text-red-100 font-semibold">⚠️ {errorMessage}</p>
                <button 
                  onClick={loadFiles}
                  className="mt-2 bg-red-500/30 hover:bg-red-500/50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredFiles.length > 0 
                ? filteredFiles.map((file, index) => {
                    const fileExtension = getFileExtension(file.filename);
                    const fileIcon = getFileIcon(file.filename);
                    const isDownloading = downloadingFiles.has(file.id);
                    
                    return (
                      <div
                        key={file.id}
                        className="group transform transition-all duration-500 hover:scale-105"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: isLoading ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 h-full">
                          {/* File Header */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center">
                              {fileIcon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">
                                {file.filename}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  fileExtension === 'pdf' ? 'bg-red-100 text-red-700' :
                                  ['docx', 'doc'].includes(fileExtension) ? 'bg-blue-100 text-blue-700' :
                                  ['py', 'js', 'html'].includes(fileExtension) ? 'bg-green-100 text-green-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  .{fileExtension}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {getFileSize(file.filename)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* File Info */}
                          <div className="mb-4">
                            <p className="text-xs text-gray-600 mb-2">
                              Enviado por: <span className="font-semibold">{file.uploader}</span>
                            </p>
                          </div>

                          {/* Download Button */}
                          <button
                            onClick={() => handleDownload(file.id, file.filename)}
                            disabled={isDownloading}
                            className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm ${
                              isDownloading 
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105'
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Baixando...
                              </>
                            ) : (
                              <>
                                <span>📥</span>
                                Download
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                : !isLoading && (
                    <div className="col-span-full text-center py-16">
                      <div className="text-6xl mb-4">📂</div>
                      <p className="text-white text-xl mb-2">Nenhum arquivo encontrado</p>
                      <p className="text-white/70">
                        {filter === 'all' 
                          ? 'Não há arquivos disponíveis no momento'
                          : 'Tente alterar os filtros de busca'
                        }
                      </p>
                    </div>
                  )
            }
          </div>

          {/* Stats Section */}
          {!isLoading && files.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">📊 Estatísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{files.length}</div>
                    <div className="text-white/70 text-sm">Total de Arquivos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {files.filter(f => ['pdf', 'docx', 'doc'].includes(getFileExtension(f.filename))).length}
                    </div>
                    <div className="text-white/70 text-sm">Documentos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {files.filter(f => ['py', 'js', 'html'].includes(getFileExtension(f.filename))).length}
                    </div>
                    <div className="text-white/70 text-sm">Códigos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {new Set(files.map(f => f.uploader)).size}
                    </div>
                    <div className="text-white/70 text-sm">Colaboradores</div>
                  </div>
                </div>
              </div>
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

export default DownloadItems;