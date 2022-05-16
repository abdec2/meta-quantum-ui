import classNames from 'classnames'
import { useContext, useState } from 'react'
import * as yup from 'yup'
import CONFIG from '../abi/config'
import { GlobalContext } from '../context/GlobalContext'
import tokenABI from './../abi/token.json'
import contractABI from './../abi/staking.json'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const schema = yup.object().shape({
    amount: yup.number().required()
})

const StakeForm = ({setError, setErrMsg}) => {
    const [approve, setApprove] = useState(false)
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState('')
    const { account, blockChainData } = useContext(GlobalContext)
    const [provider, setProvider] = useState(null)

    const handleApprove = () => {
        schema.isValid({
            amount
        }).then(async value => {
            if(value) {
                if(account) {
                    const web3modal = new Web3Modal();
                    const instance = await web3modal.connect();
                    const provider = new ethers.providers.Web3Provider(instance);
                    setProvider(provider)
                    const signer = provider.getSigner();
                    const address = await signer.getAddress(); 
                    const tokenContract = new ethers.Contract(CONFIG.tokenAddress,tokenABI, signer)
                    const estimateGas = await tokenContract.estimateGas.approve(CONFIG.contractAddress, ethers.utils.parseUnits(amount.toString(), '5'))
                    console.log(estimateGas.toString())
                    const tx = {
                        gasLimit: estimateGas.toString()
                    }
                    const approveTx = await tokenContract.approve(CONFIG.contractAddress, ethers.utils.parseUnits(amount.toString(), '5'), tx)
                    await approveTx.wait()
                    setApprove(true)
                    console.log(approveTx)


                } else {
                    setError(true) 
                    setErrMsg('Please connect your wallet')
                }
            }
        })
    }

    const handleStake = () => {
        setApprove(false)
    }

    const handleWithdraw = () => {
        schema.isValid({
            amount: balance
        }).then(value => {
            console.log(value)
        })
    }

    return (
        <div className="ml-8 mt-2 mb-4">
            <div>
                <p className="text-xs font-bold uppercase text-[color:var(--font-color)] text-left ">Balance: 0000.00 QTH</p>
                <div className="w-full flex items-center justify-between">
                    <input type="text" name="amount" className="w-3/4 bg-transparent border-2 border-[color:var(--border-color)] text-md focus:outline-none px-2 py-1" value={amount} onChange={e => setAmount(e.target.value)} />
                    <button className={classNames('bg-yellow-500 text-black uppercase px-4 py-2 ml-4 text-sm font-bold hover:text-white', { 'hidden': approve })} onClick={handleApprove}>Approve</button>
                    <button className={classNames('bg-yellow-500 text-black uppercase px-4 py-2 ml-4 text-sm font-bold hover:text-white', { 'hidden': !approve })} onClick={handleStake}>Stake</button>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-xs font-bold uppercase text-[color:var(--font-color)] text-left">Stake Balance: {(blockChainData.StakedBalance) ? blockChainData.StakedBalance : '0.0'} {CONFIG.tokenSymbol}</p>
                <div className="w-full flex items-center justify-between">
                    <input type="text" name="amount" className="w-3/4 bg-transparent border-2 border-[color:var(--border-color)] text-md focus:outline-none px-2 py-1 " value={balance} onChange={e => setBalance(e.target.value)} />
                    <button className="bg-[#3e3f53] uppercase text-[color:var(--font-color)] px-4 py-2 ml-4 text-sm font-semibold hover:text-yellow-500" onClick={handleWithdraw}>Withdraw</button>
                </div>
            </div>
        </div>
    )
}

export default StakeForm