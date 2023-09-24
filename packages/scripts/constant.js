export const VOLATILITY_ORACLE_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getVolatility",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "modelName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "inputData",
                "type": "string"
            }
        ],
        "name": "inferCall",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "modelName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "inputData",
                "type": "string"
            }
        ],
        "name": "setVolatility",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "precision",
                "type": "uint8"
            }
        ],
        "name": "stringToInt",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
]
export const VOLATILITY_ORACLE_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'