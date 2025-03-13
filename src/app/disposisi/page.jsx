import CardDisposisi from '@/components/comp-disposisi/CardDisposisi'
import TableDisposisi from '@/components/comp-disposisi/TableDisposisi'
import Tables from '@/components/comp-disposisi/Tables'
import Title from '@/components/comp-title/Title'
import React from 'react'


const page = () => {

  return (
    <div> 
      <Title title={"Disposisi"} subTitle={"disposisi > dashboard"}/>
      <CardDisposisi/>
      <Tables/>
    </div>
  )
}

export default page
