import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter()
  return (
    <div
      style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, black 45%)' }}
      className={`bg-gradient-radial flex h-[calc(100vh-48px)] flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center justify-end w-full py-0 px-0 pb-40 max-w-[min(720px,90%)] min-h-[535px] transition-opacity duration-250 ease-in-out h-[calc(100vh-120px)]">
        <div className='text-[64px] font-bold text-center mb-[24px] bg-gradient-to-r from-[#dbf3f6] to-[#21c5c4] text-transparent bg-clip-text'>
          Become an LP with confidence
        </div>
        <div className="text-[#9b9b9b] text-[20px] leading-6 font-semibold text-center max-w-[500px] mb-[32px]">
          Buy, sell, and explore your favorite tokens.
        </div>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            router.push('/swap')
          }} className={`flex justify-center items-center rounded-full w-[300px] py-[16px] bg-gradient-to-r from-[#21c5c4] to-[#dbf3f6] border-none text-white transition-all duration-250 ease-in-out hover:scale-105 ${isHovered ? 'shadow-custom' : ''}`}>
          <p className='text-[20px]'>Get started</p>
        </button>
      </div>

    </div >
  )
}
