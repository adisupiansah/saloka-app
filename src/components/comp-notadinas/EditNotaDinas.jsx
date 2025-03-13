import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditNotaDinas = ({ data }) => {
  const [formData, setFormData] = useState({
    tgl_surat: "",
    no_surat: "",
    kepada: "",
    perihal: "",
    type_notadinas: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        tgl_surat: data.tgl_surat || "",
        no_surat: data.no_surat || "",
        kepada: data.kepada || "",
        perihal: data.perihal || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // buat objek FormData untuk mengedit data & file
      const formDataObj = new FormData();
      formDataObj.append("id", data.id); // tambahkan ID dari data yang diterima
      formDataObj.append("tgl_surat", formData.tgl_surat);
      formDataObj.append("no_surat", formData.no_surat);
      formDataObj.append("kepada", formData.kepada);
      formDataObj.append("perihal", formData.perihal);
      formDataObj.append("type_notadinas", formData.type_notadinas);
  
      const response = await fetch("/api/v1/notadinas/edit", {
        method: "PUT",
        body: formDataObj,
      });
      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil di edit",
          icon: "success",
          confirmButtonColor: "#72bf78",
          confirmButtonText: "OK",
          color: "#D9D9D9",
          background: "#212529",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      } else {
        const error = await response.json();
        Swal.fire({
          title: "Error",
          text: error.message || "Terjadi kesalahan saat mengedit data",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Eror saat edit data:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan pada server",
        icon: "error",
      });
    }
  };

    return (
    <div className="form-editnotadinas">
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Tanggal Surat</label>
          <input
            type="date"
            className="form-control"
            name="tgl_surat"
            value={formData.tgl_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Nomor Surat</label>
          <input
            type="text"
            className="form-control"
            name="no_surat"
            value={formData.no_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Kepada</label>
          <input
            type="text"
            className="form-control"
            name="kepada"
            value={formData.kepada}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Perihal</label>
          <input
            type="text"
            className="form-control"
            name="perihal"
            value={formData.perihal}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Type Nota dinas</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="type_notadinas"
            value={formData.type_notadinas}
            onChange={handleInputChange}
          >
            <option value="">Pilih Type Nota Dinas</option>
            <option value="notadinas biasa">notadinas biasa</option>
            <option value="notadinas BMP">notadinas BMP</option>
            <option value="notadinas Harwat">notadinas Harwat</option>
          </select>
        </div>
        
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className="btn btn-editnotadinas col-md-6">simpan</button>
        </div>
      </form>
    </div>
  );
};

export default EditNotaDinas;
