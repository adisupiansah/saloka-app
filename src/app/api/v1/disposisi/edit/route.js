import { db } from "@/libs/Firebase";
import { ref, update, get } from "firebase/database";
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, tgl_surat, no_disposisi, no_surat, perihal, satfung, type_disposisi } = body;

        if(!id || !tgl_surat || !no_disposisi || !no_surat || !perihal || !satfung || !type_disposisi) {
            return new Response(
                JSON.stringify({ message: "ID tidak ditemukan" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            )
        }

        // cek apakah data dengan ID tersebut ada di Firebase
        const diposisiRef = ref(db, `disposisi/${id}`);
        const snapshot = await get(diposisiRef);

        if (!snapshot.exists()) {
            return new Response(
                JSON.stringify({ message: "Data tidak ditemukan" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            )
        }

        // Update data disposisi ke database
        await update(diposisiRef, {
                tgl_surat,
                no_disposisi,
                no_surat,
                perihal,
                satfung,
                type_disposisi,
        })

        return new Response (
            JSON.stringify({ message: "Data berhasil diUpdate"}),
            { status: 200, headers: { "Content-Type": "application/json" } }
        )
    } catch (error) {
        console.error('Error saat mengedit data disposisi:', error);
        return new Response(
            JSON.stringify({ message: 'Gagal mengedit data disposisi' }),
            { status: 500 }
        )
        
    }
}