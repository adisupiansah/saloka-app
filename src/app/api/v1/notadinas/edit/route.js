import { db } from "@/libs/Firebase";
import { ref, update, get } from "firebase/database";

export async function PUT(request) {
    try {
        const formData = await request.formData();
        const id = formData.get("id");
        const tgl_surat = formData.get("tgl_surat");
        const no_surat = formData.get("no_surat");
        const kepada = formData.get("kepada");
        const perihal = formData.get("perihal");
        const type_notadinas = formData.get("type_notadinas");

        // Validasi data
        if (!id || !tgl_surat || !no_surat || !kepada || !perihal || !type_notadinas) {
            return new Response(
                JSON.stringify({ message: "Data tidak lengkap" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Cek apakah data dengan ID tersebut ada di Firebase
        const notadinasRef = ref(db, `notadinas/${id}`);
        const snapshot = await get(notadinasRef);

        if (!snapshot.exists()) {
            return new Response(
                JSON.stringify({ message: "Data tidak ditemukan" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Update data di Firebase
        await update(notadinasRef, {
            tgl_surat,
            no_surat,
            kepada,
            perihal,
            type_notadinas
        });

        return new Response(
            JSON.stringify({ message: "Berhasil diperbarui" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response(
            JSON.stringify({ message: "Gagal memperbarui data", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
