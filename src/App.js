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
import { useBlockChainData } from './hooks/loadBlockchainData';

function App() {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  useBlockChainData()
  // const {updateTotalRewards, updateTotalStaked, updateSixMonthApy, updateOneYearApy, updateThreeYearApy} = useContext(GlobalContext)

  // const loadBlockChain = async () => {
  //   const provider = ethers.getDefaultProvider('rinkeby', {
  //     infura: process.env.REACT_APP_INFURA_PROJECT_ID
  //   });
  //   const contract = new ethers.Contract(CONFIG.contractAddress, stakeABI, provider)
  //   const totalStake = await contract.totalStake()
  //   const totalReward = await contract.totalRewards()
  //   const six_month_apy = await contract.sixMonthAPR()
  //   const one_year_apy = await contract.oneYearAPR()
  //   const three_year_apy = await contract.threeYearAPR()
  //   updateTotalRewards(ethers.utils.formatUnits(totalReward, CONFIG.tokenDecimals))
  //   updateTotalStaked(ethers.utils.formatUnits(totalStake, CONFIG.tokenDecimals))
  //   updateSixMonthApy(six_month_apy)
  //   updateOneYearApy(one_year_apy)
  //   updateThreeYearApy(three_year_apy)
  // }

  useEffect(() => {
    // loadBlockChain()
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

export default App
