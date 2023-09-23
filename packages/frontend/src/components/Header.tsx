import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router'
import Image from 'next/image';

type Props = {}

const Header = (props: Props) => {
    const router = useRouter()
    return (
        <div className='p-4 flex w-full justify-between'>
            <div className='flex gap-5 items-center text-[#9b9b9b]'>
                <div className='cursor-pointer' onClick={() => {
                    router.push('/')
                }}>
                    <Image alt='logo' src='/logo.png' width={50} height={50} />
                </div>
                <div
                    className='p-2 rounded-xl hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer'
                    onClick={() => {
                        router.push('/swap')
                    }}>
                    Swap
                </div>
                <div
                    className='p-2 rounded-xl hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer'

                    onClick={() => {
                        router.push('/pool')
                    }}>
                    Pool
                </div>
            </div>
            <ConnectButton />
        </div>
    )
}

export default Header