import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-cyan-900 py-6">
      <div className="container mx-auto px-6">
        <h4 className="text-white text-center text-sm md:text-base mb-4">
          ©<span className="current-year">{currentYear}</span> - Developed by{" "}
          <a
            href="https://clesiomatias-portfolio.netlify.app/"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @clesiofmatias
          </a>
        </h4>
       
      </div>
    </footer>
  );
};

export default Footer;
