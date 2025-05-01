import InputDisposisi from '@/components/comp-disposisi/InputDisposisi'
import Title from '@/components/comp-title/Title'
import React from 'react'

const Input = () => {
  return (
    <div>
      <Title title={"Disposisi"} subTitle={"diposisi > input"}/>
      <InputDisposisi/>
    </div>
  )
}

export default Input
