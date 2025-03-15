'use client'
import React from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Pastikan ini diimpor
import moment from "moment-timezone";

const ExportPdfNotaDinas = ({data}) => {

    const handleExportPDF = () => {
        // urutkan data berdasarkan createdAt dari teelama hingga terbaru
        const sortedData = [...data].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
    
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });
    
        // Judul PDF
        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.text("DAFTAR NOMOR NOTA DINAS KELUAR TAHUN ANGGARAN 2025", 55, 10);
    
        // Konversi data ke format yang sesuai untuk AutoTable
        const tableData = sortedData.map((item) => [
          item.tgl_surat || "-",
          item.no_surat || "-",
          item.kepada || "-",
          item.perihal || "-",
          item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY") : "-",
          item.type_notadinas || "-",
        ]);
    
        // Generate tabel menggunakan AutoTable
        autoTable(doc, {
          head: [
            [
              "Tanggal Surat",
              "Nomor Surat",
              "Kepada",
              "Perihal",
              "Tanggal input",
              "Type Nota dinas",
            ],
          ],
          body: tableData,
          startY: 20,
          columnStyles: {
            0: { cellWidth: 1 * 28.0 }, // lebar kolom tanggal surat
            1: { cellWidth: 1.3 * 28.0 }, // lebar kolom Nomor Surat
            2: { cellWidth: 1.3 * 28.0 }, // lebar kolom Nomor Kepada
            3: { cellWidth: 3 * 28.0 }, // lebar kolom perihal
            4: { cellWidth: 1 * 28.0 }, // lebar kolom tanggal Input
            5: { cellWidth: 1 * 28.0 }, // lebar kolom type Nota dinas
          },
          styles: {
            font: "helvetica",
            fontSize: 11,
          },
          margin: { top: 20, right: 15, bottom: 20, left: 15 }, // Margin halaman
          padding: 5,
        });
    
        // Simpan PDF
        doc.save("daftar-notadinas.pdf");
      };

  return (
    <button className='btn btn-deletedisposisi' onClick={handleExportPDF}>
        save pdf
    </button>
  )
}

export default ExportPdfNotaDinas
