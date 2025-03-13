import { auth } from "@/libs/Firebase";
import { signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, url } = body;

    if (!email || !url) {
      return new Response(
        JSON.stringify({ message: "Email dan URL diperlukan" }),
        { status: 400 }
      );
    }

    // Pastikan URL valid
    if (!isSignInWithEmailLink(auth, url)) {
      return new Response(
        JSON.stringify({ message: "Link tidak valid atau telah kadaluarsa" }),
        { status: 400 }
      );
    }

    // Login user dengan email link
    const userCredential = await signInWithEmailLink(auth, email, url);
    const user = userCredential.user;

    return new Response(
      JSON.stringify({ message: "Login berhasil", user: { email: user.email } }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}
