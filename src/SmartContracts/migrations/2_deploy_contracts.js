const Blog = artifacts.require("Blog");

module.exports = function(deployer) {
    deployer.deploy(Blog);
    // Additional deployment steps if needed
  };
