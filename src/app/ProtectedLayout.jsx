"use client"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/libs/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isVerified = sessionStorage.getItem('verified') === 'true';
      
      if (user && !isVerified) {
        router.push('/auth?step=2');

      } else if (!user) {
        router.push('/auth');

      }
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loader">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  };

  return <>{children}</>; // Render halaman setelah cek auth
};

export default ProtectedLayout;
