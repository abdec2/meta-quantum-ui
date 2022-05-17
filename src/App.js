import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import FooterComponent from './components/FooterComponent';
import AlertBox from "./components/AlertBox";
import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CONFIG from './abi/config';
import stakeABI from './abi/staking.json'
import { GlobalContext } from './context/GlobalContext'
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const {updateTotalRewards, updateTotalStaked} = useContext(GlobalContext)

  const loadBlockChain = async () => {
    const provider = ethers.getDefaultProvider('rinkeby', {
      alchemy: process.env.REACT_APP_ALCHEMY_API
    });
    const contract = new ethers.Contract(CONFIG.contractAddress, stakeABI, provider)
    const totalStake = await contract.totalStake()
    const totalReward = await contract.totalRewards()
    updateTotalRewards(ethers.utils.formatUnits(totalReward, CONFIG.tokenDecimals))
    updateTotalStaked(ethers.utils.formatUnits(totalStake, CONFIG.tokenDecimals))
   
  }

  useEffect(() => {
    loadBlockChain()

  }, [])

  return (
      <div className="App bg-grad min-h-screen text-white">
        {/* <LoadingSpinner /> */}
        <Header setError={setError} setErrMsg={setErrMsg} />
        <Main setError={setError} setErrMsg={setErrMsg} />
        {error && (<AlertBox msg={errMsg} setError={setError} setErrMsg={setErrMsg} />)}
        <FooterComponent />
      </div>
  );
}

export default App;
