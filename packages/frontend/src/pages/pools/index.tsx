
import dynamic from 'next/dynamic';
import React from 'react'
import { IoIosAdd } from 'react-icons/io'
const Pools = dynamic(() => import('@/components/Pools'), {
    suspense: true, ssr: false
});
type Props = {}

const index = (props: Props) => {
    return (
        <div className='flex justify-center items-center'>
            <div className='max-w-[1200px]' style={{ width: '90%' }}>
                <div className='flex flex-col gap-[24px] text-[#c3c5cb]'>
                    <div className='flex justify-between items-center'>
                        <div>All Pools</div>
                        <div className='flex items-center gap-2 bg-[#22d3ee] p-2 rounded-xl text-white text-md'>
                            <IoIosAdd size={25} />
                            <div>Add liquidity</div>
                        </div>
                    </div>
                    <Pools />
                </div>
            </div>
        </div>
    )
}

export default index