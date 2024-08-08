"use client";
import NavBar from "@/src/components/NavBar";
import Image from "next/image";
import "../globals.css";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className="w-full h-full min-h-screen flex flex-col p-10 items-center justify-start bg-cyan-400 mt-1">
        <div className="bg-white roundde-2xl shadow-2xl flex flex-col w-2/3 md:w-1/3 max-w-3xl">
          <div className="w-1/2">
            <p>login</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
