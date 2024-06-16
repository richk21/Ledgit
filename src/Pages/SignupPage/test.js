import React, { useEffect } from 'react';
import getWeb3 from '../../utils/getWeb3';

const TestWeb3 = () => {
  useEffect(() => {
    const testGetWeb3 = async () => {
      try {
        console.log("Testing getWeb3");
        const web3 = await getWeb3();
        console.log("Web3 instance obtained", web3);
      } catch (error) {
        console.error("Error getting Web3", error);
      }
    };
    testGetWeb3();
  }, []);

  return <div>Testing Web3</div>;
};

export default TestWeb3;
