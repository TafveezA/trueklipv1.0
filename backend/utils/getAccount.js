const {Client} = require('xrpl')
const getNet = require('./getNet')

async function getAccount(type) {
    let net = getNet()
    const client = new xrpl.Client(net)
    results = 'Connecting to ' + net + '....'
    let faucetHost = null
    if (type == 'standby') {
        standbyResultField.value = results
      } else {
        operationalResultField.value = results
      }
  console.log(results)
  await client.connect()

  results += '\nConnected, funding wallet.'
  console.log(results)
  if (type == 'standby') {
    standbyResultField.value = results
  } else {
    operationalResultField.value = results
  }  

  const my_wallet = (await client.fundWallet(null, { faucetHost })).wallet
  console.log(my_balance,my_wallet)

  results += '\nGot a wallet.'
  if (type == 'standby') {
    standbyResultField.value = results
  } else {
    operationalResultField.value = results
  }      
  const my_balance = (await client.getXrpBalance(my_wallet.address))  
  


if (type == 'standby') {
    standbyAccountField.value = my_wallet.address
    standbyPubKeyField.value = my_wallet.publicKey
    standbyPrivKeyField.value = my_wallet.privateKey
    standbyBalanceField.value = (await client.getXrpBalance(my_wallet.address))
    standbySeedField.value = my_wallet.seed
    results += '\nStandby account created.'
    standbyResultField.value = results
}
else {
    operationalAccountField.value = my_wallet.address
    operationalPubKeyField.value = my_wallet.publicKey
    operationalPrivKeyField.value = my_wallet.privateKey
    operationalSeedField.value = my_wallet.seed
    operationalBalanceField.value = (await client.getXrpBalance(my_wallet.address))
    results += '\nOperational account created.'
    operationalResultField.value = results
  }
  seeds.value = standbySeedField.value + '\n' + operationalSeedField.value

  client.disconnect()
} 
