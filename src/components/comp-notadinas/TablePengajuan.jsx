'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Pengajuan = dynamic(() => import('./Pengajuan'), { ssr: false })

const TablePengajuan = () => {
  return (
    <div>
      <Pengajuan/>
    </div>
  )
}

export default TablePengajuan
