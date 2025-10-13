"use client";
import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import "../globals.css";
import { ImageBooks } from "@/src/utils/booksImage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useState, useEffect } from "react";

const Books = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentBook, setCurrentBook] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (book) => {
    setCurrentBook(book);
    onOpenChange(true);
  };

  const filteredBooks = Object.entries(ImageBooks).filter(([key, book]) => {
    if (filter === 'available') return book.buy;
    if (filter === 'unavailable') return !book.buy;
    return true;
  });

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <Card className="py-4 h-[420px]">
        <CardHeader className="pb-0 pt-2 px-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </CardHeader>
        <CardBody className="flex flex-col items-center">
          <div className="w-[270px] h-[270px] bg-gray-300 rounded-xl mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Biblioteca Digital
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Explore nossa coleção de livros sobre programação
            </p>
            
            {/* Filtros */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-white text-cyan-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Todos ({Object.keys(ImageBooks).length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === 'available'
                    ? 'bg-white text-cyan-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Disponíveis ({Object.values(ImageBooks).filter(book => book.buy).length})
              </button>
              <button
                onClick={() => setFilter('unavailable')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === 'unavailable'
                    ? 'bg-white text-cyan-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Esgotados ({Object.values(ImageBooks).filter(book => !book.buy).length})
              </button>
            </div>
          </div>

          {/* Grid de Livros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredBooks.map(([key, book], index) => (
                  <div
                    key={key}
                    className="group transform transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isLoading ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <Card className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 h-full">
                      {/* Badge de Status */}
                      <div className="absolute top-3 right-3 z-20">
                        {book.buy ? (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Disponível
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Esgotado
                          </span>
                        )}
                      </div>

                      <CardHeader className="pb-2 pt-4 px-4">
                        <h4 className="font-bold text-lg text-center text-gray-800 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                          {book.title}
                        </h4>
                      </CardHeader>
                      
                      <CardBody className="px-4 pb-4">
                        <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                          <Image
                            alt={book.title}
                            className="object-cover rounded-lg shadow-md w-full"
                            src={book.url}
                            width={270}
                            height={350}
                            style={{ aspectRatio: '3/4' }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-lg"></div>
                        </div>
                        
                        {/* Preview da descrição */}
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {book.description}
                        </p>
                        
                        <button
                          onClick={() => handleOpenModal(book)}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Ver Detalhes
                        </button>
                      </CardBody>
                    </Card>
                  </div>
                ))
            }
          </div>

          {filteredBooks.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <p className="text-white text-xl">Nenhum livro encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Melhorado */}
      {currentBook && (
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          size="2xl"
          scrollBehavior="inside"
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          }}
        >
          <ModalContent className="bg-white">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{currentBook.title}</h2>
                  <div className="flex items-center gap-2">
                    {currentBook.buy ? (
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                        ✓ Disponível
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-semibold">
                        ✗ Esgotado
                      </span>
                    )}
                  </div>
                </ModalHeader>
                
                <ModalBody className="py-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        alt={currentBook.title}
                        className="object-cover rounded-lg shadow-lg w-full"
                        src={currentBook.url}
                        width={300}
                        height={400}
                        style={{ aspectRatio: '3/4' }}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Sobre o livro:</h3>
                      <div className="text-gray-700 leading-relaxed space-y-3">
                        {currentBook.description.split('. ').map((sentence, index) => (
                          <p key={index} className="text-justify">
                            {sentence}{sentence.endsWith('.') ? '' : '.'}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                
                <ModalFooter className="border-t pt-4">
                  <div className="flex gap-3 w-full justify-end">
                    <button
                      className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      onClick={onClose}
                    >
                      Fechar
                    </button>
                    {currentBook.buy ? (
                      <a
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        href={currentBook.buy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🛒 Comprar Agora
                      </a>
                    ) : (
                      <span className="px-6 py-2 bg-red-100 text-red-700 rounded-lg cursor-not-allowed">
                        Indisponível
                      </span>
                    )}
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Books;
