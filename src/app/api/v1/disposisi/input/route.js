import { db } from "@/libs/Firebase";
import { ref, push, set } from "firebase/database";

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body || typeof body !== "object") {
            return new Response(
                JSON.stringify({ message: "Payload tidak valid" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const { tgl_surat, no_disposisi, no_surat, perihal, satfung, type_disposisi } = body;

        // Validasi jika data tidak lengkap
        if (!tgl_surat || !no_disposisi || !no_surat || !perihal || !satfung || !type_disposisi) {
            return new Response(
                JSON.stringify({ message: "Data tidak lengkap" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Tambahkan data ke Firebase Realtime Database
        const newRef = push(ref(db, "disposisi"));
        await set(newRef, {
            tgl_surat,
            no_disposisi,
            no_surat,
            perihal,
            satfung,
            type_disposisi,
            createdAt: new Date().toISOString(),
        });

        return new Response(
            JSON.stringify({
                message: "Berhasil menyimpan data", id: newRef.key
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error saat menyimpan data:", error);
        return new Response(
            JSON.stringify({ message: "Terjadi kesalahan saat menyimpan data", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
