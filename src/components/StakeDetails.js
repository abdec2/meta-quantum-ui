import classNames from "classnames"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"

const StakeDetails = ({plan, plans, setPlan}) => {
    const { blockChainData } = useContext(GlobalContext)
    

    useEffect(()=>{
        setPlan(plans[0])
    }, [blockChainData.sixMonthApy, blockChainData.oneYearApy, blockChainData.threeYearApy])
    
    return (
        <>
            <div className="p-6 flex items-center justify-center space-x-2 md:space-x-8">
                <button className={classNames('uppercase bg-purple-900 rounded-full truncate text-sm px-2 py-1 border border-white hover:text-purple-400', {'text-purple-400': plan.plan === 1})} onClick={()=> setPlan(plans[0])}>6 Months</button>
                <button className={classNames('uppercase bg-purple-900 rounded-full truncate text-sm px-2 py-1 border border-white hover:text-purple-400', {'text-purple-400': plan.plan === 2})} onClick={()=> setPlan(plans[1])}>1 Years</button>
                <button className={classNames('uppercase bg-purple-900 rounded-full truncate text-sm px-2 py-1 border border-white hover:text-purple-400', {'text-purple-400': plan.plan === 3})} onClick={()=> setPlan(plans[2])}>3 Years</button>
            </div>
            <div className="mt-4 flex items-start justify-between">
                <div className="space-y-4 text-sm mr-4">
                    <p className="text-left">Lock period: {plan.duration}</p>
                    <p className="text-left">Re-locks on registration: Yes</p>
                    <p className="text-left">Status: Locked</p>
                </div>
                <div className="text-center md:mr-6">
                    <h3 className="uppercase text-2xl font-light">APY</h3>
                    <h1 className="font-bold text-4xl text-purple-800">{plan.apy}%</h1>
                </div>
            </div>
        </>
    )
}

export default StakeDetails