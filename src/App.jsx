import { useState } from "react";
import "./App.css";
import { MetaMaskProvider , useEthers} from "@metamask/sdk-react";
import { ethers } from 'ethers';

function App() {
  const { chainId, account } = useEthers();
  const [balance, setBalance] = useState('');

  async function getWalletBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    return ethers.utils.formatEther(balance);
  }

  useEffect(() => {
    if (account) {
      getWalletBalance().then((balance) => {
        setBalance(balance);
      });
    }
  }, [account]);


  return (
    <MetaMaskProvider>
      <div>
        <p>Connected to chainId: {chainId}</p>
        <p>Connected account: {account}</p>
        <p>Wallet Balance: {balance}</p>
      </div>
    </MetaMaskProvider>
  );
}

export default App;
