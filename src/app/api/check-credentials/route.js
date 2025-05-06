// app/api/check-credentials/route.js
import { auth } from "@/libs/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request) {
  const { email, password } = await request.json();
  
  try {
    // Cek credentials tanpa membuat session
    await signInWithEmailAndPassword(auth, email, password);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 401 
    });
  }
}