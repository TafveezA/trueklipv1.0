async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    //console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Validation = await ethers.getContractFactory("Validation");
    const validation = await Validation.deploy();
  
    console.log("Validation contract address:", validation.address);
    console.log("Validation ABI ",validation)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });