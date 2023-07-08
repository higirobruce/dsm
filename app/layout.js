import "./globals.css";
import { Inter } from "next/font/google";
import GlobalComponent from "./components/globalComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSM System",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <GlobalComponent children={children} />
      </body>
    </html>
  );
}
