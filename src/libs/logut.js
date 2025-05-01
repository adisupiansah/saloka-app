import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

export const useHooksLogout = () => {
  const router = useRouter();

    // Logout Function
    const handleLogout = async () => {
      try {
        Swal.fire({
          title: "Apakah Anda Yakin ?",
          text: "Anda akan keluar dari aplikasi",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#72bf78",
          cancelButtonColor: "#c62e2e",
          confirmButtonText: "Ya, Keluar!",
          cancelButtonText: "Tidak",
          color: "#D9D9D9",
          background: "#212529",
        }).then(async(result) => {
          if (result.isConfirmed) {
            await signOut(auth); // Logout dari Firebase
            window.location.href = "/auth"; // Redirect ke halaman login
            sessionStorage.removeItem("user");
          }
        })
      } catch (error) {
        console.error("Gagal logout:", error);
      }
    };

  return { handleLogout };
};
