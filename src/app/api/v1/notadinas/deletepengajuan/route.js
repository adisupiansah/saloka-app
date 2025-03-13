import { db } from "@/libs/Firebase";
import { ref, remove } from "firebase/database";

export async function DELETE(request) {
    try {
      // Hapus semua data dari tabel "ambilnomor"
      await remove(ref(db, "ambilnomor"));
  
      return new Response(
        JSON.stringify({ message: "Semua data berhasil dihapus" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus data:", error);
      return new Response(
        JSON.stringify({ error: "Terjadi kesalahan saat menghapus data" }),
        { status: 500 }
      );
    }
  }