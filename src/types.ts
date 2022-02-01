import 'hardhat/types/config';
import 'hardhat/types/runtime';

import { BigNumber } from 'ethers';
import { dotnugg } from '@nuggxyz/dotnugg-sdk';
import * as EncoderTypes from '@nuggxyz/dotnugg-sdk/build/builder/types/EncoderTypes';
import * as BuilderTypes from '@nuggxyz/dotnugg-sdk/build/builder/types/BuilderTypes';

declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        dotnugg: { env: DotNuggEnv } & typeof dotnugg;
    }
}

export interface DotNuggEnv {
    items?: EncoderTypes.EncoderOutput[];
    itemsByFeatureById?: EncoderTypes.OutputByItem;
    itemsByFeatureByIdArray?: BuilderTypes.Dictionary<BigNumber[][]>;
    itemsByFeatureByIdHex?: BigNumber[][][];
    itemsByFeatureByIdBytes?: BigNumber[][];
    stats?: EncoderTypes.Stats;
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
