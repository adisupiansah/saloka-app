"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import EditDisposisi from "./EditDisposisi";
import GeneratePDF from "./GeneratePDF";
import moment from "moment-timezone";
import ExportPDFButton from "./ExportPdfButton";


const TableDisposisi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const ButtonSurat = () => {
    return (
      <Link href="/disposisi/input" className="btn buat-disposisi">
        input disposisi
      </Link>
    );
  };
  const DataTables = () => {
    let buatdisposisi = document.createElement("div");
    let root = createRoot(buatdisposisi);
    root.render(<ButtonSurat />);

    let exportPDFContainer = document.createElement("div");
    let exportPDFRoot = createRoot(exportPDFContainer);
    exportPDFRoot.render(<ExportPDFButton getFilteredData={getFilteredData} />);

    InitTable("#example", {
      language: {
        info: "Halaman _PAGE_ dari _PAGES_",
        infoEmpty: "tidak ada catatan yang tersedia",
        infoFiltered: "(difilter dari _MAX_ data)",
        lengthMenu: "_MENU_ banyak halaman",
        zeroRecords: "Data tidak ditemukan",
      },
      layout: {
        topStart: [
          {
            search: {
              placeholder: "Cari data",
            },
            pageLength: {
              menu: [
                [10, 25, 100, -1],
                [10, 25, 100, "All"],
              ],
            },
          },
        ],
        topEnd: [buatdisposisi, exportPDFContainer],
      },
    });
  };

  // save pdf berdasarkan filter data
  const getFilteredData = () => {
    const table = document.querySelector("#example");
    const rows = table.querySelectorAll("tbody tr");
    const filteredData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        tgl_surat: cells[1].innerText,
        no_disposisi: cells[2].innerText,
        no_surat: cells[3].innerText,
        perihal: cells[4].innerText,
        satfung: cells[5].innerText,
        createdAt: cells[6].innerText,
        type_disposisi: cells[7].innerText,
      };
    });
    return filteredData;
  }

  const ambilDataDisposisi = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");

      if (!response.ok) {
        throw new Error("Gagal mengambil data disposisi");
      }

      const hasil = await response.json();
      setData(hasil);
    } catch (error) {
      console.error("error saat mengambil data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async (id) => {
    Swal.fire({
      title: "Anda Yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72bf78",
      cancelButtonColor: "#c62e2e",
      confirmButtonText: "Ya, hapus data!",
      color: "#D9D9D9",
      background: "#212529",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/v1/disposisi/delete?id=${id}`, {
            method: "DELETE",
          });
          await response.json();
          if (!response.ok) {
            throw new Error("Gagal menghapus data");
          }
          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil dihapus",
            icon: "success",
            confirmButtonColor: "#72bf78",
            color: "#D9D9D9",
            background: "#212529",
          }).then(async (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
            ambilDataDisposisi();
          });
        } catch (error) {
          console.error("Error saat menghapus data", error);
          Swal.fire("Gagal", "Data gagal dihapus", "error");
        }
      }
    });
  };

  const handleEditData = (id) => {
    const edit = data.find((item) => item.id === id);
    setEditData(edit);
  };

  useEffect(() => {
    if (!loading && data.length > 0) {
      // Inisialisasi DataTables setelah data tersedia
      const table =  DataTables();
      if (table) {
        table.destroy()
      }
    }
  }, [loading, data]);
  useEffect(() => {
    ambilDataDisposisi();
  }, []);

  // use efeect untuk modal
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  });

  return (
    <>
      {/* modal disposisi */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Disposisi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditDisposisi data={editData} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="datatablesdisposisi" data-bs-theme="dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body table-responsive">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <table
                      className="table table-striped table-dark table-hover p-3 "
                      id="example"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Tanggal surat</th>
                          <th>Nomor disposisi</th>
                          <th>Nomor surat</th>
                          <th>Perihal</th>
                          <th>Satfung</th>
                          <th>Tanggal Disposisi</th>
                          <th>Type Disposisi</th>
                          <th>Print</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => {
                          // Konversi waktu UTC ke waktu Jakarta
                          const utcDate = new Date(item.createdAt);
                          const waktuJakarta = moment(utcDate).tz('Asia/Jakarta').format( 'DD-MM-YYYY - HH:mm:ss');
                          
                          const tglSurat = new Date(item.tgl_surat);
                          const tglSuratFormatted = moment(tglSurat).format("DD-MM-YYYY");
                          
                          return (
                            <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{tglSuratFormatted}</td>
                            <td>{item.no_disposisi}</td>
                            <td>{item.no_surat}</td>
                            <td>{item.perihal}</td>
                            <td>{item.satfung}</td>
                            <td>{waktuJakarta}</td>
                            <td>{item.type_disposisi}</td>
                            <td>
                             <GeneratePDF id={item.id} />
                            </td>
                            <td>
                              <button className="btn btn-sm btn-editdisposisi col-md-12" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEditData(item.id)}>
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-deletedisposisi col-md-12 mt-2"
                                onClick={() => handleDeleteData(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDisposisi;
