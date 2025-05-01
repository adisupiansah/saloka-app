"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import EditNotaDinas from "./EditNotaDinas";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import moment from "moment-timezone";
import $ from "jquery";
import "datatables.net"; // Inti DataTables
import "datatables.net-bs5"; // Bootstrap 5 DataTables
import { createRoot } from "react-dom/client";
import ExportPdfNotaDinas from "./ExportPdfNotaDinas";

const TablesNotadinas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // state untuk loading
  const [editData, setEditData] = useState(null);

  const ambilData = async () => {
    try {
      const response = await fetch("/api/v1/notadinas/getnota");
      if (!response.ok) {
        throw new Error("gagal fetch data");
      }
      const hasil = await response.json();
      setData(hasil);
    } catch (error) {
      console.error("error saat mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditData = (id) => {
    const edit = data.find((item) => item.id === id);
    setEditData(edit);
  };

  const handleDeleteData = async (id) => {
    Swal.fire({
      title: "Anda yakin?",
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
          const response = await fetch(`/api/v1/notadinas/delete?id=${id}`, {
            method: "DELETE",
          });

          await response.json();
          if (!response.ok) {
            throw new Error("gagal hapus data");
          }

          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil dihapus",
            icon: "success",
            confirmButtonColor: "#72bf78",
            color: "#D9D9D9",
            background: "#212529",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
            ambilData();
          });
        } catch (error) {
          console.error("error saat menghapus data:", error);
          Swal.fire("Gagal", "data gagal dihapus", "error");
        }
      }
    });
  };

  const InisialisasiTable = () => {

    let buttonSavePdf = document.createElement('div')
    let root = createRoot(buttonSavePdf)
    root.render(<ExportPdfNotaDinas data={data} />)

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
        topEnd: buttonSavePdf,
        bottomEnd: ["paging"],
      },
      scrollX: true,
    });
  };
  const action = (rowData) => {
    return (
      <div>
        <button
          className="btn btn-sm action-edit col-md-12 mt-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => handleEditData(rowData.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm action-delete col-md-12 mt-2"
          onClick={() => handleDeleteData(rowData.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const WaktuJakarta = (rowData) => {
    const UTCwaktu = new Date(rowData.createdAt);
    const waktuJakarta = moment(UTCwaktu)
      .tz("Asia/Jakarta")
      .format("DD-MM-YYYY - HH:mm:ss");
    return waktuJakarta;
  };

  useEffect(() => {
    if (!loading && data.length > 0) {
      const table = InisialisasiTable();
      if (table) {
        table.destroy();
      }
    }
  }, [loading, data]);

  // ambil data saat komponen dimuat
  useEffect(() => {
    ambilData();
  }, []);

  // useEffect modal
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      {/* modal */}
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
                Edit Nota Dinas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditNotaDinas data={editData} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="datatables" data-bs-theme="dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <table
                      className="table table-striped table-dark p-3"
                      id="example"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Tanggal Surat</th>
                          <th>Nomor Surat</th>
                          <th>Kepada</th>
                          <th>Hal</th>
                          <th>Tanggal Input</th>
                          <th>Type Notadinas</th>
              
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.tgl_surat}</td>
                            <td>{item.no_surat}</td>
                            <td>{item.kepada}</td>
                            <td>{item.perihal}</td>
                            <td>{WaktuJakarta(item)}</td>
                            <td>{item.type_notadinas}</td>
                    
                            <td>{action(item)}</td>
                          </tr>
                        ))}
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

export default TablesNotadinas;
