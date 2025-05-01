'use client'
import TableArsip from '@/components/comp-notadinas/TableArsip'
import Title from '@/components/comp-title/Title'
import { useRouter } from 'next/navigation'
import React, {useEffect} from 'react'

import Swal from 'sweetalert2'

const Arsip = () => {
  const router = useRouter()

  const pesan = () => {
    Swal.fire({
      title: 'Error',
      text: 'Mohon Maaf Halaman Ini Sedang Dalam Perbaikan',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: "#72bf78",
      allowOutsideClick: false,
      allowEscapeKey: false,
      color: "#D9D9D9",
      background: "#212529",
    }).then((reslut) => {
      if (reslut.isConfirmed) {
        router.push('/admin/notadinas')
      }
    })

    return null
  }

  useEffect(() => {
    pesan()
  }, [router])

  return (
    <div>
      <Title title={"Nota Dinas"} subTitle={"nota dinas > arsip"}/>
      <TableArsip/>
    </div>
  )
}

export default Arsip
