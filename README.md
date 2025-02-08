# CIP141-LucidEvolution

A CIP141 implementation for Lucid Evolution, providing transaction building capabilities for Cardano smart contracts.

## Installation

```bash
npm install cip141-lucidevolution
```

## Usage

```typescript
import { createCIP141Transaction } from 'cip141-lucidevolution';
let scriptRequirements = await wallet.cip141.getScriptRequirements();
const lucid = await Lucid(provider, network );

// Create a transaction
const tx = createCIP141Transaction(lucid, scriptRequirements);
```



## Features

- Transaction building from CIP141 format
- Support for:
  - Collateral handling
  - Input collection
  - Reference inputs
  - Asset minting
  - Withdrawals
  - Validity ranges
  - Multi-signature transactions

## API Reference

### `createCIP141Transaction`

Creates a transaction builder from CIP141 format requirements.
