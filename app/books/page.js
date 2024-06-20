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
import { useState } from "react";

const Books = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentBook, setCurrentBook] = useState(null);

  const handleOpenModal = (book) => {
    setCurrentBook(book);
    onOpenChange(true);
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-full flex flex-col p-10 items-center justify-center bg-cyan-400 mt-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ImageBooks).map(([key, src]) => (
            <Card className="py-4 flex flex-col items-center" key={key}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h4 className="font-bold text-large">{src.title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 flex flex-col items-center">
                <Image
                  alt={`${src.title}`}
                  className="object-cover rounded-xl"
                  src={src.url}
                  width={270}
                  height={270}
                />
                <CardFooter className="flex items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <button
                    className="text-tiny text-white font-bold py-1 px-2 rounded-xl bg-cyan-900/80 w-1/2 hover:text-cyan-900 hover:bg-white/60"
                    onClick={() => handleOpenModal(src)}
                  >
                    Saiba mais
                  </button>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      {currentBook && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="flex flex-col max-h-screen">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {currentBook.title}
                </ModalHeader>
                <ModalBody className="overflow-y-auto">
                  <p>{currentBook.description}</p>
                </ModalBody>
                <ModalFooter>
                  {currentBook.buy ? (
                    <a
                      className="text-cyan-600 bg-transparent hover:bg-cyan-100 hover:text-bold border border-cyan-600 rounded px-4 py-2"
                      href={currentBook.buy}
                      target="_blank"
                    >
                      Compre aqui!
                    </a>
                  ) : (
                    <h3 className="text-red-900 bg-transparent border border-red-600 rounded px-4 py-2">Esgotado!</h3>
                  )}
                  <button
                    className="text-red-600 bg-transparent hover:bg-red-100 border border-red-600 rounded px-4 py-2"
                    onClick={onClose}
                  >
                    Fechar
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Books;
