# SimpleCalculator Solidity Contract

This Solidity smart contract provides basic arithmetic operations - addition, subtraction, and multiplication.

## Functions

### `add(uint256 a, uint256 b)`

This function takes two unsigned integers (`a` and `b`) as input parameters and returns their sum.

### `subtract(int256 a, int256 b)`

This function takes two signed integers (`a` and `b`) as input parameters and returns their difference.

### `multiply(uint256 a, uint256 b)`

This function takes two unsigned integers (`a` and `b`) as input parameters and returns their product.

## Usage

1. Deploy the contract on the Ethereum blockchain.
2. Call the desired function with the appropriate parameters.

## Example

```solidity
// Deploy the SimpleCalculator contract

SimpleCalculator calculator = new SimpleCalculator();

// Perform addition
uint256 resultAddition = calculator.add(5, 10);

// Perform subtraction
int256 resultSubtraction = calculator.subtract(20, 8);

// Perform multiplication
uint256 resultMultiplication = calculator.multiply(3, 7);

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
