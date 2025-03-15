"use client";
import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Pastikan ini diimpor
import moment from "moment-timezone";

const ExportPDFButton = ({ data }) => {
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
    doc.text("DAFTAR DISPOSISI MASUK TAHUN ANGGARAN 2025", 80, 10);

    // Konversi data ke format yang sesuai untuk AutoTable
    const tableData = sortedData.map((item) => [
      item.tgl_surat || "-",
      item.no_disposisi || "-",
      item.no_surat || "-",
      item.perihal || "-",
      item.satfung || "-",
      item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY") : "-",
      item.type_disposisi || "-",
    ]);

    // Generate tabel menggunakan AutoTable
    autoTable(doc, {
      head: [
        [
          "Tanggal Surat",
          "Nomor Disposisi",
          "Nomor Surat",
          "Perihal",
          "Satfung",
          "Tanggal Disposisi",
          "Type Disposisi",
        ],
      ],
      body: tableData,
      startY: 20,
      columnStyles: {
        0: { cellWidth: 1 * 28.0 }, // lebar kolom tanggal surat
        1: { cellWidth: 1.3 * 28.0 }, // lebar kolom Nomor disposisi
        2: { cellWidth: 1.3 * 28.0 }, // lebar kolom Nomor surat
        3: { cellWidth: 3 * 28.0 }, // lebar kolom perihal
        4: { cellWidth: 1 * 28.0 }, // lebar kolom satfung
        5: { cellWidth: 1 * 28.0 }, // lebar kolom tanggal disposisi
        6: { cellWidth: 1 * 28.0 }, // lebar kolom type disposisi
      },
      styles: {
        font: "helvetica",
        fontSize: 11,
      },
      margin: { top: 20, right: 15, bottom: 20, left: 15 }, // Margin halaman
      padding: 5,
    });

    // Simpan PDF
    doc.save("daftar-disposisi.pdf");
  };

  return (
    <button onClick={handleExportPDF} className="btn btn-deletedisposisi">
      save pdf
    </button>
  );
};

export default ExportPDFButton;
