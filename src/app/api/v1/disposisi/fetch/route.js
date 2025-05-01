import { db } from "@/libs/Firebase"; 
import { ref, get, query, orderByKey, limitToLast } from "firebase/database";
import { incrementNomorNotaDinas } from "@/libs/incrementNotadinas";

export async function GET() {
  try {
    // Ambil data terakhir dari tabel notadinas
    const disposisiRef = query(ref(db, "disposisi"), orderByKey(), limitToLast(1));
    const disposisiSnapshot = await get(disposisiRef);
    const lastNomorDisposisi = disposisiSnapshot.exists() ? Object.values(disposisiSnapshot.val())[0] : null;

    // Tentukan nomor terakhir
    const noDisposisi = lastNomorDisposisi?.no_disposisi;

    // Jika tidak ada data di tabel, gunakan nomor default
    if (!noDisposisi) {
      return new Response(
        JSON.stringify({ no_disposisi: "01/I/LOG./2025" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Tentukan nomor berikutnya
    const nextNomorDisposisi = incrementNomorNotaDinas(noDisposisi);

    return new Response(
      JSON.stringify({ no_disposisi: nextNomorDisposisi }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan pada server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
