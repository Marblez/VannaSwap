
import { POOL_MANAGER_ABI } from '@/constant/abis';
import { POOL_MANAGER_ADDRESS } from '@/constant/address';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
export type address = `0x${string}`
export type Key = [address, address, number, number, address]
export type SwapParams = [boolean, number | bigint, number]


export const swap = async (key: Key, params: SwapParams, calldata: string): Promise<TransactionReceipt> => {

    // Prepare the transaction data
    const { request } = await prepareWriteContract({
        address: POOL_MANAGER_ADDRESS,
        abi: POOL_MANAGER_ABI,
        functionName: 'swap',
        args: [key, params, calldata]
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



