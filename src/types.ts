import 'hardhat/types/config';
import 'hardhat/types/runtime';

import { BigNumber } from 'ethers';
import { dotnugg as dotnuggTypes } from '@nuggxyz/dotnugg-sdk';
import { dotnugg } from '@nuggxyz/dotnugg-sdk/src/index';

declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        dotnugg: { env: DotNuggEnv } & dotnuggTypes;
    }
}

export interface DotNuggEnv {
    items?: dotnugg.types.builder.Encoder.EncoderOutput[];
    itemsByFeatureById?: dotnugg.types.builder.Encoder.OutputByItem;
    itemsByFeatureByIdArray?: Dictionary<BigNumber[][]>;
    itemsByFeatureByIdHex?: BigNumber[][][];
    itemsByFeatureByIdBytes?: BigNumber[][];
    stats?: dotnugg.types.builder.Encoder.Stats;
}

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
