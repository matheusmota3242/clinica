import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Prescritor from '../abis/Prescritor.json';
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    console.log(window.web3);
  }

  async loadWeb3() {
    
    
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
              // Request account access if needed
              await window.ethereum.enable();
              // Acccounts now exposed
          
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          // Acccounts always exposed
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = Prescritor.networks[networkId];
    if (networkData) {
      const prescritor = web3.eth.Contract(Prescritor.abi, networkData.address);
      this.setState({prescritor});
      const contReceitas = await prescritor.methods.contReceitas().call();
      this.setState({contReceitas});
      for (var i = 1; i <= contReceitas; i++) {
        const receita = await prescritor.methods.receitas(i).call();
        this.setState({
          receitas: [...this.state.receitas, receita]
        });
      }
      console.log("Numero de receitas: ", contReceitas.toString());
      this.setState({loading: false});
      console.log(this.state.receitas);
    } else {
      window.alert("Contrato nao implantado nesta rede!");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contReceitas: 0,
      receitas: [],
      loading: true
    }
    this.gerarReceita = this.gerarReceita.bind(this);
  }
  
  gerarReceita(paciente, medicamento, dosagem, medida) {
    this.setState({loading: true});
    this.state.prescritor.methods.gerarReceita(paciente, medicamento, dosagem, medida).send({from: this.state.account}).once('receipt', (receipt) => {
      this.setState({loading: true});
    });
  }

  render() {
    console.log(this.state);
    return (
      
      <div style={{margin: 10}}>
        <Navbar account={this.state.account} />
        <div className="row">
          <div className="container-fluid mt-5"></div>
          <main role="main" className="col-lg-12 d-flex">
            {this.state.loading ? 
            <div id="loader"><p className="text-center"></p>Carregando...</div> :
            <Main
              receitas={this.state.receitas}
              gerarReceita={this.gerarReceita} />}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
