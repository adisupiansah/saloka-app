import { db } from "@/libs/Firebase";
import { ref, get, child } from "firebase/database";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const dbRef = ref(db, "disposisi");

        if (id) {
            // Jika ID diberikan, ambil data berdasarkan ID
            const snapshot = await get(child(dbRef, id));

            if (!snapshot.exists()) {
                return new Response(
                    JSON.stringify({ message: "Data tidak ditemukan" }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }

            return new Response(JSON.stringify(snapshot.val()), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            // Jika tidak ada ID, ambil semua data
            const snapshot = await get(dbRef);

            if (!snapshot.exists()) {
                return new Response(
                    JSON.stringify({ message: "Tidak ada data" }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }

            // Konversi objek Firebase ke array
            let data = Object.entries(snapshot.val()).map(([key, value]) => ({
                id: key,
                ...value
            }));

            // Filter berdasarkan type_disposisi jika diberikan
           
                data = data.filter(item => 
                    item.type_disposisi === "disposisi BMP" || 
                    item.type_disposisi === "disposisi Harwat"
                );
         

            // Urutkan berdasarkan createdAt (descending)
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({ message: "Gagal Mengambil Data", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
