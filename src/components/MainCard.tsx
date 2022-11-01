import React, { useContext } from "react";
import { UniSwapContext } from "../context/Context";
import SettingModal from "./SettingModal";

const MainCard = () => {
  const { connectWallet, currentAccount } = useContext(UniSwapContext);
  return (
    <div className="card customCard px-2 py-3 border-1 rounded-1">
      <div className="d-flex mb-2 align-items-center justify-content-between ">
        <h5>Swap</h5>

        <SettingModal />
      </div>

      <div className=" input_field row m-0 py-2">
        <div className=" col ">
          <input className="input_field border-0 rounded-0 " placeholder="0"></input>
        </div>

        <div className="col d-flex flex-column align-items-end">
          <button type="button" className=" custom_button btn px-5 disabled border-1  rounded-pill">
            USDC
          </button>
          <h6 className="mt-2">
            Balance : 00465057 <span className="pure_blue">Max</span>
          </h6>
        </div>
      </div>

      <div className="input_field row m-0 py-2 mt-2">
        <div className=" col ">
          <input className=" input_field border-0 rounded-0 " placeholder="0"></input>
        </div>

        <div className="col d-flex flex-column align-items-end">
          <button type="button" className=" custom_button btn px-5 disabled border-1  rounded-pill">
            USDC
          </button>
          <h6 className="mt-2">
            Balance : 00465057 <span className="pure_blue">Max</span>
          </h6>
        </div>
      </div>

      {currentAccount ? (
        <button type="button" className="custom_button btn px-4 py-3 mt-3  rounded-1">
          Swap
        </button>
      ) : (
        <button onClick={connectWallet} type="button" className="custom_button btn px-4 py-3 mt-3  rounded-1">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default MainCard;
