async function main() {
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy("0x35E95CFa48001B9025b560D0865E4F8540313d8d","0x7c91d48ed875a53b803ed0f9F825eCF20F1DF619", 100000, 230);
  await escrow .deployed();  
  console.log("Escrow deployed to:",escrow.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


 