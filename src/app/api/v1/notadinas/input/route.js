import { db } from "@/libs/Firebase";
import { ref, push, set } from "firebase/database";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const tgl_surat = formData.get("tgl_surat");
    const no_surat = formData.get("no_surat");
    const kepada = formData.get("kepada");
    const perihal = formData.get("perihal");
    const type_notadinas = formData.get("type_notadinas");

    if (!tgl_surat || !no_surat || !kepada || !perihal || !type_notadinas) {
      return new Response(
        JSON.stringify({ message: "Data tidak lengkap" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simpan data ke Firebase Realtime Database
    const newNotaDinasRef = push(ref(db, "notadinas")); // Buat referensi baru
    await set(newNotaDinasRef, {
      tgl_surat,
      no_surat,
      kepada,
      perihal,
      type_notadinas,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: "Berhasil disimpan", id: newNotaDinasRef.key }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan pada server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
