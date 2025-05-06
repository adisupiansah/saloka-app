import { dbFirestore } from "@/libs/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { createTransport } from "nodemailer";
import cryptoRandomString from 'crypto-random-string';
import VerificationCodeEmail from "@/components/react-email/EmailMessage";
import { render } from "@react-email/render";

export async function POST(request) {
  const { email } = await request.json();
  
  try {
    // Generate kode 6 digit
    const code = cryptoRandomString({
        length: 6,
        characters: '0123456789'
      });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

    // Simpan ke Firestore
    const codesRef = collection(dbFirestore, "verificationCodes");
    await addDoc(codesRef, {
      email,
      code,
      expiresAt,
      used: false
    });

    // Konfigurasi email
    const transporter = createTransport({
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlTemplate = await render(<VerificationCodeEmail code={code} />)

    // Kirim email
    await transporter.sendMail({
      from: `SALOKA <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Kode Verifikasi SALOKA",
      html: htmlTemplate,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Gagal mengirim kode" }), {
      status: 500,
    });
  }
}