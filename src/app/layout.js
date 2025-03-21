import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navigasibar from "@/components/Navigasi/Navigasibar";
import { Roboto } from "next/font/google";
import ProtectedLayout from "./ProtectedLayout";
import AuthListener from "@/components/comp-auth/AuthListener";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Tambahkan variasi yang diperlukan
});
export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SALOKA RESKARIMUN",
  description: "SALOKA - SISTEM ADMINISTRASI LOGISTIK POLRES KARIMUN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={roboto.className}>
        <ProtectedLayout>
          <Navigasibar />
          <AuthListener/>
          {children}
        </ProtectedLayout>
      </body>
    </html>
  );
}
