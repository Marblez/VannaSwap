import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdSettings } from 'react-icons/md';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import Image from 'next/image';
import { gql, useQuery } from 'urql';
type Props = {}
const WidgetContainer = styled.div`
    padding: 68px 8px 0px;
    max-width: 480px;
    width: 100%;
`
const WidgetBox = styled.div`
    position: relative;
    background: rgb(19, 19, 19);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 12px 8px 8px;
    box-shadow: rgba(34, 211, 238, 0.08) 0px 0px 10px 0px, rgba(34, 211, 238, 0.18) 0px 40px 120px 0px;
    z-index: 1;
    transition: transform 250ms ease 0s;
`
const ActionContainer = styled.div`
    margin-bottom: 10px;
    justify-content: space-between;
    display: flex;
    align-items: center;
`
const SwapContainer = styled.div<{ focus: boolean }>`
    background-color: #1b1b1b;
    border-radius: 16px;
    color: rgb(155, 155, 155);
    font-size: 14px;
    font-weight: 500;
    height: 120px;
    line-height: 20px;
    padding: 16px;
    position: relative;
    border:1px solid ${({ focus }) => (focus ? "#b8c0dc3d" : "rgb(27, 27, 27)")};

    
`
const SwapInnerContainer = styled.div`
    display: flex;
    flex-flow: column;
    position: relative;
    border-radius: 20px;
    z-index: 1;
    width: initial;
    transition: height 1s ease 0s;
    will-change: height;

`
const SwitchContainer = styled.div`
    border-radius: 12px;
    height: 40px;
    width: 40px;
    position: relative;
    margin: -18px auto;
    background-color: rgb(27, 27, 27);
    border: 4px solid rgb(19, 19, 19);
    z-index: 2;
`
const SwitchBox = styled.div`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`
const TextContainer = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 485;
    font-size: 14px;
    color: rgb(155, 155, 155);
`
const InputContainer = styled.div`
    display: flex;
    flex-flow: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
`
const StyledInput = styled.input`
    filter: none;
    opacity: 1;
    transition: opacity 250ms ease-in-out 0s;
    text-align: left;
    font-size: 36px;
    font-weight: 485;
    max-height: 44px;
    color: rgb(255, 255, 255);
    pointer-events: auto;
    width: 0px;
    position: relative;
    font-weight: 485;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
    text-align: left;
`
const TokenContainer = styled.div`
    display: inline-block;
    height: inherit;
`
const TokenBox = styled.span`
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border-radius: 16px;
    background-color: rgb(19, 19, 19);
    color: rgb(255, 255, 255);
    padding: 4px 8px 4px 4px;

`
const IconBox = styled.div`
    width: 24px;
    height: 24px;
    background: none;
    transition: background-color 250ms ease-in 0s;
    box-shadow: white 0px 0px 1px;
    border-radius: 50%;
    margin-right: 4px;
`
const NumberContainer = styled.div`
    -webkit-box-pack: end;
    justify-content: flex-end;
    min-height: 24px;
    padding: 8px 0px 0px;
`
const NumberBox = styled.div`
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
`
const BalanceBox = styled.div`
    height: 16px;
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
`
const MaxButton = styled.button`
    background-color: transparent;
    border: none;
    color: #22d3ee;
    cursor: pointer;
    font-size: 14px;
    font-weight: 535;
    opacity: 1;
    padding: 4px 6px;
    pointer-events: initial;
`
const PriceContainer = styled.div`
    margin-top: 4px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
`
const PriceBox = styled.div`
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    -webkit-box-pack: justify;
    justify-content: space-between;
`
const Price = styled.div`
    margin: 0px;
    min-width: 0px;
    font-weight: 485;
    font-size: 14px;
`
enum Order {
    ETH,
    USDC
}
const query = gql`
{
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
      token0Price
      token1Price
     
    }
  }
  `
const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
const formatToken = (num: number) => {
    if (Number.isInteger(num)) {
        return num.toFixed(0)
    } else {
        //to make -9
        return num.toFixed(9)
    }
}
const Swap = (props: Props) => {
    const [disabled, setDisabled] = useState(false)
    const toggleButton = useCallback(() => {
        setDisabled((prev) => !prev)
    }, [])
    const [isFetching, setIsFetching] = useState(false)
    const [inTokenAmount, setInTokenAmount] = useState('')
    const [outTokenAmount, setOutTokenAmount] = useState('')
    const [inTokenFocus, setInTokenFocus] = useState(false)
    const [outTokenFocus, setOutTokenFocus] = useState(false)
    const [ETHPrice, setETHPrice] = useState(0)
    const [USDCPrice, setUSDCPrice] = useState(0)
    const [ethBalance, setEthBalance] = useState(3.13)
    const [usdcBalance, setUsdcBalance] = useState(2772.3)
    const [order, setOrder] = useState(Order.ETH)
    const [result, reexecuteQuery] = useQuery({
        query: query,
    });
    const noInputAmount = !inTokenAmount || !outTokenAmount
    useEffect(() => {
        if (!inTokenAmount && !outTokenAmount) return
        if (result.data) {
            const _ETHPrice = Number(result.data.pool.token0Price)
            const _USDCPrice = Number(result.data.pool.token1Price)
            setETHPrice(_ETHPrice)
            setUSDCPrice(_USDCPrice)
            setIsFetching(false)
            if (inTokenFocus) {
                console.log('in token focus')
                if (order == Order.ETH) {
                    const outTokenAmount = Number(inTokenAmount) * _ETHPrice

                    setOutTokenAmount(formatToken(outTokenAmount))
                } else {
                    const outTokenAmount = Number(inTokenAmount) * _USDCPrice
                    setOutTokenAmount(formatToken(outTokenAmount))
                }
            }
            if (outTokenFocus) {
                if (order == Order.ETH) {
                    const inTokenAmount = Number(outTokenAmount) * _USDCPrice
                    setInTokenAmount(formatToken(inTokenAmount))
                } else {
                    const inTokenAmount = Number(outTokenAmount) * _ETHPrice
                    setInTokenAmount(formatToken(inTokenAmount))
                }
            }
            console.log('reset price')
        }
    }, [result, inTokenFocus, inTokenAmount, outTokenFocus, outTokenAmount, isFetching])
    // console.log(result)
    return (
        <WidgetContainer>
            <WidgetBox>
                <ActionContainer >
                    <div className='px-[12px]'>
                        <div color='text-white'>Swap</div>
                    </div>
                    <div className='flex items-center justify-center px-[12px] py-[6px] text-[#9b9b9b] hover:text-opacity-30'>
                        <MdSettings size={20} />
                    </div>
                </ActionContainer>
                <div>
                    <SwapContainer focus={inTokenFocus}>
                        <SwapInnerContainer>
                            <TextContainer>
                                You pay
                            </TextContainer>
                            <InputContainer>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexGrow: 1,
                                    }}>
                                    <StyledInput
                                        value={inTokenAmount ? inTokenAmount : ''}
                                        inputMode='decimal'
                                        onFocus={() => {
                                            setInTokenFocus(true)
                                        }}
                                        onBlur={() => {
                                            setInTokenFocus(false)
                                        }}
                                        placeholder="0" onChange={(value) => {

                                            setInTokenAmount(value.target.value)
                                            if (isFetching) return
                                            setIsFetching(true)
                                            reexecuteQuery()
                                            setTimeout(() => {
                                                setIsFetching(false)
                                            }, 1000)
                                        }} />
                                </div>
                                <div>
                                    <TokenContainer>
                                        <TokenBox>
                                            <IconBox>
                                                <Image src={
                                                    order == Order.ETH ? '/eth-logo.png' : '/usdc-logo.png'
                                                }
                                                    width={24} height={24} alt='token-1-logo' />
                                            </IconBox>
                                            <div className='text-[20px]'>
                                                {order == Order.ETH && "ETH"}
                                                {order == Order.USDC && "USDC"}
                                            </div>
                                        </TokenBox>
                                    </TokenContainer>
                                </div>
                            </InputContainer>
                            <NumberContainer>
                                <NumberBox>
                                    <div></div>
                                    <BalanceBox>
                                        <div>Balance: {order == Order.ETH ?
                                            formatNumber(ethBalance) : formatNumber(usdcBalance)
                                        }</div>
                                        <MaxButton>Max</MaxButton>
                                    </BalanceBox>
                                </NumberBox>
                            </NumberContainer>
                        </SwapInnerContainer>
                    </SwapContainer>
                    <SwitchContainer onClick={() => {
                        if (order == Order.ETH) {
                            setOrder(Order.USDC)
                        }
                        else {
                            setOrder(Order.ETH)
                        }
                        //swap in and out token amount
                        const temp = inTokenAmount
                        setInTokenAmount(outTokenAmount)
                        setOutTokenAmount(temp)

                    }}>
                        <SwitchBox>
                            {order == Order.ETH ? <BsArrowDownShort size={25} /> : <BsArrowUpShort size={25} />}
                        </SwitchBox>
                    </SwitchContainer>
                    <div>
                        <SwapContainer focus={outTokenFocus}>
                            <SwapInnerContainer>
                                <TextContainer>
                                    You receive
                                </TextContainer>
                                <InputContainer>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexGrow: 1,
                                        }}>
                                        <StyledInput placeholder="0"
                                            inputMode='decimal'
                                            value={outTokenAmount ? outTokenAmount : ''}

                                            onFocus={() => {
                                                setOutTokenFocus(true)
                                            }}
                                            onBlur={() => {
                                                setOutTokenFocus(false)
                                            }}
                                            onChange={(value) => {
                                                setOutTokenAmount(value.target.value)
                                                //add a timeout to fetch data
                                                if (isFetching) return
                                                setIsFetching(true)
                                                reexecuteQuery()
                                                setTimeout(() => {
                                                    setIsFetching(false)
                                                }, 1000)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <TokenContainer>
                                            <TokenBox>
                                                <IconBox>
                                                    <Image src={order == Order.ETH ? '/usdc-logo.png' : '/eth-logo.png'}
                                                        width={24} height={24} alt='eth-logo' />
                                                </IconBox>
                                                <div className='text-[20px]'>
                                                    {order == Order.ETH && "USDC"}
                                                    {order == Order.USDC && "ETH "}
                                                </div>
                                            </TokenBox>
                                        </TokenContainer>
                                    </div>
                                </InputContainer>
                                <NumberContainer>
                                    <NumberBox>
                                        <div></div>
                                        <BalanceBox>
                                            <div>Balance: {
                                                order == Order.ETH ?
                                                    formatNumber(usdcBalance) : formatNumber(ethBalance)
                                            }</div>
                                        </BalanceBox>
                                    </NumberBox>
                                </NumberContainer>
                            </SwapInnerContainer>
                        </SwapContainer>
                    </div>
                    {!noInputAmount &&
                        <PriceContainer>
                            <PriceBox>

                                {isFetching ?
                                    <Price>Fetching price...</Price> :
                                    <Price>1 USDC = {USDCPrice.toFixed(5)} ETH </Price>

                                }
                                <div></div>
                            </PriceBox>
                        </PriceContainer>
                    }
                    <div className='mt-2'>
                        <button
                            className={`font-bold text-lg py-4 px-6 rounded-2xl w-full inline-flex items-center justify-center focus:outline-none border border-transparent transition duration-300 ease-in-out ${(noInputAmount || isFetching) ? 'bg-[#1b1b1b] text-[#9b9b9b] cursor-not-allowed' : 'bg-[#22d3ee] hover:opacity-80 text-white '}`}
                            disabled={noInputAmount || isFetching}
                            onClick={toggleButton}>
                            {noInputAmount ? "Enter a amount" : "Swap"}
                        </button>
                    </div>
                </div>
            </WidgetBox>
        </WidgetContainer>
    )
}

export default Swap