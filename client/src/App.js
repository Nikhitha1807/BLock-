// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Uploadabi from './artifacts/contracts/Upload.sol/Upload.json';
import Header from './components/Header';


function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAccount(address);
        //deployed address of the contract to sepolia
        // let contractAddress = "0x588Fef4C8602dbfFF5Fd2C774e9C39A2625F14d8";
        let contractAddress = "0x8176F8122EDd9b530E8A8259628FDcE0e01115EC";

        const contract = new ethers.Contract(
          contractAddress,
          Uploadabi.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <div className="max-w-5xl mx-auto p-5">
        <Header account={account} contract={contract} />


        <Routes>

          <Route path='/' element={<Home
            contract={contract}
            account={account}
            provider={provider}
          />} />



        </Routes>
      </div>
    </>
  );
}

export default App;
