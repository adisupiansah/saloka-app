"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables); // Registrasi semua modul Chart.js

const ChartDisposisi = () => {
    const [hitung, setHitung] = useState(0)
    const [hitungHarwat, setHitungHarwat] = useState(0)
    const [hitungBMP, setHitungBMP] = useState(0)
    const chartRef = useRef(null)
    const chart = useRef(null)

    const InisialisasiChart =() => {
        if (chart.current) {
            chart.current.destroy()
        }

        const ctx = chartRef.current.getContext('2d')
        const data = {
            labels: [
                'SELURUH DISPOSISI',
                'DISPOSISI HARWAT',
                'DISPOSISI BMP'
            ],
            datasets: [
                {
                    label: 'Jumlah',
                    data: [hitung, hitungHarwat, hitungBMP],
                    backgroundColor : [
                        'rgb(114, 191, 120)',
                        'rgb(198, 46, 46)',
                        'rgb(250, 188, 63)'
                    ],
                    hoverOffset: 4
                }
            ]
        }

        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

        chart.current = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
        })

    }

    const hitungSeluruhChart = async () => {
        try {
            const response = await fetch('/api/v1/disposisi/getdisposisi')
            const data = await response.json()
            const result = data.length
            setHitung(result)

            // hitung data disposisi berdasarkan type_notadinas
            const harwatCount = data.filter((item) => item.type_disposisi === 'disposisi Harwat').length
            const BMPCount = data.filter((item) => item.type_disposisi === 'disposisi BMP').length

            setHitungHarwat(harwatCount)
            setHitungBMP(BMPCount)

        } catch (error){
            console.error("Terjadi kesalahan saat menghitung data:", error);
        }
    }
    
    useEffect(() => {
      InisialisasiChart()
    }, [hitung])

    useEffect(() => {
        hitungSeluruhChart()
    }, [])


  return (
    <div className='card-ChartDisposisi'>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center">

                        <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChartDisposisi
