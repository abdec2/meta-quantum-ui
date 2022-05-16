import { createContext, useReducer } from "react";
import { AppReducer } from './AppReducer'

const initialState = {
    account: null,
    blockChainData: {
        TokenBalance: null,
        StakedBalance: null,
        TokenPrice:null,
        TotalRewards:null,
        TotalStaked:null
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


    return (
        <GlobalContext.Provider value={
            {
                ...state,
                updateAccount,
                updateTokenBalance,
                updateStakedBalance,
                updateTokenPrice,
                updateTotalRewards,
                updateTotalStaked
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}