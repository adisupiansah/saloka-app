'use client'
import React, { useState } from "react";
import Logo from '@/app/img/logoLogistik.png'
import Image from "next/image";
import Swal from "sweetalert2";
import { data } from "jquery";

const Register = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [password_confirmation, setPasswordConfirmation] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  // semua form harus diisi
  if (!username || !password || !password_confirmation) {
    Swal.fire({
      title: 'Error',
      text: 'Semua form harus diisi',
      icon: 'error',
      confirmButtonColor: "#72bf78",
      confirmButtonText: "OK",
      color: "#D9D9D9",
      background: "#212529",
    })
    return;
  }

  // validasi password
  if (password !== password_confirmation) {
    Swal.fire({
      title: 'Error',
      text: 'Password tidak sama',
      icon: 'error',
      confirmButtonColor: "#72bf78",
      confirmButtonText: "OK",
      color: "#D9D9D9",
      background: "#212529",
    })
    return;
  }

  // jika semua validasi terpenuhi, maka lakukan registrasi
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation,
      }),
    })
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: 'Berhasil',
        text: data.message,
        icon: 'success',
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error',
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      })
    }

  } catch (error) {
      console.error("Error euy:", error.stack);
      Swal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error',
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      })
  }

}
  


  return (
    <div className="container register">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card col-md-6 p-2">
              <div className="card-body">
                <div className="text-center mb-4">
                    <Image src={Logo} alt="logo-logistik" width={90} height={100}/>
                </div>
                <div className="text-center mt-3">
                  <h2>Register</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Konfirmasi Password"
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />

                  <button type="submit" className="col-md-12 btn btn-register">submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
