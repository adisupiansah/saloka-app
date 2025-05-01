'use client'
import React, {useEffect} from 'react'
import Login from '@/components/comp-auth/Login'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '@/libs/Firebase';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/')
      }
    })

    return () => unsubscribe();
  }, [router])

  return (
    <div>
      <Login/>
    </div>
  )
}

export default page
