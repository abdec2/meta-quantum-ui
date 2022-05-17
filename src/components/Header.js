import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { GlobalContext } from "./../context/GlobalContext";
import StakeABI from './../abi/staking.json'
import tokenABI from './../abi/token.json'
import CONFIG from "./../abi/config";
import MobileMenu from "./MobileMenu";

const Header = ({setError, setErrMsg}) => {
  const { account, updateAccount, updateStakedBalance, updateTokenBalance } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false)

  const getTokenBalance = async (signer, address) => {
    const tokenContract = new ethers.Contract(CONFIG.tokenAddress, tokenABI, signer)
    const balanceOf = await tokenContract.balanceOf(address)
    updateTokenBalance(ethers.utils.formatUnits(balanceOf, CONFIG.tokenDecimals))
  }
  
  const loadAccountData = async (signer, address) => {
    const contract = new ethers.Contract(CONFIG.contractAddress, StakeABI, signer)
    const stakeBalance = await contract.stakeOf(address)
    updateStakedBalance(ethers.utils.formatUnits(stakeBalance, CONFIG.tokenDecimals))
    getTokenBalance(signer, address)
  }

  const handleWalletConnect = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return
    }
    const web3modal = new Web3Modal();
    const instance = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    updateAccount(address);
    const network = await provider.getNetwork();
    if(network.chainId !== CONFIG.chainId ) {
        setError(true) 
        setErrMsg('Contract is not deployed on current network. please choose Binance Smartchain Mainnet')
    } else {
        setError(false) 
        setErrMsg('')
        loadAccountData(signer, address)
    }
  };

  const disconnectWallet = () => {
    updateAccount(null)
    updateStakedBalance(null)
    updateTokenBalance(null)
  }

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
          updateAccount(accounts[0])
      })
      window.ethereum.on('chainChanged', chainId => {
          window.location.reload();
      })
  }
  }, [account]);

  return (
    <div className="container mx-auto md:max-w-5xl px-12 font-Poppins">
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} account={account} disconnectWallet={disconnectWallet} handleWalletConnect={handleWalletConnect} />
      <div className="header flex items-center justify-between space-x-20 min-h-[8rem]">
        <div className="w-20 truncate">
          <img
            src="https://cdn.meta-quantum.io/website/assets/svg/logo.svg"
            alt="meta quantum"
          />
        </div>
        <ul className="hidden md:flex items-center justify-between w-full">
          <li className="p-2 truncate">
            <a href="/">Website</a>
          </li>
          <li className="p-2 truncate">
            <a href="/">Audit</a>
          </li>
          <li className="p-2 truncate">
            <a href="/">Whitepaper</a>
          </li>
          <li className="px-4 py-2 border-[4px] border-white font-bold truncate">
            <a href="/">BUY $QTH</a>
          </li>
          <li className="p-2 ml-4 bg-white text-black truncate">
            {account ? (
              <button
              className="uppercase font-bold flex items-center justify-center space-x-2"
              onClick={() => disconnectWallet()}
            >
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
              </svg>
              <span>
                {account.slice(0,5) + '...' + account.slice(37,42)}
              </span>
            </button>
            ) : (
              <button
              className="uppercase font-bold flex items-center justify-center space-x-2"
              onClick={() => handleWalletConnect()}
            >
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
              </svg>
              <span>
                Connect Wallet
              </span>
            </button>
            )}
          </li>
        </ul>
        <div className="md:hidden w-5 fill-white hover:fill-slate-500 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
