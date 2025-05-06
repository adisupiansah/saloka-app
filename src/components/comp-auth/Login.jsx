"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoLogistik from "@/app/img/logoLogistik.png";
import polres from "@/app/img/logoPolres.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { dbFirestore } from "@/libs/Firebase";
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const Login = () => {
  const [step, setStep] = useState(1); // 1: login, 2: verifikasi kode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(600); // 10 menit dalam detik
  const [isResending, setIsResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (countdown > 0 && step === 2) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, step]);

  // Di useEffect awal komponen
useEffect(() => {
  // Bersihkan data sementara saat komponen unmount
  return () => {
    sessionStorage.removeItem('tempEmail');
    sessionStorage.removeItem('tempPassword');
  };
}, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch("/api/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Gagal mengirim kode");
      setCountdown(600);
      Swal.fire({
        icon: "success",
        title: "Kode Terkirim!",
        text: "Cek email Anda untuk kode verifikasi",
        background: "#1e1e1e",
        color: "#D9D9D9",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Kode",
        text: error.message,
        background: "#1e1e1e",
        color: "#D9D9D9",
      });
    }
    setIsResending(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      // Ambil email dan password dari session storage
      const savedEmail = sessionStorage.getItem('tempEmail');
      const savedPassword = sessionStorage.getItem('tempPassword');
  
      if (!savedEmail || !savedPassword) {
        throw new Error("Sesi verifikasi kadaluarsa");
      }
  
      // Verifikasi kode
      const q = query(
        collection(dbFirestore, "verificationCodes"),
        where("email", "==", savedEmail),
        where("code", "==", verificationCode),
        where("used", "==", false),
        where("expiresAt", ">", new Date())
      );
  
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error("Kode tidak valid atau kadaluarsa");
  
      // Tandai kode sebagai digunakan
      const docRef = snapshot.docs[0].ref;
      await deleteDoc(docRef);
  
      // Lakukan login dengan email dan password yang tersimpan
      const userCredential = await signInWithEmailAndPassword(
        auth,
        savedEmail,
        savedPassword
      );
  
      // Bersihkan data sementara
      sessionStorage.removeItem('tempEmail');
      sessionStorage.removeItem('tempPassword');
  
      // Simpan data user
      sessionStorage.setItem("user", JSON.stringify(userCredential.user));
      sessionStorage.setItem("verified", "true");
  
      // Redirect
      Swal.fire({
        icon: "success",
        title: "Verifikasi Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      // Error handling spesifik
      let errorMessage = error.message;
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = "Password tidak valid";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "User tidak ditemukan";
      }
  
      setMessage(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Gagal Verifikasi",
        text: errorMessage,
        background: "#1e1e1e",
        color: "#D9D9D9",
      });
    }
  };

  // Modifikasi handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Form tidak boleh kosong!",
        confirmButtonText: "OK",
        confirmButtonColor: "#72bf78",
        background: "#1e1e1e",
        color: "#D9D9D9",
      });
      return;
    }

    try {
      // Hapus signInWithEmailAndPassword
      // Ganti dengan validasi custom ke backend
      const response = await fetch("/api/check-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Email atau password salah");
        // Simpan sementara email dan password
    sessionStorage.setItem('tempEmail', email);
    sessionStorage.setItem('tempPassword', password);

      await handleSendCode();
      setStep(2);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="container login">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card col-md-6 p-4">
              <div className="card-body">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex gap-2">
                    <Image
                      src={polres}
                      width={80}
                      height={100}
                      alt="logo-polreskarimun"
                    />
                    <Image
                      src={LogoLogistik}
                      width={80}
                      height={100}
                      alt="logo-logistik"
                    />
                  </div>
                  <div className="d-flex flex-column col-md-12 mt-3 text-center">
                    <h3>WELCOME TO SALOKA</h3>
                    <p>SISTEM ADMINISTRASI LOGISTIK POLRES KARIMUN</p>

                    {message && (
                      <div className="alert alert-danger mt-3" role="alert">
                        Username / Password salah
                      </div>
                    )}
                    {step === 1 ? (
                      <form onSubmit={handleLogin}>
                        <input
                          type="email"
                          className="form-control "
                          placeholder="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5" // Tambahkan padding-end supaya teks tidak tertutup icon
                            placeholder="Password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent px-3"
                            style={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <FaEyeSlash size={20} />
                            ) : (
                              <FaRegEye size={20} />
                            )}
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-login col-md-12"
                        >
                          login
                        </button>
                      </form>
                    ) : (
                      // Form verifikasi kode
                      <div className="verification-form">
                        <h4>Verifikasi Email</h4>
                        <p>Kami telah mengirim kode ke {email}</p>
                        <form onSubmit={handleVerifyCode}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan 6 digit kode"
                            value={verificationCode}
                            onChange={(e) =>
                              setVerificationCode(e.target.value)
                            }
                            maxLength={6}
                          />
                          <div className="countdown">
                            {formatTime(countdown)}
                          </div>
                          <button type="submit" className="btn btn-login">
                            Verifikasi
                          </button>
                          <button
                            type="button"
                            className="btn btn-resend col-md-12"
                            onClick={handleSendCode}
                            disabled={countdown > 0 || isResending}
                          >
                            {isResending ? "Mengirim..." : "Kirim Ulang Kode"}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
