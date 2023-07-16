const hre = require("hardhat");

async function main() {

  const Escrow = await hre.ethers.getContractFactory("escrow");
  const escrow = await Escrow.deploy("Hello, Hardhat!");

  await escrow.deployed();

  console.log("Escrow deployed to:", escrow.address);

  // Uncomment if you want to sync with Laika (your plugin)
  // await hre.run("laika-sync", {
  //   contract: "Escrow",
  //   address: escrow.address,
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
