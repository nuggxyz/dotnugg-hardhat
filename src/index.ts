import { task, extendConfig } from 'hardhat/config';
import { TASK_TEST, TASK_RUN, TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
// import './types';
import { dotnugg } from 'hardhat';

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
            hre.dotnugg = { env: {} } as typeof hre.dotnugg;
        }

        if (args.dotnugg) {
            wrapHardhatProvider(hre);
        }
        return runSuper(args);
    });

task('build-txs', 'Runs mocha tests').setAction(async (args, hre, runSuper) => {
    if (!hre.dotnugg) {
        hre.dotnugg = { env: {} } as typeof hre.dotnugg;
    }

    // if (args.dotnugg) {
    await wrapHardhatProvider(hre);

    // }
    return runSuper(args);
});

task('build-params', 'Runs mocha tests').setAction(async (args, hre, runSuper) => {
    if (!hre.dotnugg) {
        hre.dotnugg = { env: {} } as typeof hre.dotnugg;
    }

    // if (args.dotnugg) {
    await wrapHardhatProvider(hre);

    // }
    return runSuper(args);
});

task('deploy', 'Runs deployment')
    .addFlag('dotnugg', 'trace logs and calls in transactions')
    .setAction(async (args, hre, runSuper) => {
        if (!hre.dotnugg) {
            hre.dotnugg = { env: {} } as typeof hre.dotnugg;
        }

        if (args.dotnugg) {
            wrapHardhatProvider(hre);
        }
        return runSuper(args);
    });

export async function wrapHardhatProvider(hre: HardhatRuntimeEnvironment) {
    const RAND_BACK_INDEX = dotnugg.utils.randIntBetween(8);
    const RAND_EYES_INDEX = dotnugg.utils.randIntBetween(27);
    const RAND_MOUTH_INDEX = dotnugg.utils.randIntBetween(12);
    const RAND_HEAD_INDEX = dotnugg.utils.randIntBetween(12);
    const RAND_HAIR_INDEX = dotnugg.utils.randIntBetween(15);
    const RAND_NECK_INDEX = dotnugg.utils.randIntBetween(24);

    // console.log(args.contractOutput.evm.bytecode.object);
    await dotnugg.compiler.init();

    const res = dotnugg.compiler.compileDirectoryWithCache(hre.config.dotnugg.art);

    hre.dotnugg.env.items = res.output;
    hre.dotnugg.env.itemsByFeatureById = res.outputByItem;
    hre.dotnugg.env.itemsByFeatureByIdArray = res.outputByItemArray;

    hre.dotnugg.env.itemsByFeatureByIdHex = res.ouputByFeatureHex;
    hre.dotnugg.env.itemsByFeatureByIdBytes = res.ouputByFeaturePlain;

    hre.dotnugg.env.stats = res.stats;
}
