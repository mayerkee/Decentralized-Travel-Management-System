const { network, ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const res = await ethers.getContract("Tms");
  const hotelCount = await res.getHotelCount();
  log(`Before Hotel Count: ${hotelCount.toString()}`);
  const hotelAdd = await res.addHotel(
    "Shola",
    "hssgrfaeahvvsvs",
    "Nigeria",
    "Lagos",
    "Great"
  );
  log(hotelAdd.events);
  const tx = await hotelAdd.wait(1);
  const hotelCount1 = await res.getHotelCount();
  log(`After Hotel Count: ${hotelCount1.toString()}`);
};

module.exports.tags = ["all", "addhotel"];
