// import { Contract, Interface, JsonRpcProvider } from 'ethers';

// // Import the ABI you copied
// import {abiValidation,contractAddressValidation} from "../constants";

// // This is the address of the contract on mainnet
// const CONTRACT_VALIDATION_ADDRESS = contractAddressValidation;

// const EOS_RPC_URL = 'https://api.evm.eosnetwork.com/';

// const test = async () => {
//     const provider = new JsonRpcProvider(EOS_RPC_URL, undefined, {
//         batchMaxCount: 1
//     });
//     const multicallContract = new Contract(CONTRACT_VALIDATION_ADDRESS,abiValidation, provider);
//     const multicallInterface = new Interface(abiValidation);

//     const calls = [
//         {
//             target: MULTICALL3_ADDRESS,
//             allowFailure: false,
//             callData: multicallInterface.encodeFunctionData('getEthBalance', [MULTICALL3_ADDRESS]),
//         },
       
//     ];

//     type Aggregate3Response = { success: boolean; returnData: string };
//     const results: Aggregate3Response[] = await multicallContract.aggregate3.staticCall(calls);

//     for (const { success, returnData } of results) {
//         console.log('success', success);
//         console.log('returnData', returnData);

//         // Decode the returnData
//         const decoded = multicallInterface.decodeFunctionResult('getEthBalance', returnData);
//         console.log('decoded', decoded);
//     }
// }

// test();