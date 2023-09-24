import { USDC_ADDRESS, VANNA_HOOKS_ADDRESS } from "./address"

type address = `0x${string}`
type Key = [address, address, number, number, address]
export const poolKey: Key = [
    '0x0000000000000000000000000000000000000000' as address,
    USDC_ADDRESS as address,
    0x800000,
    60,
    VANNA_HOOKS_ADDRESS as address
]
export const MIN_PRICE_LIMIT = 4295128739 + 1
export const MAX_PRICE_LIMIT = 1461446703485210103287273052203988822378723970342 - 1