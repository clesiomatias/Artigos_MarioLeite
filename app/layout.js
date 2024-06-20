import Footer from "@/src/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mario Leite",
  description: "Onde você encontra tudo sobre programação e lógica!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.png",        
      },
      
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}

        <Footer />
      </body>
    </html>
  );
}
