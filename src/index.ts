import { task, extendConfig } from 'hardhat/config';
import { TASK_TEST, TASK_RUN, TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { BigNumber } from 'ethers';

import { dotnugg } from '../../dotnugg-sdk/src/';

import './types';

extendConfig((config, userConfig) => {
    config.dotnugg = Object.assign(
        {
            runOnDeploy: true,
            runOnTest: true,
            art: './art',
            maxLength: 10,
        },
        userConfig.dotnugg,
    );

    return config;
});

task(TASK_TEST, 'Runs mocha tests')
    .addFlag('dotnugg', 'trace logs and calls in transactions')
    .setAction(async (args, hre, runSuper) => {
        if (!hre.dotnugg) {
            hre.dotnugg = {};
        }

        if (args.dotnugg) {
            wrapHardhatProvider(hre);
        }
        return runSuper(args);
    });

task('deploy', 'Runs deployment')
    .addFlag('dotnugg', 'trace logs and calls in transactions')
    .setAction(async (args, hre, runSuper) => {
        if (!hre.dotnugg) {
            hre.dotnugg = {};
        }

        if (args.dotnugg) {
            wrapHardhatProvider(hre);
        }
        return runSuper(args);
    });
/**
 * Add hardhat-tracer to your environment
 * @param hre: HardhatRuntimeEnvironment - required to get access to contract artifacts and tracer env
 */
export async function wrapHardhatProvider(hre: HardhatRuntimeEnvironment) {
    const RAND_BACK_INDEX = dotnugg.utils.randIntBetween(8);
    const RAND_EYES_INDEX = dotnugg.utils.randIntBetween(27);
    const RAND_MOUTH_INDEX = dotnugg.utils.randIntBetween(12);
    const RAND_HEAD_INDEX = dotnugg.utils.randIntBetween(12);
    const RAND_HAIR_INDEX = dotnugg.utils.randIntBetween(15);
    const RAND_NECK_INDEX = dotnugg.utils.randIntBetween(24);

    // console.log(args.contractOutput.evm.bytecode.object);
    await dotnugg.compile.Compiler.init();
    const res = dotnugg.compile.Compiler.compileDirectoryWithCache(hre.config.dotnugg.art);
    hre.dotnugg.items = res.encoder.output;
    hre.dotnugg.itemsByFeatureById = res.encoder.outputByItem;
    hre.dotnugg.itemsByFeatureByIdHex = res.encoder.ouputByFeatureHex;
    hre.dotnugg.itemsByFeatureByIdBytes = res.encoder.ouputByFeaturePlain;

    hre.dotnugg.stats = res.encoder.stats;
}
