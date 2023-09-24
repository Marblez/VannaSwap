//@ts-check
import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { std as calculateStandardDeviation } from 'mathjs'
import { VOLATILITY_ORACLE_ABI, VOLATILITY_ORACLE_ADDRESS } from './constant.js'
import dotenv from 'dotenv'
dotenv.config()
const updateFee = async () => {
    console.log('Key: ', process.env.PRIVATE_KEY)
    const graphqlUrl = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const provider = new ethers.providers.JsonRpcProvider('https://docs-demo.quiknode.pro/')
    const _blockNumber = await provider.getBlockNumber()
    console.log('Block number:', _blockNumber)
    const pricePromises = []
    for (let currentBlock = _blockNumber; currentBlock > _blockNumber - 1000; currentBlock = currentBlock - 50) {
        pricePromises.push(fetch(graphqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query ($blockNumber: Int!) {
                pool(
                  id: 
              "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
                  block: {number: $blockNumber}
                ) {
                  tick
                  token0Price
                  token1Price
                  __typename
                }
              }`,
                variables: {
                    blockNumber: currentBlock
                }
            })
        }))
    }
    const prices = await Promise.all(pricePromises).then(async (responses) => {
        const jsons = await Promise.all(responses.map((response) => response.json()))
        //@ts-ignore
        return jsons.map((json) => Number(json.data.pool.token0Price))
    })
    console.log(prices)
    const volatilityArray = []

    volatilityArray.push(calculateStandardDeviation(prices.slice(0, 5)))
    volatilityArray.push(calculateStandardDeviation(prices.slice(0, 10)))
    volatilityArray.push(calculateStandardDeviation(prices.slice(0, 20)))
    console.log("volatilityArray")

    const modelHash = "QmXQpupTphRTeXJMEz3BCt9YUF6kikcqExxPdcVoL1BBhy"
    const inputData = JSON.stringify([volatilityArray])
    const input = [modelHash, inputData]
    const network = {
        name: 'localhost', // You can use any name to identify the network
        chainId: 901, // Ganache chain ID, replace with the appropriate chain ID if necessary
    };
    const vannaProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9545', network);
    const vannaWallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", vannaProvider);
    const vannaContract = new ethers.Contract(VOLATILITY_ORACLE_ADDRESS, VOLATILITY_ORACLE_ABI, vannaWallet);
    console.log(input)
    const tx = await vannaContract['setVolatility'](modelHash, inputData, {
        gasLimit: 10000000
    })
    await tx.wait()
    console.log(tx)
}
while (true) {
    await updateFee()
    await new Promise(resolve => setTimeout(resolve, 10000));
}
// const tx = await vannaContract['getVolatility']()
// await tx.wait()
// console.log(tx)
