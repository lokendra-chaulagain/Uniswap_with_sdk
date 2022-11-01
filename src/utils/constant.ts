import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import ERC20ABI from "./abi.json";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const ALCHEMY_GOERLI_TESTNET_API_URL_KEY = process.env.ALCHEMY_GOERLI_TESTNET_API_URL_KEY;
const goerli_testnet_chainId = 5;
const web3Provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_TESTNET_API_URL_KEY);
// creating instance of alphaRouter
const router = new AlphaRouter({ chainId: goerli_testnet_chainId, provider: web3Provider });

const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = ""; //wrapped ether address on goerli testnet not other testnet.

const name1 = "Uniswap Token";
const symbol1 = "UNI";
const decimals1 = 18;
const address1 = ""; //Uniswap Token address on goerli testnet not other testnet.

//creating instance of both tokens
const WETH = new Token(goerli_testnet_chainId, address0, decimals0, symbol0, name0);
const UNI = new Token(goerli_testnet_chainId, address1, decimals1, symbol1, name1);

//get both contracts
export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider);
export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider);

//To find how much token is in a wallet we have to make request to that Token contract.

//getting current price from uniswap
export const getPrice = async (inputAmount: any, slippageAmount: any, deadline: any, walletAddress: any) => {
  //convert slippage amount and convert into percent
  const percentSlippage = new Percent(slippageAmount, 100);
  //convert input amount into wei
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

  //use compatible version otherwise it shows error
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));

  const route = await router.route(currencyAmount, UNI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);

  return [transaction, quoteAmountOut, ratio];
};

// function that actually runs the swap
export const runSwap = async (transaction: any, signer: any) => {
  //approve uniswap to access my wallet
  const approvalAmount = ethers.utils.parseUnits("2", 18).toString();
  const contract0 = getWethContract();
  await contract0.connect(signer).approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);
  signer.sendTransaction(transaction);
};
