
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
        <div className=" w-full flex justify-end items-center ">
        <button 
        className="rounded-md bg-cyan-900 shadow-xs  text-white p-3"
        
        >
          <Link href="/login"> Uploads</Link>
        </button>
      </div>
        <div className=" w-full flex justify-end items-center  ">

        </div>

      </div>
      ;
    </>
  );
}
export default DownloadItems