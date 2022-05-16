import { useContext } from "react"
import CONFIG from "../abi/config"
import { GlobalContext } from "../context/GlobalContext"
import StakeDetails from "./StakeDetails"
import StakeForm from "./StakeForm"

const Main = ({setError, setErrMsg}) => {
    const { blockChainData } = useContext(GlobalContext)

    return (
        <div className="container mx-auto md:max-w-5xl px-12 text-[color:var(--font-color)] mt-14 font-Poppins">
            <div className="main flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="w-full md:w-1/2 md:pr-8 mb-8 z-20">
                    <div className="stakePanel bg-[color:var(--cards-bg)] p-6 w-full">
                        <h3 className="uppercase font-semibold text-md font-Poppins text-left">Participate Meta-Quantum Stake</h3>
                        <h2 className="font-extrabold text-2xl ml-3 text-left">{(blockChainData.StakedBalance) ? blockChainData.StakedBalance : '0.00'} {CONFIG.tokenSymbol}</h2>
                        <div className="font-Poppins mt-6 px-3 border-b-2 border-[color:var(--border-color)]">
                            <p className="font-normal text-left">Total Stake</p>
                        </div>
                        <StakeDetails />
                        <StakeForm setError={setError} setErrMsg={setErrMsg} />
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
                                <svg id="chart" width="100%" height="50" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" >     		     <path d="  M0,30  h8  v-0.7098142461564727  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M10,30  h8  v-3.8886121736656065  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M20,30  h8  v-7.535516905963142  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M30,30  h8  v-9.867032085607057  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M40,30  h8  v-14.308029708931354  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M50,30  h8  v-13.650666700270385  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M60,30  h8  v-17.03132200231409  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M70,30  h8  v-19.35071883329862  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> </svg>
                            </div>
                        </div>
                        <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full p-8 items-start text-left justify-between">
                            <div>
                                <h2 className="font-extrabold text-2xl">{(blockChainData.TotalRewards) ? blockChainData.TotalRewards : '0.00'}</h2>
                                <p className="uppercase text-sm font-light">Total User's Rewards</p>
                            </div>
                            <div>
                                <svg id="chart" width="100%" height="50" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" >     		     <path d="  M0,30  h8  v-0.3559955903768852  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M10,30  h8  v-3.2730281691498107  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M20,30  h8  v-4.129306820057437  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M30,30  h8  v-11.36131403794074  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M40,30  h8  v-10.952211091320216  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M50,30  h8  v-14.499437557106283  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M60,30  h8  v-16.20159452944091  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M70,30  h8  v-19.139616076129972  q0,-0 -0,-0  h-8  q-0,0 -0,0  Z" fill="#323347" /> </svg>
                            </div>
                        </div>
                        <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full p-8 items-start text-left justify-between">
                            <div>
                                <h2 className="font-extrabold text-2xl">{(blockChainData.TotalStaked) ? blockChainData.TotalStaked : '0.00'} {CONFIG.tokenSymbol}</h2>
                                <p className="uppercase text-sm font-light">Total Staked</p>
                            </div>
                            <div>
                                <svg id="chart" width="100%" height="50" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" >     		     <path d="  M0,50  h12  v-0.2691140789513824  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M15,50  h12  v-6.1035534408604875  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M30,50  h12  v-12.85295830169808  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M45,50  h12  v-17.121537297632287  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M60,50  h12  v-27.99841373754431  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M75,50  h12  v-32.02205622140259  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M90,50  h12  v-29.322334941779435  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> <path d="  M105,50  h12  v-24.598795157806162  q0,-0 -0,-0  h-12  q-0,0 -0,0  Z" fill="#323347" /> </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main