import { db } from "@/libs/Firebase";
import { ref, get, query, orderByKey } from "firebase/database";

export async function GET(request) {
    try {
        // Referensi ke path "ambilnomor" di database
        const dbRef = ref(db, "ambilnomor");

        // Query data dari Firebase, urutkan berdasarkan ID (jika ada)
        const snapshot = await get(query(dbRef, orderByKey()));

        // Cek apakah ada data
        if (!snapshot.exists()) {
            return new Response(
                JSON.stringify({ msg: "Tidak ada data" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Ubah data ke dalam format array
        const data = Object.values(snapshot.val());

        // urutkan data berdasarkan createdAt secara descending
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return new Response(
            JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data", error);
        return new Response(
            JSON.stringify({ msg: "Terjadi kesalahan saat mengambil data" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}