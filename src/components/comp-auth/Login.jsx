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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // validasi form
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Form tifdak boleh kosong!",
        confirmButtonText: "OK",
        confirmButtonColor: "#72bf78",
        background: "#1e1e1e",
        
        color: "#D9D9D9",
      })
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // simpan user yang login ke sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userCredential.user));

      Swal.fire({
        icon: "success",
        title: "Login berhasil!",
        text: "Selamat datang, " + userCredential.user.email,
        showConfirmButton: false,
        timer: 1500,
        background: "#1e1e1e",
        color: "#D9D9D9",
      }).then(() => {
        router.push("/");
      });
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

                      <button type="submit" className="btn btn-login col-md-12">
                        login
                      </button>
                    </form>
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
