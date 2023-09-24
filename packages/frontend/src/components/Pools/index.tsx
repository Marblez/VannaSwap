import React, { use, useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import dayjs from 'dayjs'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { ethers } from 'ethers'
import { gql, useClient, useQuery } from 'urql';
import { std as calculateStandardDeviation } from 'mathjs'
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
const query = gql`
  query($blockNumber:Int!){
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",block:{ number: $blockNumber }) {
        tick
        token0Price
        token1Price
      }
    }

`
const Pools = (props: Props) => {
    const client = useClient()
    const [blockNumber, setBlockNumber] = useState(0)
    const [volatilityArray, setVolatilityArray] = useState([])
    const fetchBlockNumber = async () => {
        const provider = new ethers.JsonRpcProvider('https://docs-demo.quiknode.pro/')
        const _blockNumber = await provider.getBlockNumber()
        setBlockNumber(_blockNumber)
    }
    const getVolatility = async (block: number) => {
        const queryPromise = []
        for (let currentBlock = block; currentBlock > block - 300; currentBlock = currentBlock - 15) {
            console.log('currentBlock', currentBlock)
            const loadData = client.query(query, { blockNumber: currentBlock }).toPromise();
            queryPromise.push(loadData)
        }
        const data = await Promise.all(queryPromise)
        const priceData = data.map((item: any) => {
            return Number(item.data.pool.token0Price)
        })
        //calculate volatility for 5 days ,10 days and 20 days
        const volatilityArray = []
        console.log(priceData.slice(0, 5))
        console.log(calculateStandardDeviation(priceData.slice(0, 5)))
        volatilityArray.push(calculateStandardDeviation(priceData.slice(0, 5)))
        volatilityArray.push(calculateStandardDeviation(priceData.slice(0, 10)))
        volatilityArray.push(calculateStandardDeviation(priceData.slice(0, 20)))

        console.log(priceData)
        console.log(data)
        console.log(volatilityArray)
        //@ts-ignore
        setVolatilityArray([...volatilityArray])


    }
    useEffect(() => {
        fetchBlockNumber()
    }, [])
    useEffect(() => {
        if (blockNumber) {
            getVolatility(blockNumber)
        }
    }, [blockNumber])
    console.log('blockNumber', blockNumber)
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
                <div className='flex justify-end'>
                    {volatilityArray.length && `${(volatilityArray[0] * 100).toFixed(2)}% / ${(volatilityArray[1] * 100).toFixed(2)}% / ${(volatilityArray[2] * 100).toFixed(2)}%`}
                </div>
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