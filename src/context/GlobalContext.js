import { createContext, useReducer } from "react";
import { AppReducer } from './AppReducer'

const initialState = {
    account: null,
    blockChainData: {
        TokenBalance: null,
        StakedBalance: null,
        RewardBalance: null,
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


    return (
        <GlobalContext.Provider value={
            {
                ...state,
                updateAccount,
                updateTokenBalance,
                updateStakedBalance,
                updateRewardBalance,
                updateTokenPrice,
                updateTotalRewards,
                updateTotalStaked,
                updateSixMonthApy,
                updateOneYearApy,
                updateThreeYearApy
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}