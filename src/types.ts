import 'hardhat/types/config';
import { BigNumber } from 'ethers';

import { dotnugg } from '../../dotnugg-sdk/src/index';

import 'hardhat/types/runtime';

declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        dotnugg: DotNuggEnv;
    }
}

export interface DotNuggEnv {
    items?: dotnugg.types.compile.Encoder.EncoderOutput[];
    itemsByFeatureById?: dotnugg.types.compile.Encoder.OutputByItem;
    itemsByFeatureByIdArray?: Dictionary<BigNumber[][]>;

    itemsByFeatureByIdHex?: BigNumber[][][];
    itemsByFeatureByIdBytes?: BigNumber[][];
    stats?: dotnugg.types.compile.Encoder.Stats;
}

// items: { feature: number; bits: { bit: number; dat: number }[]; hex: BigNumber[] }[];

// export interface TracerDependencies {
//     artifacts: Artifacts;
//     tracerEnv: TracerEnv;
//     provider: ProviderLike;
// }

import 'hardhat/types/config';

declare module 'hardhat/types/config' {
    export interface HardhatUserConfig {
        dotnugg?: {
            runOnDeploy?: boolean;
            runOnTest?: boolean;
            art?: string;
            maxLength?: number;
        };
    }

    interface HardhatConfig {
        dotnugg: {
            runOnDeploy: boolean;
            runOnTest: boolean;
            art: string;
            maxLength: number;
            // config: {
            //     width: number;
            //     height: number;
            //     defaults: {
            //         [_: string]: {
            //             zindex: 0;
            //             expandableAt: { r: number; l: number; u: number; d: number };
            //             calculatedReceivers: {
            //                 feature: string;

            //             }[];
            //         };
            //     };
            // };
        };
    }
}
