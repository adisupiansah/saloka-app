// import { cookies } from 'next/headers';

// export async function GET() {
//     const cookieStore = cookies(); // Gunakan cookies() dari next/headers
//     const isLoggedIn = (await cookieStore).get('isLoggedIn')?.value; // Ambil nilai cookie

//     if (isLoggedIn === 'true') {
//         return new Response(
//             JSON.stringify({ message: "Sudah login" }),
//             { status: 200, headers: { "Content-Type": "application/json" } }
//         );
//     }

//     return new Response(
//         JSON.stringify({ message: "Belum login" }),
//         { status: 401, headers: { "Content-Type": "application/json" } }
//     );
// }
