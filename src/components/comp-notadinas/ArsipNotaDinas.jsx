"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { createRoot } from "react-dom/client";
import InitTable from "@/libs/datatables-config";

const ArsipNotaDinas = () => {
  const BackToDashboard = () => {
    return (
      <Link href="#" className="btn back-dashboard-arsip">
        Dashboard
      </Link>
    );
  };

  useEffect(() => {
    let Dashboard = document.createElement("div");
    let root = createRoot(Dashboard);
    root.render(<BackToDashboard />);

    InitTable("#tableArsip", {
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
        topEnd: Dashboard,
      },
    });
  }, []);

  return (
    <div className="arsip-notadinas" data-bs-theme="dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
              <table className="table table-striped p-3 " id="tableArsip">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011-04-25</td>
                      <td>$320,800</td>
                    </tr>
                    <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>2011-07-25</td>
                      <td>$170,750</td>
                    </tr>
                  </tbody>
              </table>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArsipNotaDinas;
