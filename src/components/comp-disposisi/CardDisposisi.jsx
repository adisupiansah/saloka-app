"use client";
import React, { useState, useEffect } from "react";
import ChartDisposisi from "./ChartDisposisi";

const CardDisposisi = () => {
  const [hitung, setHitung] = useState(0);
  const [hitungHarwat, setHitungHarwat] = useState(0);
  const [hitungBMP, setHitungBMP] = useState(0);

  const hitungSeluruhData = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");
      const data = await response.json();
      setHitung(data.length);

      //menghitung jumlah data berdasarkan berdasarkan type_disposisi
      const HarwatCount = data.filter(
        (item) => item.type_disposisi === "disposisi Harwat"
      ).length;
      const BMPCount = data.filter(
        (item) => item.type_disposisi === "disposisi BMP"
      ).length;
      setHitungHarwat(HarwatCount);
      setHitungBMP(BMPCount);
    } catch (error) {
      console.error("Terdapat Error saat menghitung seluruh data:", error);
    }
  };

  useEffect(() => {
    hitungSeluruhData();
  }, []);

  return (
    <div className="card-disposisi">
      <div className="container">
        <div className="row ">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className="card disposisi w-100">
              <div className="card-body">
                <h5 className="card-title p-2">SELURUH DISPOSISI</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <h1 className="card-text py-3">{hitung}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center ">
            <div className="card disposisi w-100">
              <div className="card-body">
                <h5 className="card-title-bmp p-2 text-center">
                  BANYAK DISPOSISI
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className="col-md-6">HARWAT</span>
                    <span className="col-md-6">BMP</span>
                  </div>
                </h5>
                <h1 className="card-text-bmp py-3 text-center">
                  <div className="d-flex justify-content-between">
                    <span className="col-md-6">{hitungHarwat}</span>
                    <span className="col-md-6 jumlah-bmp">{hitungBMP}</span>
                  </div>
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <ChartDisposisi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisposisi;
