import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

export const UniSwapContext = createContext();

export const UniSwapContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(undefined);
  const [slippageAmount, setSlippageAmount] = useState(3); //default 3 %
  const [deadlineMinutes, setDeadlineMinutes] = useState(2); //default 2min
  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);

  // This functions runs on every page refresh and gets connected wallet address.
  useEffect(() => {
    const getCurrentlyConnectedWalletAddress = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log("Wallet is not connected please try again once ");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Please install metamask");
      }
    };
    getCurrentlyConnectedWalletAddress();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        console.log(`Wallet connected successfully and wallet address is ${accounts[0]}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install metamask");
    }
  };

  // Function that listen on account changed
  useEffect(() => {
    const walletRemovedOrWalletChangedListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
          setCurrentAccount(accounts[0]);
        });
      } else {
        console.log("Please install metamask");
      }
    };
    walletRemovedOrWalletChangedListener();
  });

  return <UniSwapContext.Provider value={{ connectWallet, currentAccount, slippageAmount, setSlippageAmount, deadlineMinutes, setDeadlineMinutes }}>{children}</UniSwapContext.Provider>;
};
