import { ethers } from "ethers";
import { createContext, useReducer } from "react";
import CONFIG from "../abi/config";
import { AppReducer } from './AppReducer'
import stakeABI from './../abi/staking.json'
import tokenABI from './../abi/token.json'

const initialState = {
    account: null,
    web3Provider: null,
    blockChainData: {
        TokenBalance: null,
        StakedBalance: null,
        RewardBalance: null,
        RewardBalance1: null,
        RewardBalance2: null,
        TokenPrice:null,
        TotalRewards:null,
        TotalStaked:null, 
        sixMonthApy: null,
        oneYearApy: null, 
        threeYearApy: null
    }
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const updateTokenBalance = (balance) => {
        dispatch({
            type: 'UPDATE_TOKEN_BALANCE', 
            payload: balance
        })
    }

    const updateStakedBalance = (balance) => {
        dispatch({
            type: 'UPDATE_STAKED_BALANCE',
            payload: balance
        })
    }

    const updateRewardBalance = (rewards) => {
        dispatch({
            type: 'UPDATE_REWARDS_BALANCE',
            payload: rewards
        })
    }

    const updateTokenPrice = (price) => {
        dispatch({
            type: 'UPDATE_TOKEN_PRICE',
            payload: price
        })
    }

    const updateTotalRewards = (rewards) => {
        dispatch({
            type: 'UPDATE_TOTAL_REWARDS',
            payload: rewards
        })
    }

    const updateTotalStaked = (totalStacked) => {
        dispatch({
            type: 'UPDATE_TOTAL_STAKED',
            payload: totalStacked
        })
    }
    const updateAccount = (account) => {
        dispatch({
            type: 'UPDATE_ACCOUNT',
            payload: account
        })
    }

    const updateWeb3Provider = (provider) => {
        dispatch({
            type: 'UPDATE_PROVIDER',
            payload: provider
        })
    }

    const updateSixMonthApy = (apy) => {
        dispatch({
            type: 'UPDATE_SIX_MONTH_APY',
            payload: apy
        })
    }

    const updateOneYearApy = (apy) => {
        dispatch({
            type: 'UPDATE_ONE_YEAR_APY',
            payload: apy
        })
    }

    const updateThreeYearApy = (apy) => {
        dispatch({
            type: 'UPDATE_THREE_YEAR_APY',
            payload: apy
        })
    }

    const fetchAccountData = async (provider) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(CONFIG.contractAddress, stakeABI, signer)
        const stakeBalance = await contract.stakeOf(address, 0)
        const rewardBalance = await contract.getDailyRewards(0)
        const rewardBalance1 = await contract.getDailyRewards(1)
        const RewardBalance2 = await contract.getDailyRewards(2)
        const totalStake = await contract.totalStake()
        const totalReward = await contract.totalRewards()
        updateTotalRewards(ethers.utils.formatUnits(totalReward, CONFIG.tokenDecimals))
        updateTotalStaked(ethers.utils.formatUnits(totalStake, CONFIG.tokenDecimals))
        updateStakedBalance(ethers.utils.formatUnits(stakeBalance, CONFIG.tokenDecimals))
        updateRewardBalance({
            rewards: ethers.utils.formatUnits(rewardBalance, CONFIG.tokenDecimals),
            rewards1: ethers.utils.formatUnits(rewardBalance1, CONFIG.tokenDecimals),
            rewards2: ethers.utils.formatUnits(RewardBalance2, CONFIG.tokenDecimals)
        })

        const tokenContract = new ethers.Contract(CONFIG.tokenAddress, tokenABI, signer)
        const balanceOf = await tokenContract.balanceOf(address)
        updateTokenBalance(ethers.utils.formatUnits(balanceOf, CONFIG.tokenDecimals))
    } 


    return (
        <GlobalContext.Provider value={
            {
                ...state,
                updateAccount,
                updateWeb3Provider,
                updateTokenBalance,
                updateStakedBalance,
                updateRewardBalance,
                updateTokenPrice,
                updateTotalRewards,
                updateTotalStaked,
                updateSixMonthApy,
                updateOneYearApy,
                updateThreeYearApy,
                fetchAccountData
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}