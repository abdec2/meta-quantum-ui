import classNames from "classnames"
import { useState } from "react"


const plans = [
    {
        plan: 1,
        duration: '6 Months', 
        apy: '30%'
    },
    {
        plan: 2,
        duration: '1 Years', 
        apy: '60%'
    },
    {
        plan: 3,
        duration: '3 Years', 
        apy: '150%'
    }
]

const StakeDetails = () => {
    const [plan, setPlan] = useState(plans[0])
    
    return (
        <>
            <div className="p-6 flex items-center justify-center space-x-2 md:space-x-8">
                <button className={classNames('uppercase truncate text-sm font-bold px-2 py-1 border-2 border-[color:var(--border-color)] hover:text-yellow-500', {'text-yellow-500': plan.plan === 1})} onClick={()=> setPlan(plans[0])}>6 Months</button>
                <button className={classNames('uppercase truncate text-sm font-bold px-2 py-1 border-2 border-[color:var(--border-color)] hover:text-yellow-500', {'text-yellow-500': plan.plan === 2})} onClick={()=> setPlan(plans[1])}>1 Years</button>
                <button className={classNames('uppercase truncate text-sm font-bold px-2 py-1 border-2 border-[color:var(--border-color)] hover:text-yellow-500', {'text-yellow-500': plan.plan === 3})} onClick={()=> setPlan(plans[2])}>3 Years</button>
            </div>
            <div className="mt-4 flex items-start justify-between">
                <div className="space-y-4 text-sm mr-4">
                    <p className="text-left">Lock period: {plan.duration}</p>
                    <p className="text-left">Re-locks on registration: Yes</p>
                    <p className="text-left">Status: Locked</p>
                </div>
                <div className="text-center md:mr-6">
                    <h3 className="uppercase text-2xl font-light">APY</h3>
                    <h1 className="font-bold text-4xl text-yellow-500">{plan.apy}</h1>
                </div>
            </div>
        </>
    )
}

export default StakeDetails