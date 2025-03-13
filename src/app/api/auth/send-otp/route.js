import { auth } from "@/libs/Firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email wajib diisi" }),
        { status: 400 }
      );
    }

    const actionCodeSettings = {
      url: "http://localhost:3000/auth/callback", // Ganti dengan URL frontend kamu
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    return new Response(
      JSON.stringify({ message: "Link login telah dikirim ke email Anda" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}
