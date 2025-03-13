import { db } from "@/libs/Firebase";
import { ref, get } from "firebase/database";

export async function GET() {
    try {
        // Ambil referensi ke path "notadinas"
        const notadinasRef = ref(db, "notadinas");
        
        // Ambil data dari Firebase
        const snapshot = await get(notadinasRef);

        // Cek apakah data ada
        if (!snapshot.exists()) {
            return new Response(
                JSON.stringify({ message: "Data tidak ditemukan" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Konversi data snapshot menjadi array
        const notadinas = [];
        snapshot.forEach((childSnapshot) => {
            notadinas.push({
                id: childSnapshot.key, // Gunakan key sebagai ID
                ...childSnapshot.val(), // Data dari Firebase
            });
        });

        // Urutkan berdasarkan createdAt secara descending
        notadinas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return new Response(JSON.stringify(notadinas), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({ message: "Gagal mengambil data", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}