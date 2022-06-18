import { ethers } from "ethers";
import { useContext, useEffect } from "react"
import CONFIG from "../abi/config";
import { GlobalContext } from "../context/GlobalContext"
import stakeABI from '../abi/staking.json'

export const useBlockChainData = (setDataLoading) => {
    const { updateTotalRewards, updateTotalStaked, updateSixMonthApy, updateOneYearApy, updateThreeYearApy } = useContext(GlobalContext)

    const loadData = async () => {
        setDataLoading(true)
        const provider = ethers.getDefaultProvider('mainnet', {
            infura: process.env.REACT_APP_INFURA_PROJECT_ID
        });
        const contract = new ethers.Contract(CONFIG.contractAddress, stakeABI, provider)
        const totalStake = await contract.totalStake()
        const totalReward = await contract.totalRewards()
        const six_month_apy = await contract.sixMonthAPR()
        const one_year_apy = await contract.oneYearAPR()
        const three_year_apy = await contract.threeYearAPR()
        updateTotalRewards(ethers.utils.formatUnits(totalReward, CONFIG.tokenDecimals))
        updateTotalStaked(ethers.utils.formatUnits(totalStake, CONFIG.tokenDecimals))
        updateSixMonthApy(six_month_apy)
        updateOneYearApy(one_year_apy)
        updateThreeYearApy(three_year_apy)
        setDataLoading(false)
    }
    useEffect(() => {
        loadData()

    }, [])
}
