import Link from 'next/link';

export default function NotFound ()  {
    
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
            <h1 className='text-light'>HALAMAN TIDAK DITEMUKAN</h1>
            <Link href='/'>Home</Link>
        </div>
    )
}