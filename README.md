# Deploy on Vanna

- In optimism
  - install dependencies (as the OP Stack website suggests)
  - `make devnet-up`
- In VannaSwap
  - `cd packages/v4-vanna`
  - `source .env`
  - `forge script ./script/Vanna.s.sol --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY`

---

## update submodule

`git submodule update --remote`

## how to add submodule

```
    cd packages
    git submodule add <your-github-url>
```

## install submodule when git clone failed to instll

`git submodule sync
git submodule init
git submodule update`

## recursive reset

`git submodule foreach --recursive git reset --hard`

---

## deploy create2 address

- see https://github.com/Arachnid/deterministic-deployment-proxy
- `cast send --private-key $PRIVATE_KEY 0x3fab184622dc19b6109349b94811493bf2a45362 --value 0.1ether`
- `cast publish --rpc-url $RPC_URL 0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222`

---

## deploy hook

- download the newest version of foundry toolkits with `foundryup`
- change `remappings.txt`
  - `-lib/v4-periphery:forge-std/=lib/v4-periphery/lib/forge-std/src/`
  - `+lib/v4-periphery:forge-std/=lib/forge-std/src/`
- `source .env`
- `forge script ./script/Vanna.s.sol --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY`

---

## PoolManager Key Functions

- `swap`

---

## Getting the price from the graph

- https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3
- query using

```
{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    tick
    token0 {
      symbol
      id
      decimals
    }
    token1 {
      symbol
      id
      decimals
    }
    feeTier
    sqrtPrice
    liquidity
  }
}
```

- Live Demo: https://vanna-swap-frontend.vercel.app/
- IPFS version: https://dry-wood-1896.on.fleek.co/
- IPFS model: http://ipfs.io/ipfs/QmXQpupTphRTeXJMEz3BCt9YUF6kikcqExxPdcVoL1BBhy
