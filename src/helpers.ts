// import { ethers } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const globalHRE = (): HardhatRuntimeEnvironment => {
    return require('hardhat') as HardhatRuntimeEnvironment;
};

// // const toEth = (num: string): ethers.BigNumber => {
// //     return ethers.utils.parseEther(num);
// // };

// // const fromEth = (num: ethers.BigNumberish): string => {
// //     return ethers.utils.formatUnits(num);
// // };

// // const MaxUint128 = ethers.BigNumber.from(1).shl(128).sub(1);
// // const MaxUint198 = ethers.BigNumber.from(1).shl(198).sub(1);
// // const MaxUint224 = ethers.BigNumber.from(1).shl(224).sub(1);
// // const MaxUint110 = ethers.BigNumber.from(1).shl(110).sub(1);

// function randomUint256() {
//     return ethers.BigNumber.from(ethers.utils.randomBytes(48)).shr(16);
// }

// const wait = (timeout: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, timeout);
//     });
// };

export { globalHRE };
