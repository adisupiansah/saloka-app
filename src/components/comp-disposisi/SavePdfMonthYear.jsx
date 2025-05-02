// components/MonthYearFilter.jsx
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment-timezone";
import Swal from "sweetalert2";

const MonthYearFilter = ({ data }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!month || !year) return;

    // Filter data berdasarkan bulan dan tahun dari createdAt
    const filtered = data.filter((item) => {
      const createdAt = moment(item.createdAt).tz("Asia/Jakarta");
      return createdAt.month() === parseInt(month) - 1 && createdAt.year() === parseInt(year);
    });

    if (filtered.length === 0) {
       Swal.fire({
        title: "Oops!",
        text: 'Tidak ada di bulan tersebut',
        icon: "error",
        background: '#1e1e1e',
        color: '#ffffff',
        confirmButtonColor: '#72bf78',
        confirmButtonText: 'OK'
       })
      return;
    }

    // Urutkan berdasarkan createdAt
    const sortedData = [...filtered].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    // Buat PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Judul PDF
    doc.setFont("helvetica");
    doc.setFontSize(16);

    // Nama file berdasarkan bulan dan tahun terpilih
    const monthName = moment().month(parseInt(month) - 1).format("MMMM");

    // Judul PDF dinamis berdasarkan bulan dan tahun terpilih
    const title = `DAFTAR DISPOSISI MASUK BULAN ${monthName.toUpperCase()} TAHUN ANGGARAN ${year}`;
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text(title, 53, 10); 

    // Data Tabel
    const tableData = sortedData.map((item, index) => [
      index + 1,
      moment(item.tgl_surat).format("DD-MM-YYYY"),
      item.no_disposisi,
      item.no_surat,
      item.perihal,
      item.satfung,
      moment(item.createdAt).tz("Asia/Jakarta").format("DD-MM-YYYY"),
      item.type_disposisi,
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
        0: { cellWidth: 10 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 60 },
        5: { cellWidth: 40 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
      },
      styles: {
        font: "helvetica",
        fontSize: 11,
        wrap: true,
      },
    });


    // const fileName = `disposisi_${monthName.toLowerCase()}_${year}.pdf`;
    // doc.save(fileName);

    // buka pdf di tab baru
    const pdfBlob = doc.output('blob')
    const pdfURL = URL.createObjectURL(pdfBlob)
    window.open(pdfURL, '_blank')

  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <select
        className="form-select"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      >
        <option value="">Pilih Bulan</option>
        {[
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ].map((m) => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString("id-ID", { month: "long" })}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="form-control"
        placeholder="Tahun"
        min="2020"
        max="2030"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <button type="submit" className="btn bg-blue-600 col-md-3 font-semibold text-md hover:bg-blue-700">
        Print
      </button>
    </form>
  );
};

export default MonthYearFilter;