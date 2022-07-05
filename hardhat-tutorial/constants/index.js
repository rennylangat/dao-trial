const { ethers } = require("hardhat");

// Replace the value with your NFT contract address
const CRYPTODEVS_NFT_CONTRACT_ADDRESS =
  "0xBb4D90D122cBF80a6f441c8613ED53E5f0241DB6";

module.exports = { CRYPTODEVS_NFT_CONTRACT_ADDRESS };

async function main(){
  const FakeNFTMarketplace= await ethers.getContractFactory("FakeNFTMarketplace");

  const fakeNftMarketplace=await FakeNFTMarketplace.deploy();

  await fakeNftMarketplace.deployed()

  console.log("FakeNFTMarketplace deployed to: ",fakeNftMarketplace.address);

  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");

  const cryptoDevsDAO= await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      value: ethers.utils.parseEther("1"),
    }
  );

  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to :",cryptoDevsDAO.address);
}

main().then(()=> process.exit(0)).catch((error)=>{
  console.error(error)
  process.exit(1)
})

