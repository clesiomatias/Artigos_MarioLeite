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
    firstDate:'',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const names = await getPosts();
        setPostNames(names);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    const fetchLastPost = async () => {
      try {
        const data = await lastPost();
        setLastPostData(data);
      } catch (error) {
        console.error("Erro ao buscar o último post:", error);
      }
    };

    fetchLastPost();
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full h-full flex flex-col p-10 items-center justify-center bg-cyan-300 mt-1">
        <div className="w-full flex  rounded flex-col p-10 items-center justify-center bg-cyan-800 mt-1">
                <h2 className="text-xl  md:text-3xl text-white mb-2 font-bold">
                  Artigo do dia {lastPostData.firstDate}
                </h2>
          <Card className=" w-11/12 md:w-3/4 min-h-[120px] bg-cyan-200">
            <CardHeader className="flex gap-3 items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-xl text-cyan-700 font-bold">
                  {lastPostData.firstName.split(".").shift()}
                </h1>
              </div>
            </CardHeader>

            <CardFooter>
              <a
                className="text-cyan-600 w-full bg-cyan-100 rounded flex items-center justify-center hover:bg-cyan-600 hover:text-cyan-100"
                href={lastPostData.firstUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Veja o código no GitHub.
              </a>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex flex-col p-10 items-center rounded justify-center bg-cyan-900 mt-1">
          <ul className="flex flex-col gap-3 md:grid md:gap-4 md:grid-cols-3 ">
            {postNames.map((name, index) => (
              <li key={index}>
                <Card className="max-w-[400px] min-h-[120px]">
                  <CardHeader className="flex gap-3 items-center justify-center">
                    <div className="flex flex-col ">
                      <h1 className="text-md font-bold">
                        {" "}
                        {name.split(".").shift()}
                      </h1>
                    </div>
                  </CardHeader>

                  <CardFooter>
                    <a
                      className="text-cyan-600 w-full bg-cyan-100 rounded flex items-center justify-center hover:bg-cyan-600 hover:text-cyan-100"
                      href={`https://github.com/ProfMLE/Rep01/blob/master/${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Veja o código no GitHub.
                    </a>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
      ;
    </>
  );
};
export default Codes;
