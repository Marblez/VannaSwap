import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div
      className={`flex h-[calc(100vh-48px)] flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="absolute flex flex-col items-center justify-end w-full py-0 px-0 pb-40 max-w-[min(720px,90%)] min-h-[535px] z-990 transition-opacity duration-250 ease-in-out h-[calc(100vh-120px)] pointer-events-none">
        <div className='m-btext-[64px] font-bold text-center mb-24 bg-gradient-to-r from-[#dbf3f6] to-[#21c5c4] text-transparent bg-clip-text'>
          Become an LP with confidence
        </div>
      </div>

    </div>
  )
}
