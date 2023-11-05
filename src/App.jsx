import "./App.css";
import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {
  state = {
    balance: 0,
  };

  async componentDidMount() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();

        // Fetch the balance of the connected account
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

        this.setState({ balance: balanceEth });
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed in your browser.');
    }
  }

  render() {
    return (
      <div>
        <h1>Wallet Balance:</h1>
        <p>{this.state.balance} ETH</p>
      </div>
    );
  }
}

export default App;
