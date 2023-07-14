const hre = require("hardhat");

async function main() {

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  // Uncomment if you want to sync with Laika (your plugin)
  // await hre.run("laika-sync", {
  //   contract: "Greeter",
  //   address: greeter.address,
  // })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
