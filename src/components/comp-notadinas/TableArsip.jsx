'use client'
import React from 'react'
import dynamic from 'next/dynamic'


const ArsipND = dynamic(() => import('./ArsipNotaDinas'), { ssr: false })
const TableArsip = () => {
  return (
    <div>
      <ArsipND/>
    </div>
  )
}

export default TableArsip
