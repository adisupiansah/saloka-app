'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const TableDisposisi = dynamic(() => import('./TableDisposisi'), { ssr: false })

const Tables = () => {
  return (
    <div>
      <TableDisposisi/>
    </div>
  )
}

export default Tables
