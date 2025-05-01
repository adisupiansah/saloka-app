"use client";
import React, { useEffect, useState } from "react";

const CardView = () => {
  const [seluruhDataDisposisi, setSeluruhDataDisposisi] = useState(0);
  const [seluruhDataNotaDinas, setSeluruhDataNotaDinas] = useState(0);
  const [seluruhDataPengajuan, setSeluruhDataPengajuan] = useState(0)

  const [seluruhDisposisiBMP, setSeluruhDisposisiBMP] = useState(0);
  const [seluruhDisposisiHarwat, setSeluruhDisposisiHarwat] = useState(0);

  const [seluruhNotaDinasBMP, setSeluruhNotaDinasBMP] = useState(0);
  const [seluruhNotaDinasHarwat, setSeluruhNotaDinasHarwat] = useState(0);

  const [totalDisposisiBMPdanHarwat, setTotalDisposisiBMPdanHarwat] = useState(0);
  const [totalNotaDinasBMPdanHarwat, setTotalNotaDinasBMPdanHarwat] = useState(0);

  const hitungSeluruhData = async () => {
    try {
      // mnghitung seluruh data disposisi
      const response = await fetch('/api/v1/disposisi/getdisposisi')
      const data = await response.json();
      const result = data.length;
      setSeluruhDataDisposisi(result);

      // Menghitung seluruh data nota dinas
      const response2 = await fetch('/api/v1/notadinas/getnota')
      const data2 = await response2.json();
      const result2 = data2.length;
      setSeluruhDataNotaDinas(result2);

      // menghitung seluruh data pengajuan notadinas
      const response3 = await fetch('/api/client/ambildata')
      const data3 = await response3.json()
      const result3 = data3.length
      setSeluruhDataPengajuan(result3)


      // Menghiung Seluruh data disposisi BMP dan Harwat
      const harwatDisposisi = data.filter((item) => item.type_disposisi === 'disposisi Harwat').length;
      const bmpDisposisi = data.filter((item) => item.type_disposisi === 'disposisi BMP').length;
      // total keseluruhan data disoposisi BMP dan Harwat
      setTotalDisposisiBMPdanHarwat(harwatDisposisi + bmpDisposisi);
      setSeluruhDisposisiHarwat(harwatDisposisi);
      setSeluruhDisposisiBMP(bmpDisposisi);

      // Menghitung seluruh data nota dinas BMP dan Harwat
      const harwatNotaDinas = data2.filter((item) => item.type_notadinas === 'notadinas Harwat').length;
      const bmpNotaDinas = data2.filter((item) => item.type_notadinas === 'notadinas BMP').length;
      // total keseluruhan data nota dinas BMP dan Harwat
      setTotalNotaDinasBMPdanHarwat(harwatNotaDinas + bmpNotaDinas);
      setSeluruhNotaDinasHarwat(harwatNotaDinas);
      setSeluruhNotaDinasBMP(bmpNotaDinas);

    } catch (error) {
      console.log('Terdpat error saat menghitung data:', error);
      
    }
  }

  useEffect(() => {
    hitungSeluruhData();
  }, []);

  return (
    <div className="card-view">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">NOTA DINAS KELUAR</h5>
                <h1 className="title-ndkeluar">{seluruhDataNotaDinas}</h1>
                <div className="card-text">
                  Nota dinas keluar sebanyak{" "}
                  <span className="text-danger">{seluruhDataNotaDinas}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">DISPOSISI MASUK</h5>
                <h1 className="title-disposisi">{seluruhDataDisposisi}</h1>
                <div className="card-text-disposisi">
                  Disposisi masuk sebanyak <span className="">{seluruhDataDisposisi}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">PENGAJUAN NOTADINAS</h5>
                <h1 className="title-pengajuan">{seluruhDataPengajuan}</h1>
                <div className="card-text-pengajuan">
                  Pengajuan Nomr ND sebanyak <span className="">{seluruhDataPengajuan}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">
                  DISPOSISI MASUK
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className="col-md-6">HARWAT</span>
                    <span className="col-md-6">BMP</span>
                  </div>
                </h5>
                <h1 className="card-count-disposisi py-3 text-center">
                  <div className="d-flex justify-content-between">
                    <span className="col-md-6">{seluruhDisposisiHarwat}</span>
                    <span className="col-md-6 jumlah-bmp">{seluruhDisposisiBMP}</span>
                  </div>
                </h1>
                <div className="card-text-ndranmor">
                  Harwat dan BMP sebanyak
                  <span className=""> {totalDisposisiBMPdanHarwat}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">
                  NOTADINAS MASUK
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className="col-md-6">HARWAT</span>
                    <span className="col-md-6">BMP</span>
                  </div>
                </h5>
                <h1 className="card-count-notadinas py-3 text-center">
                  <div className="d-flex justify-content-between">
                    <span className="col-md-6">{seluruhNotaDinasHarwat}</span>
                    <span className="col-md-6 jumlah-bmp">{seluruhNotaDinasBMP}</span>
                  </div>
                </h1>
                <div className="card-text-ndharwat">
                  Harwat dan BMP sebanyak
                  <span className=""> {totalNotaDinasBMPdanHarwat}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardView;
