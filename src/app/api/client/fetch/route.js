import { db } from "@/libs/Firebase"; 
import { ref, get, query, orderByKey, limitToLast } from "firebase/database";
import { incrementNomorNotaDinas } from "@/libs/incrementNotadinas";

export async function GET(request) {
  try {
    // Ambil data terakhir dari tabel notadinas
    const notadinasRef = query(ref(db, "notadinas"), orderByKey(), limitToLast(1));
    const notadinasSnapshot = await get(notadinasRef);
    const lastNomorNotaDinas = notadinasSnapshot.exists() ? Object.values(notadinasSnapshot.val())[0] : null;

    // Ambil data terakhir dari tabel ambilnomor
    const ambilnomorRef = query(ref(db, "ambilnomor"), orderByKey(), limitToLast(1));
    const ambilnomorSnapshot = await get(ambilnomorRef);
    const lastNomor = ambilnomorSnapshot.exists() ? Object.values(ambilnomorSnapshot.val())[0] : null;

    // Tentukan nomor terakhir
    const noNotaDinas = lastNomor?.no_pengajuan || lastNomorNotaDinas?.no_surat;

    // Jika tidak ada data di kedua tabel, gunakan nomor default
    if (!noNotaDinas) {
      return new Response(
        JSON.stringify({ no_pengajuan: "B/ND-01/I/LOG./2024" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Tentukan nomor berikutnya
    const nextNomorNotaDinasPengajuan = incrementNomorNotaDinas(noNotaDinas);

    return new Response(
      JSON.stringify({ no_pengajuan: nextNomorNotaDinasPengajuan }),
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
