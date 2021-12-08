import { task, extendConfig } from 'hardhat/config';
import { TASK_TEST, TASK_RUN, TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { BigNumber } from 'ethers';

import { DotNuggCompiler } from '../../dotnugg-sdk/src/DotNuggCompiler';

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

task(TASK_COMPILE, 'Runs deployment')
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
    // console.log(args.contractOutput.evm.bytecode.object);

    hre.dotnugg.items = (await DotNuggCompiler.compile(hre.config.dotnugg.art)) as any as BigNumber[][];
}
