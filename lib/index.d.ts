import * as _lucid_evolution_lucid from '@lucid-evolution/lucid';
import { LucidEvolution } from '@lucid-evolution/lucid';

type ValidityRange = {
    valid_before?: number;
    valid_after?: number;
};
type ScriptRequirement = {
    collateral?: string;
    inputs?: string[];
    reference_inputs?: string[];
    outputs?: string[];
    mint?: string;
    certificates?: string[];
    withdrawals?: {
        [key: string]: number;
    };
    validity_range?: ValidityRange;
    signatories?: string[];
    redeemers?: {
        [key: string]: string;
    };
    datums?: [string, string][];
};
declare function createCIP141Transaction(evolution: LucidEvolution, scriptRequirement: ScriptRequirement): Promise<_lucid_evolution_lucid.TxBuilder>;

export { createCIP141Transaction };
