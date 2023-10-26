import React, { useEffect, useState } from 'react'
import UploadContract from "../../server/artifacts/contracts/Upload.sol/Upload.json"
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from './pages/Home';
import "./App.css"
import { Toaster } from 'sonner';
import { ethers } from 'ethers';
import Upload from './components/Upload';
import Files from './components/Files';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
export default function App() {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // ...

    const deployContract = async () => {
      if (provider) {
        const signer = provider.getSigner();
        const t = await signer.getAddress()
        setAccount(t)
        let temp = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", UploadContract.abi, signer);
        setContract(temp);
      }
    };

    deployContract();
  }, [provider]);

  // ...

  const interactWithContract = async () => {
    if (contract) {
      const result = await contract.someFunction();
      console.log(result);
    }
  };
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    // ...

    const getNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetwork(network.name);
      }
    };

    getNetwork();
  }, [provider]);
  return (
    <DataProvider>
      <ClerkProvider publishableKey={clerkPubKey}>
        <SignedIn>



          <div className='max-w-5xl mx-auto p-5 flex flex-col gap-10'>
            <Header/>
            <Upload
              account={account}
              provider={provider}
              contract={contract} />
            <Files />
            {/* <Home /> */}
            <Toaster />
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </DataProvider>
  )
}
