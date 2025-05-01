import PengajuanNotaDinas from '@/components/comp-notadinas/Pengajuan'
import Title from '@/components/comp-title/Title'
import React from 'react'
import TablePengajuan from '@/components/comp-notadinas/TablePengajuan'
const Pengajuan = () => {
  return (
    <div>
      <Title title={"Nota dinas"} subTitle={"nota dinas > pengajuan"}/>
      <TablePengajuan/>
    </div>
  )
}

export default Pengajuan
