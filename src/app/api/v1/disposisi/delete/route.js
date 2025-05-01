import { db } from "@/libs/Firebase";
import { ref, remove, get } from "firebase/database";

export async function DELETE(request) {
    try {
        // ambil id dari parameter URL
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        
        if(!id) {
            return new Response(
                JSON.stringify({ error: 'id is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        // cek apakah data dengan ID tersebut ada di Firebase   
        const disposisiRef = ref(db, `disposisi/${id}`);
        const snapshot = await get(disposisiRef);

        if(!snapshot.exists()) {
            return new Response(
                JSON.stringify({ error: 'Data disposisi tidak ditemukan' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            )
        }

        // Hapus data dari Firebase
        await remove(disposisiRef);

        return new Response(
            JSON.stringify({ message: 'Data disposisi berhasil dihapus' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error({error: 'Data berhasil dihapus'});
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan saat menghapus data' }),
            { status: 500 }
        )
        
    }
}