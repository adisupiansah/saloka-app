import InputNotaDinas from '@/components/comp-notadinas/InputNotaDinas'
import Title from '@/components/comp-title/Title'
import React from 'react'

const Input = () => {
  return (
    <div>
      <Title title={"Nota dinas"} subTitle={"nota dinas > input"}/>
      <InputNotaDinas/>
    </div>
  )
}

export default Input
