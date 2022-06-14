import { useContext, useState } from "react"
import CONFIG from "../abi/config"
import { GlobalContext } from "../context/GlobalContext"
import StakeDetails from "./StakeDetails"
import StakeForm from "./StakeForm"
import LoadingSpinner from './LoadingSpinner'
import contractABI from './../abi/staking.json'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const Main = ({ setError, setErrMsg }) => {
    const { blockChainData, account, updateRewardBalance } = useContext(GlobalContext)
    const [isLoading, setLoading] = useState(false)
    const plans = [
        {
            plan: 0,
            duration: '6 Months',
            apy: blockChainData.sixMonthApy
        },
        {
            plan: 1,
            duration: '1 Years',
            apy: blockChainData.oneYearApy
        },
        {
            plan: 2,
            duration: '3 Years',
            apy: blockChainData.threeYearApy
        }
    ]
    const [plan, setPlan] = useState(plans[0])

    return (
        <div className="container mx-auto md:max-w-5xl px-4 text-[color:var(--font-color)] mt-14 font-Poppins">

            <div className="main flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="w-full md:w-1/2 md:pr-8 mb-8 z-10">
                    <div className="stakePanel bg-[color:var(--cards-bg)] p-6 w-full">
                        <h3 className="uppercase font-semibold text-md font-Poppins text-left">Participate Meta-Quantum Stake</h3>
                        <h2 className="font-extrabold text-2xl ml-3 text-left">{(blockChainData.StakedBalance) ? parseFloat(blockChainData.StakedBalance) + parseFloat(blockChainData.StakedBalance1) + parseFloat(blockChainData.StakedBalance2) : '0.00'} {CONFIG.tokenSymbol}</h2>
                        <div className="font-Poppins mt-6 px-3 border-b-2 border-[color:var(--border-color)]">
                            <p className="font-normal text-left">Total Stake</p>
                        </div>
                        <StakeDetails plan={plan} plans={plans} setPlan={setPlan} />
                        <StakeForm setError={setError} setErrMsg={setErrMsg} plan={plan} />
                    </div>
                </div>
                <div className="stakeInfo md:pl-20 w-full md:w-1/2 mb-8 z-10">
                    <div className="flex flex-col space-y-11 items-center justify-center">
                        <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full p-8 items-start justify-between text-left">
                            <div>
                                <h2 className="font-extrabold text-2xl">$0.00001</h2>
                                <p className="uppercase text-sm font-light">Token Price</p>
                            </div>
                            <div>
                                <svg id="chart" width="100%" height="50" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" >
                                    <defs>
                                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stopColor="#9f78ff" />
                                            <stop offset="0.547" stopColor="#f067ff" />
                                            <stop offset="1" stopColor="#5c33c2" />
                                        </linearGradient>
                                    </defs>
                                    <path d="  M0,30  h8  v-0.7098142461564727  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M10,30  h8  v-3.8886121736656065  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M20,30  h8  v-7.535516905963142  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M30,30  h8  v-9.867032085607057  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M40,30  h8  v-14.308029708931354  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M50,30  h8  v-13.650666700270385  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M60,30  h8  v-17.03132200231409  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M70,30  h8  v-19.35071883329862  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full p-8 items-start text-left justify-between">
                            <div>
                                <h2 className="font-extrabold text-2xl">{(blockChainData.TotalRewards) ? blockChainData.TotalRewards : '0.00'}</h2>
                                <p className="uppercase text-sm font-light">Total Claimed Rewards</p>
                            </div>
                            <div>
                                <svg id="chart" width="100%" height="50" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" >
                                    <defs>
                                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stopColor="#9f78ff" />
                                            <stop offset="0.547" stopColor="#f067ff" />
                                            <stop offset="1" stopColor="#5c33c2" />
                                        </linearGradient>
                                    </defs>
                                    <path d="  M0,30  h8  v-0.3559955903768852  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M10,30  h8  v-3.2730281691498107  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M20,30  h8  v-4.129306820057437  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M30,30  h8  v-11.36131403794074  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M40,30  h8  v-10.952211091320216  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M50,30  h8  v-14.499437557106283  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M60,30  h8  v-16.20159452944091  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M70,30  h8  v-19.139616076129972  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full p-8 items-start text-left justify-between">
                            <div>
                                <h2 className="font-extrabold text-2xl">{(blockChainData.TotalStaked) ? blockChainData.TotalStaked : '0.00'} {CONFIG.tokenSymbol}</h2>
                                <p className="uppercase text-sm font-light">Total Staked</p>
                            </div>
                            <div>
                                <svg id="chart" width="100%" height="50" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" >
                                    <defs>
                                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stopColor="#9f78ff" />
                                            <stop offset="0.547" stopColor="#f067ff" />
                                            <stop offset="1" stopColor="#5c33c2" />
                                        </linearGradient>
                                    </defs>
                                    <path d="  M0,50  h12  v-0.2691140789513824  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M15,50  h12  v-6.1035534408604875  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M30,50  h12  v-12.85295830169808  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M45,50  h12  v-17.121537297632287  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M60,50  h12  v-27.99841373754431  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M75,50  h12  v-32.02205622140259  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M90,50  h12  v-29.322334941779435  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                    <path d="  M105,50  h12  v-24.598795157806162  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="url(#linear-gradient)" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {account && (
                <div className="stakePanel bg-[color:var(--cards-bg)] p-6 w-full mb-3">
                    <h3 className="uppercase font-bold text-lg font-Poppins text-left">CLAIMABLE AFTER TENURE COMPLETION</h3>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:space-x-10 truncate">
                        <div className="bg-slate-200 bg-opacity-5 px-6 py-4 w-full rounded-lg mb-6 md:mb-0">
                            <h2 className="text-xl text-center font-bold mb-4 uppercase border-b pb-2 border-white border-opacity-20">6 Months</h2>
                            <p className="text-sm">Rewards Earned: {(blockChainData.RewardBalance) ? parseFloat(blockChainData.RewardBalance).toFixed(2) : '0.00'} {CONFIG.tokenSymbol}</p>
                            <p className="text-sm">Stake Amount: {blockChainData.StakedBalance} {CONFIG.tokenSymbol}</p>
                        </div>
                        <div className="bg-slate-200 bg-opacity-5 px-6 py-4 w-full rounded-lg mb-6 md:mb-0">
                            <h2 className="text-xl text-center font-bold mb-4 uppercase border-b pb-2 border-white border-opacity-20">1 Year</h2>
                            <p className="text-sm">Rewards Earned: {(blockChainData.RewardBalance1) ? parseFloat(blockChainData.RewardBalance1).toFixed(2) : '0.00'} {CONFIG.tokenSymbol}</p>
                            <p className="text-sm">Stake Amount: {blockChainData.StakedBalance1} {CONFIG.tokenSymbol}</p>
                        </div>
                        <div className="bg-slate-200 bg-opacity-5 px-6 py-4 w-full rounded-lg mb-6 md:mb-0">
                            <h2 className="text-xl text-center font-bold mb-4 uppercase border-b pb-2 border-white border-opacity-20">3 Years</h2>
                            <p className="text-sm">Rewards Earned: {(blockChainData.RewardBalance2) ? parseFloat(blockChainData.RewardBalance2).toFixed(2) : '0.00'} {CONFIG.tokenSymbol}</p>
                            <p className="text-sm">Stake Amount: {blockChainData.StakedBalance2} {CONFIG.tokenSymbol}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main