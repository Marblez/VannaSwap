import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import dayjs from 'dayjs'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

type Props = {}
const PoolsContainer = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    border-radius: 16px;
    padding: 1rem;
    background-color: rgb(25, 27, 31);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:10px;
`
const Divider = styled.div`
    height: 1px;
    background-color: rgb(31, 33, 40);
    width: 100%;
`
const Badge = styled.div`
    box-sizing: border-box;
    min-width: 0px;
    font-size: 12px;
    width: fit-content;
    border-radius: 8px;
    background: rgb(64, 68, 79);
    color: rgb(255, 255, 255);
    padding: 4px 6px;
    font-weight: 400;
`
const Pools = (props: Props) => {
    return (
        <PoolsContainer>
            <div className="grid grid-cols-6 gap-4">
                <div className='flex justify-start'>#</div>
                <div className='flex justify-start'>Pool</div>
                <div className='flex justify-end'>TVL</div>
                <div className='flex justify-end'>Volatility</div>
                <div className='flex justify-end'>Fee</div>
                <div className='flex justify-end'>Last Update</div>
            </div>
            <Divider />
            <div className="grid grid-cols-6 gap-4 text-white">
                <div className='flex justify-start'>1</div>
                <div className='flex justify-start items-center gap-2'>
                    <div className='flex items-center'>
                        <Image src='/usdc-logo.png' width={16} height={16} alt='' />
                        <Image src='/eth-logo-1.png' width={16} height={16} alt='' />
                    </div>
                    <div >
                        USDC/ETH
                    </div>
                    <div>
                        <Badge>Dynamic</Badge>
                    </div>
                </div>
                <div className='flex justify-end'>$225.37m</div>
                <div className='flex justify-end'>10% / 13.7% / 9.9%</div>
                <div className='flex justify-end items-center gap-2'>
                    <div className='flex items-center text-green-300'>
                        <BsArrowUpShort size={20} />
                        <div>
                            24%
                        </div>
                    </div>
                    2.97%
                </div>
                <div className='flex justify-end'>{new Date().toLocaleString()}</div>
            </div>
        </PoolsContainer>
    )
}

export default Pools