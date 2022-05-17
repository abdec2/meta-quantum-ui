import classNames from "classnames"

const MobileMenu = ({ isOpen, setIsOpen, account, disconnectWallet, handleWalletConnect }) => {

  return (
    <div className={classNames('fixed z-40 top-0 left-0 h-screen bg-grad container md:hidden', 
    { 'block animate-slideIn': isOpen, 'hidden ': !isOpen })}>
      <div className="w-full p-8 flex items-center justify-between" >
        <div className="w-20 truncate">
          <img
            src="https://cdn.meta-quantum.io/website/assets/svg/logo.svg"
            alt="meta quantum"
          />
        </div>
        <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
          <svg className="fill-white w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
        </div>
      </div>
      <div className="">
        <ul className="flex flex-col items-center justify-between w-full space-y-11">
          <li className="p-2 truncate">
            <a href="/">Website</a>
          </li>
          <li className="p-2 truncate">
            <a href="/">Audit</a>
          </li>
          <li className="p-2 truncate">
            <a href="/">Whitepaper</a>
          </li>
          <li className="px-4 py-2 border-[4px] border-white font-bold truncate">
            <a href="/">BUY $QTH</a>
          </li>
          <li className="p-2 ml-4 bg-white text-black truncate">
            {account ? (
              <button
                className="uppercase font-bold flex items-center justify-center space-x-2"
                onClick={() => disconnectWallet()}
              >
                <svg
                  className="w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
                </svg>
                <span>
                  {account.slice(0, 5) + '...' + account.slice(37, 42)}
                </span>
              </button>
            ) : (
              <button
                className="uppercase font-bold flex items-center justify-center space-x-2"
                onClick={() => handleWalletConnect()}
              >
                <svg
                  className="w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
                </svg>
                <span>
                  Connect Wallet
                </span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobileMenu