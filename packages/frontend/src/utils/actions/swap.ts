
import { SWAP_ROUTER_ABI } from '@/constant/abis';
import { SWAP_ROUTER_ADDRESS } from '@/constant/address';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { BigNumber, ethers } from 'ethers';
export type address = `0x${string}`
export type Key = [address, address, number, number, address]
export type SwapParams = [boolean, number | BigNumber, number]


export const swap = async (key: Key, params: SwapParams, amount: number): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: SWAP_ROUTER_ADDRESS,
        abi: SWAP_ROUTER_ABI,
        functionName: 'swap',
        args: [key, params, [false, true]],
        value: BigInt(amount)
    });

    // Execute the transaction
    const { hash, } = await writeContract(request)


    // Wait for the transaction block to be mined
    const data = await waitForTransaction({
        hash,
    })
    //@ts-ignore
    return data;
}



