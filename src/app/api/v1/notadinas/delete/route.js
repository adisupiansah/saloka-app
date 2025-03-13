import { db } from "@/libs/Firebase";
import { ref, remove, get } from "firebase/database";

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(
                JSON.stringify({ error: "ID tidak boleh kosong" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Cek apakah data dengan ID tersebut ada di Firebase
        const notaDinasRef = ref(db, `notadinas/${id}`);
        const snapshot = await get(notaDinasRef);

        if (!snapshot.exists()) {
            return new Response(
                JSON.stringify({ error: "Data tidak ditemukan" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hapus data dari Firebase
        await remove(notaDinasRef);

        return new Response(
            JSON.stringify({ message: "Data berhasil dihapus" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error saat menghapus data:", error);
        return new Response(
            JSON.stringify({ error: "Terjadi kesalahan saat menghapus data", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
