async function main() {
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy("0x5DA733b6b55641526D4F4BC861e85Bc6Bf4A939c","0x0DB7B76077441623eaaCE24aeFE32F0967e19436", 12, 30);
  await escrow .deployed();  
  console.log("Escrow deployed to:",escrow.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


 