import "bootstrap/dist/css/bootstrap.css";
import "../css/auth.css";

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SALOKA - auth",
  description:
    "SALOKA - SISTEM ADMINISTRASI LOGISTIK POLRES KARIMUN",
};

export default function AuthLayout({children}) {
  return (
    <div className="body-auth">
      {children}
    </div>
  )
}
