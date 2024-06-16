// utils/BlockchainContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import getWeb3 from './getWeb3';
import BlogContract from '../SmartContracts/build/contracts/Blog.json';

// Create a context for blockchain data
const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

// Provider component to wrap your app and provide blockchain data
export const BlockchainProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = BlogContract.networks[networkId];

        if (deployedNetwork) {
          const contractInstance = new web3Instance.eth.Contract(
            BlogContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setWeb3(web3Instance);
          setContract(contractInstance);
          setAccount(accounts[0]);

          console.log("Web3 initialized successfully:", {
            web3Instance,
            contractInstance,
            account: accounts[0],
          });
        } else {
          console.error("Contract not deployed on the current network");
        }
      } catch (error) {
        console.error("Error initializing web3", error);
      }
    };

    initBlockchain();
  }, []);

  // Context value to provide
  const blockchainContextValue = {
    web3,
    contract,
    account,
  };

  return (
    <BlockchainContext.Provider value={blockchainContextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};
