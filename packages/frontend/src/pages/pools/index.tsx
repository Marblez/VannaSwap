import React from 'react'
import styled from 'styled-components'

type Props = {}
const PoolsContainer = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    border-radius: 16px;
    padding: 1rem;
    background-color: rgb(25, 27, 31);
    width: 100%;
`
const TitleContainer = styled.div`
    display: grid;
    gap: 1em;
    -webkit-box-align: center;
    align-items: center;
    grid-template-columns: 20px 3.5fr repeat(3, 1fr);

`
const index = (props: Props) => {
    return (
        <div className='flex justify-center items-center'>
            <div className='max-w-[1200px]' style={{ width: '90%' }}>
                <div className='flex flex-col gap-[24px] text-[#c3c5cb]'>
                    <div>All Pools</div>
                    <PoolsContainer>
                        <TitleContainer>

                        </TitleContainer>
                    </PoolsContainer>
                </div>
            </div>
        </div>
    )
}

export default index