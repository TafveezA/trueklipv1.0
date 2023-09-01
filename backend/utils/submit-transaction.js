const { Wallet } = require('xrpl');
const dotenv = require('dotenv')
dotenv.config({path:'../config/config.env'})

export default async function submitTransaction({ client, tx }) {
    try {
        // Create a wallet using the seed
        const wallet = await Wallet.fromSeed(process.env.SEED);
        tx.Account = wallet.address;

        // Sign and submit the transaction : https://xrpl.org/send-xrp.html#send-xrp
        const response = await client.submit(tx, { wallet });
        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}