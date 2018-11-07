import Web3 from 'web3';

const getWeb3 = () => {
  Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
  let provider;

  if (window.ethereum) {
    provider = new Web3(window.ethereum);
    window.ethereum.enable().catch(() => {});
  } else if (window.web3) {
    provider = new Web3(window.web3.currentProvider);
  }
  return provider;
};

export default getWeb3;
