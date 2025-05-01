"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const InputDisposisi = () => {
  const [dataDisposisi, setDataDisposisi] = useState({
    tgl_surat: "",
    no_disposisi: "",
    no_surat: "",
    perihal: "",
    satfung: "",
    type_disposisi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataDisposisi((prev) => ({ ...prev, [name]: value }));
  };

  const fetchNumberDisposisi = async () => {
    try {
      const res = await fetch("/api/v1/disposisi/fetch");

      if (res.ok) {
        const data = await res.json();
        setDataDisposisi((prev) => ({
          ...prev,
          no_disposisi:
            data.no_disposisi || "tidak berhasil mengambil no disposisi",
        }));
      } else {
        console.error("Gagal mengambil data", res.status);
      }
    } catch (error) {
      console.error("Terjadi kesalahan", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Form
    if (
      !dataDisposisi.tgl_surat ||
      !dataDisposisi.no_disposisi ||
      !dataDisposisi.no_surat ||
      !dataDisposisi.perihal ||
      !dataDisposisi.satfung ||
      !dataDisposisi.type_disposisi
    ) {
      Swal.fire({
        title: "Error",
        text: "Form tidak lengkap, lengkapi terlebih dahulu!",
        icon: "error",
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      });
      return;
    }

    try {
      const response = await fetch("/api/v1/disposisi/input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataDisposisi),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Ambil data error jika status tidak 200
        Swal.fire({
          title: "Error",
          text: errorData.message || "Data gagal disimpan!",
          icon: "error",
          confirmButtonColor: "#72bf78",
          confirmButtonText: "OK",
          color: "#D9D9D9",
          background: "#212529",
        });
        return;
      }

      const result = await response.json();
      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil disimpan!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        color: "#D9D9D9",
        background: "#212529",
      });

      // reset form setelah submit
      setDataDisposisi({
        tgl_surat: "",
        no_disposisi: "",
        no_surat: "",
        perihal: "",
        satfung: "",
        type_disposisi: "",
      });

      // Ambil nomor disposisi terbaru jika data berhasil di kirimkan
      await fetchNumberDisposisi();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan pada server!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchNumberDisposisi();
  }, []);

  return (
    <div className="input-disposisi">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-5">
              <div className="card-body">
                <h2 className="card-title text-center">INPUT DISPOSISI</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Tanggal surat"
                    name="tgl_surat"
                    value={dataDisposisi.tgl_surat}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor disposisi"
                    name="no_disposisi"
                    value={dataDisposisi.no_disposisi}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor surat"
                    name="no_surat"
                    value={dataDisposisi.no_surat}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hal..."
                    name="perihal"
                    value={dataDisposisi.perihal}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Satfung"
                    name="satfung"
                    value={dataDisposisi.satfung}
                    onChange={handleChange}
                  />

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="type_disposisi"
                    value={dataDisposisi.type_disposisi}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Type Nota Dinas</option>
                    <option value="disposisi biasa">disposisi biasa</option>
                    <option value="disposisi BMP">disposisi BMP</option>
                    <option value="disposisi Harwat">disposisi Harwat</option>
                  </select>

                  <div className="button-InputDisposisi d-flex justify-content-between flex-columns">
                    <button className="btn col-md-5" type="submit">
                      submit
                    </button>
                    <button
                      className="btn reset col-md-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setDataDisposisi({
                          tgl_surat: "",
                          no_disposisi: "",
                          no_surat: "",
                          perihal: "",
                          satfung: "",
                          type_disposisi: "",
                        });
                      }}
                    >
                      reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDisposisi;
