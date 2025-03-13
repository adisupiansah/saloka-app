import React from 'react';
import CardNotaDinas from '@/components/comp-notadinas/CardNotaDinas'
// import TablesNotadinas from '@/components/comp-notadinas/TablesNotadinas'
import Title from '@/components/comp-title/Title'
import Table from '@/components/comp-notadinas/Table';

const page = () => {

  return (
    <div>
        <Title title={"Nota dinas"} subTitle={"nota dinas > dashboard"}/>
        <CardNotaDinas/>
        <Table/>
    </div>
  )
}

export default page
