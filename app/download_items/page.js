
"use client";
import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import "../globals.css";
import { useState } from "react"
import Link from "next/link";
const DownloadItems = () => {
  return (
    <>
      <NavBar />
      <div className="w-full h-full min-h-screen flex flex-col p-10 items-center justify-start bg-cyan-400 mt-1">
     <h1 className="animate-bounce text-2xl font-bold text-cyan-900">
          Em Breve!!!
        </h1>

        </div>

      </div>
      ;
    </>
  );
}
export default DownloadItems