import React from "react";
import jsPDF from 'jspdf'
import { FaPrint } from "react-icons/fa6";
import moment from "moment-timezone";


const GenaratePDF = ({ id }) => {
  
  const getDataById = async (id) => {
     try {
      const response = await fetch(`/api/v1/disposisi/getdisposisi?id=${id}`);
      if (!response.ok) {
        throw new Error(data.message || "RESPONSE DI GENERATE PDF ERROR CUY");
      }
      const data = await response.json();

      return data;
     } catch (error) {
        console.error("Error fetching data:", error);
     }
  }

  

  // Data contoh (gantikan dengan data dari API)
  const contohData = {
    tujuan: "KABAGLOG POLRES KARIMUN POLDA KEPRI",
    klasifikasi: "BIASA",
    derajat: "BIASA"
  };

  const generatePDF = async () => {
    try {
      // Mengambil data dari API
      const data  = await getDataById(id);

      const doc = new jsPDF();
    
      // Header
      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.text("POLRI DAERAH KEPULAUAN RIAU", 20, 15, { align: "left" });
      doc.text("RESOR KARIMUN", 55, 20, { align: "center" });
      doc.text("BAGIAN LOGISTIK", 55, 25, { align: "center" });
      const textWidth = doc.getTextWidth("POLRI DAERAH KEPUALAUAN RIAU");
      const startx = 57 - (textWidth / 2); // Pusatkan (jika teks di-center)
      const starty = 26; // Posisi Y garis (sesuaikan dengan teks)
      doc.setLineWidth(0.3);
      doc.line(startx, starty, startx + textWidth, starty);
      
      // Klasifikasi
      doc.setFontSize(10);
      doc.text(`KLASIFIKASI : ${contohData.klasifikasi} / RAHASIA`, 135, 35);
      doc.text(`DERAJAT    : ${contohData.derajat} / KILAT`, 135, 40);
      
      // Garis luar tabel
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(20, 45, 190, 45); //atas
      doc.line(20, 45, 20, 285); // Kiri
      doc.line(190, 45, 190, 285); // Kanan
      doc.line(20, 285, 190, 285); // Bawah
      
      // Judul Lembar Disposisi
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("LEMBAR DISPOSISI", 105, 50, { align: "center" });
      
      // Nomor dan Tanggal
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`No. Disposisi : ${data.no_disposisi}`, 22, 60);
      doc.text(`Diterima tgl  : ${moment.utc(data.createdAt).tz("Asia/Jakarta").format("DD-MM-YYYY - HH:mm:ss")}`, 126, 60);
      
      // Tabel Utama
      const startY = 70;
      
      // Header Tabel
      // doc.setFillColor(220, 220, 220);
      // doc.rect(20, startY, 85, 10, "F");
      // doc.rect(105, startY, 85, 10, "F");
      
      // garis atas dan bawah
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(20, startY, 190, startY); // Garis atas 
      doc.line(20, startY + 10, 190, startY + 10); // Garis bawah
      doc.setFont("helvetica", "bold");
      doc.text("CATATAN BAGLOG", 105, startY + 6, { align: "center" });
     
      
      // Isi Tabel
      doc.setFont("helvetica", "normal");
      const lineHeight = 7;
      let currentY = startY + 15;
      
      // Baris 1
      doc.text("Kapada Yth       :", 22, currentY); // 15 karakter
      doc.text(contohData.tujuan, 53, currentY);
      currentY += lineHeight;
      
      // Baris 2
      doc.text("Surat dari          :", 22, currentY); // 15 karakter
      doc.text(data.satfung, 53, currentY);
      currentY += lineHeight;
      
      // Baris 3
      doc.text("Nomor surat      :", 22, currentY); // 15 karakter
      doc.text(data.no_surat, 53, currentY);
      currentY += lineHeight;
      
      // Baris 4
      doc.text("Tanggal surat    :", 22, currentY); // 15 karakter
      doc.text(moment.utc(data.tgl_surat).tz("Asia/Jakarta").format("DD-MM-YYYY"), 53, currentY);
      currentY += lineHeight;
      
      // Baris 5 (Perihal multi-line)
      doc.text("Perihal               :", 22, currentY); // 15 karakter
      const perihalLines = doc.splitTextToSize(data.perihal, 120);
      doc.text(perihalLines, 53, currentY);
      currentY += (lineHeight * perihalLines.length);
      
      // Tabel bagian bawah
      const bottomTableY = currentY + 10;
      const colWidth = 85;
      const centerPage = 105; // Tengah halaman A4 (210mm/2)
      
      // 1. Teks "PELAKSANA TUGAS" di atas (rata tengah)
      doc.setFont("helvetica", "bold");
     
  
      // 2. Background abu-abu untuk header kolom
      // diganti dengan garis atas dan bawah
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(20, bottomTableY, 190, bottomTableY); // Garis atas
      doc.line(20, bottomTableY + 10, 190, bottomTableY + 10); // Garis bawah
      doc.line(centerPage, bottomTableY + 10, centerPage, bottomTableY + 50); // Garis tengah
    
      // 3. Teks header kolom (dengan jarak yang lebih lebar)
      doc.setFontSize(11); // Ukuran bisa disesuaikan
      doc.text("PELAKSANA TUGAS", centerPage, bottomTableY + 6, { align: "center" });
     
      // Isi bagian bawah
      doc.setFont("helvetica", "normal");
      const bottomContent = [
        ['[   ] KASUBBAGPAL'],
        ["[   ] PAURMIN"],
        ["[   ] PAURSUBBAGPAL"],
        ["[   ] BAMIN SAKTI"],
        ["[   ] BANUM"]
      ];
      const bottomContent2 = [
        ['[   ] KASSUBBAGFASKON'],
        ["[   ] PAURSUBBAGFASKON"],
        ["[   ] PPK"],
        ["[   ] BAMIN"], 
        ["[   ] BANUM"], 
      ];
      
      let bottomY = bottomTableY + 15;

      // Loop untuk kolom kiri (bottomContent)
      bottomContent.forEach((row) => {
        doc.text(row[0], 25, bottomY); // Kolom kiri dimulai dari x=25
        bottomY += lineHeight;
      });
      
      // Reset bottomY untuk kolom kanan (bottomContent2)
      bottomY = bottomTableY + 15;
      
      // Loop untuk kolom kanan (bottomContent2)
      bottomContent2.forEach((row) => {
        doc.text(row[0], 125, bottomY); // Kolom kanan dimulai dari x=125
        bottomY += lineHeight;
      });
  
      // garis pemisah antar kolong pelaksana tugas dan footer
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(20, bottomTableY + 50, 190, bottomTableY + 50);
      
      // Footer
      doc.setFontSize(10);
      doc.text("Tanggal", 30, bottomY + 5);
      doc.text("Paraf", 150, bottomY + 5);
  
      // garis tengah tanggal dan paraf
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(105, bottomY, 105, bottomY + 20);
  
      // garis pemisah
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(20, bottomY + 20, 190, bottomY + 20);
  
  
      doc.text("ISI DISPOSISI", 105, bottomY + 25, { align: "center" });
      
      // Buka di tab baru
      const pdfUrl = doc.output("bloburl");
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error('Error fetching data di functions generatePDF', error)
    }
   
  };

  return (
   <button className="btn-addtoprint" onClick={generatePDF}>
     <FaPrint/>
    </button>
  );
};

export default GenaratePDF;