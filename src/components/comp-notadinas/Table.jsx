'use client'
import React from 'react'
import dynamic from "next/dynamic"

const TableNotaDinas = dynamic(()=> import('./TablesNotadinas'), {ssr: false})
const Table = () => {
  return (
    <div>
      <TableNotaDinas/>
    </div>
  )
}

export default Table
