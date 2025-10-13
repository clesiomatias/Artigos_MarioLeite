"use client";
import NavBar from "@/src/components/NavBar";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import "../globals.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const coursesData = [
  {
    id: 1,
    title: "Lógica de Programação",
    description: "Aprenda os fundamentos da programação com exercícios práticos e teoria sólida. Este curso aborda conceitos essenciais como algoritmos, estruturas de controle, variáveis e funções.",
    image: "/imgs/logica.png",
    url: "https://github.com/ProfMLE/Rep02",
    level: "Iniciante",
    duration: "40 horas",
    topics: ["Algoritmos", "Estruturas de Controle", "Variáveis", "Funções", "Arrays"],
    icon: "🧠",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 2,
    title: "Banco de Dados",
    description: "Domine os conceitos de banco de dados relacionais, SQL e modelagem de dados. Aprenda a criar, consultar e gerenciar bases de dados eficientes.",
    image: "/imgs/banco de dados.png",
    url: "https://github.com/ProfMLE/Rep004",
    level: "Intermediário",
    duration: "60 horas",
    topics: ["SQL", "Modelagem", "Normalização", "Consultas", "Índices"],
    icon: "🗄️",
    color: "from-indigo-600 to-blue-600"
  },
  {
    id: 3,
    title: "Criptografia",
    description: "Explore o mundo da segurança digital através da criptografia. Aprenda algoritmos de criptografia, hashing e técnicas de proteção de dados.",
    image: "/imgs/criptografia.png",
    url: "https://github.com/ProfMLE/Rep03",
    level: "Avançado",
    duration: "50 horas",
    topics: ["Algoritmos", "Hash", "Chaves", "Segurança", "Protocolos"],
    icon: "🔐",
    color: "from-blue-700 to-indigo-700"
  }
];

const Courses = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (course) => {
    setCurrentCourse(course);
    onOpenChange(true);
  };

  const filteredCourses = coursesData.filter(course => {
    if (filter === 'beginner') return course.level === 'Iniciante';
    if (filter === 'intermediate') return course.level === 'Intermediário';
    if (filter === 'advanced') return course.level === 'Avançado';
    return true;
  });

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <Card className="h-[400px] bg-white/90">
        <CardHeader className="pb-2">
          <div className="w-full h-[200px] bg-gray-300 rounded-xl"></div>
        </CardHeader>
        <CardBody className="pt-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎓 Educação Online
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Minicursos Especializados
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Desenvolva suas habilidades com nossos cursos práticos e didáticos, 
              criados especialmente para acelerar seu aprendizado em programação
            </p>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'all'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Todos os Cursos ({coursesData.length})
              </button>
              <button
                onClick={() => setFilter('beginner')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'beginner'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                🌱 Iniciante ({coursesData.filter(c => c.level === 'Iniciante').length})
              </button>
              <button
                onClick={() => setFilter('intermediate')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'intermediate'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                🚀 Intermediário ({coursesData.filter(c => c.level === 'Intermediário').length})
              </button>
              <button
                onClick={() => setFilter('advanced')}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  filter === 'advanced'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                ⚡ Avançado ({coursesData.filter(c => c.level === 'Avançado').length})
              </button>
            </div>
          </div>

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="group transform transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: isLoading ? 'none' : 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    <Card className="relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 h-full">
                      {/* Badge de Nível */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`text-white text-xs px-3 py-1 rounded-full font-semibold ${
                          course.level === 'Iniciante' ? 'bg-green-500' :
                          course.level === 'Intermediário' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {course.level}
                        </span>
                      </div>

                      {/* Ícone do Curso */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="text-3xl bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                          {course.icon}
                        </div>
                      </div>

                      <CardHeader className="pb-2 pt-4 px-0">
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            src={course.image}
                            width={400}
                            height={200}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      </CardHeader>
                      
                      <CardBody className="px-6 pb-4">
                        <h3 className="font-bold text-xl text-gray-800 mb-2">
                          {course.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {course.description}
                        </p>
                        
                        {/* Informações do Curso */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            ⏱️ {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            📚 {course.topics.length} tópicos
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(course)}
                            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
                          >
                            Ver Detalhes
                          </button>
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 bg-gradient-to-r ${course.color} text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center text-sm`}
                          >
                            Acessar Curso
                          </a>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))
            }
          </div>

          {filteredCourses.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-white text-xl mb-2">Nenhum curso encontrado</p>
              <p className="text-white/70">Tente alterar os filtros de busca</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detalhado */}
      {currentCourse && (
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
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{currentCourse.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{currentCourse.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-white text-sm px-3 py-1 rounded-full font-semibold ${
                          currentCourse.level === 'Iniciante' ? 'bg-green-500' :
                          currentCourse.level === 'Intermediário' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {currentCourse.level}
                        </span>
                        <span className="text-gray-600 text-sm">⏱️ {currentCourse.duration}</span>
                      </div>
                    </div>
                  </div>
                </ModalHeader>
                
                <ModalBody className="py-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        alt={currentCourse.title}
                        className="object-cover rounded-lg shadow-lg w-full"
                        src={currentCourse.image}
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Sobre o curso:</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {currentCourse.description}
                      </p>
                      
                      <h4 className="text-md font-semibold text-gray-800 mb-2">Tópicos abordados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCourse.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                          >
                            {topic}
                          </span>
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
                    <a
                      className={`px-6 py-2 bg-gradient-to-r ${currentCourse.color} text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                      href={currentCourse.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚀 Acessar no GitHub
                    </a>
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

export default Courses;