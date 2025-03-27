import React from "react";
import  jsPDF  from "jspdf";
import templateImage from "@/app/img/template.jpg";
import { FaPrint } from "react-icons/fa6";
import moment from "moment-timezone";

// INI ADALAH GENERATE PDF YANG LAMA, MASI MENGGUNAKAN FORMAT LAMA MENGGUNAKAN GAMBAR SEBAGAI TEMPLATE TABLE

const GeneratePDF = ({ id }) => {
  // Fungsi untuk mendapatkan data disposisi berdasarkan ID
  const getDataById = async (id) => {
    try {
      const response = await fetch(`/api/v1/disposisi/getdisposisi?id=${id}`); // Endpoint untuk data berdasarkan ID
      if (!response.ok) {
        throw new Error("Gagal mengambil data disposisi");
      }
      const hasil = await response.json();
      return hasil;
    } catch (error) {
      console.error("Error saat mengambil data disposisi:", error);
      throw error;
    }
  };

  const hasilPDF = async () => {
    try {
      // Ambil data berdasarkan ID
      const contohData = await getDataById(id);

      // Buat dokumen PDF
      const doc = new jsPDF("p", "mm", "a4");
      // Atur font menjadi Helvetica
      doc.setFont("helvetica"); // Mengatur font ke Helvetica
      doc.setFontSize(12); // Mengatur ukuran font

      // Tambahkan gambar template sebagai latar belakang
      const img = new Image();
      img.src = templateImage.src; // Gunakan properti src dari object templateImage
      img.onload = () => {
        doc.addImage(img, "JPEG", 0, 0, 210, 297); // Gambar template memenuhi ukuran A4 (210x297 mm)

        //  no disposisi dan tanggal disposisi di atas table
        doc.setFontSize(11.5);
        doc.text(contohData.no_disposisi || "-", 35, 52.7); // Data dinamis
        // conversi waktu UTC ke Jakkarta
        const waktuJakarta = moment.utc(contohData.tgl_disposisi).tz("Asia/Jakarta").format("DD-MM-YYYY - HH:mm:ss");
        doc.text(waktuJakarta || "-", 133, 52.7); // Data dinamis

        const satfungText = doc.splitTextToSize(contohData.satfung || "-", 66);
        doc.text(satfungText, 40, 72.8);

        const nosurattext = doc.splitTextToSize(contohData.no_surat || "-", 66 ); 
        doc.text(nosurattext, 40, 87.4); 

        doc.text(contohData.tgl_surat || "-", 40, 102); // Data dinamis // 40 lebar kiri 87 atas bawah

        const perihalText = doc.splitTextToSize(contohData.perihal || "-", 68); // Pecah teks panjang
        doc.text(perihalText, 40, 111.5); // Data dinamis multi-line

        // Membuka di tab baru
        const pdfBlobURL = doc.output("bloburl"); // Membuat blob URL
        window.open(pdfBlobURL, "_blank"); // Membuka di tab baru
      };
    } catch (error) {
      console.error("Error saat membuat PDF:", error);
    }
  };

  return (
    <button className="btn-addtoprint" onClick={hasilPDF}>
      <FaPrint/>
    </button>
  );
};

export default GeneratePDF;
