// ExportPDFButton.jsx
import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment-timezone";

const ExportPDFButton = ({ getFilteredData }) => {
  const handleExportPDF = () => {
    const filteredData = getFilteredData(); // Ambil data yang difilter

    // Urutkan berdasarkan createdAt (jika diperlukan)
    const sortedData = [...filteredData].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("DAFTAR DISPOSISI MASUK TAHUN ANGGARAN 2025", 80, 10);

    // Konversi data ke format yang sesuai untuk AutoTable
    const tableData = sortedData.map((item, index) => [
      index + 1,
      item.tgl_surat || "-",
      item.no_disposisi || "-",
      item.no_surat || "-",
      item.perihal || "-",
      item.satfung || "-",
      item.createdAt || '-',
      item.type_disposisi || "-",
    ]);

    // Generate tabel
    autoTable(doc, {
      head: [
        [
          "No",
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
      theme: "striped",
      margin: { top: 20, right: 15, bottom: 5, left: 20 },
      columnStyles: {
        0: { cellWidth: 10 }, // "No"
        1: { cellWidth: 25 }, // Tanggal Surat
        2: { cellWidth: 30 }, // Nomor Disposisi
        3: { cellWidth: 30 }, // Nomor Surat
        4: { cellWidth: 60 }, // Perihal
        5: { cellWidth: 40 }, // Satfung
        6: { cellWidth: 30 }, // Tanggal Disposisi
        7: { cellWidth: 30 }, // Type Disposisi
      },
      styles: {
        font: "helvetica",
        fontSize: 11,
      },

    });

    doc.save("disposisi_masuk.pdf");
  };

  return (
    <button onClick={handleExportPDF} className="btn btn-deletedisposisi">
      Save PDF
    </button>
  );
};

export default ExportPDFButton;