
import dynamic from 'next/dynamic'
import React from 'react'
const Swap = dynamic(() => import('@/components/Swap'), { suspense: true });

type Props = {}

const index = (props: Props) => {
    return (
        <div className='flex justify-center items-center'>
            <Swap />
        </div>
    )
}

export default index