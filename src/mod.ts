import { LucidEvolution, CML, coreToUtxo, valueToAssets, Lucid, Data, credentialToAddress } from "@lucid-evolution/lucid";

type ValidityRange = {
    valid_before?: number,
    valid_after?: number,
  }



type ScriptRequirement = {
    collateral?: string,
    inputs?: string[],
    reference_inputs?: string[],
    outputs?: string[],
    mint?: string,
    certificates?: string[],
    withdrawals?: { [key: string]: number },
    validity_range?: ValidityRange,
    signatories?: string[],
    redeemers?: { [key: string]: string },
    datums?: [string, string][]
}

async function createCIP141Transaction(evolution: LucidEvolution, scriptRequirement: ScriptRequirement) {
    
    const collateral = scriptRequirement.collateral
    const address = await evolution.wallet().address()
    const localLucid =await Lucid(evolution.config().provider!, evolution.config().network!)
    await localLucid.selectWallet.fromAddress(address, [coreToUtxo(CML.TransactionUnspentOutput.from_cbor_hex(collateral!))])
    const tx =  localLucid.newTx()

    if(scriptRequirement.inputs) {
        const utxo = scriptRequirement.inputs?.map((input) => coreToUtxo(CML.TransactionUnspentOutput.from_cbor_hex(input)))
        tx.collectFrom(utxo ?? [])
    }
    
    

    const refInputs = scriptRequirement.reference_inputs?.map((input) => coreToUtxo(CML.TransactionUnspentOutput.from_cbor_hex(input)))
    tx.readFrom(refInputs ?? [])
    
    // for (const output of scriptRequirement.outputs ?? []) {
    //     const outputCML = CML.TransactionOutput.from_cbor_hex(output)
    //     if(outputCML.datum()) {
    //         tx.pay.ToAddressWithData(outputCML.address.toString(), datumJsonToCbor( outputCML.datum()?.to_json()), valueToAssets(outputCML.amount()))
    //     } else {
    //         tx.pay.ToAddress(outputCML.address.toString(),valueToAssets(outputCML.amount()))
    //     }
    // }
    if(scriptRequirement.mint) {
        const mintAssets =  valueToAssets(CML.Value.from_cbor_hex(scriptRequirement.mint)) 
        const mintRedeemer = scriptRequirement.redeemers?.["mint"]  ?? Data.void()
        tx.mintAssets(mintAssets, mintRedeemer)
    }
    if(scriptRequirement.withdrawals) {
        for(const [address, amount] of Object.entries(scriptRequirement.withdrawals)) {
            tx.withdraw(address, BigInt(amount))
        }
    }
    if(scriptRequirement.validity_range) {
        if(scriptRequirement.validity_range.valid_before) {
            tx.validFrom(scriptRequirement.validity_range.valid_before)
        }
        if(scriptRequirement.validity_range.valid_after) {
            tx.validTo(scriptRequirement.validity_range.valid_after)
        }
    }
    if(scriptRequirement.signatories) {
        for(const signatory of scriptRequirement.signatories) {
            tx.addSigner(credentialToAddress(evolution.config().network!, {type: "Key", hash: signatory}))
        }
    }



    return tx
}



export { createCIP141Transaction };
