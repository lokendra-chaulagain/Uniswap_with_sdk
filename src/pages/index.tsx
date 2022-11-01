import { useContext } from "react";
import MainCard from "../components/MainCard";
import { UniSwapContext } from "../context/Context";

const Home = () => {
  const { connectWallet, currentAccount } = useContext(UniSwapContext);
  return (
    <div className="app_body">
      <div className="pt-3 px-4 d-flex container justify-content-end">
        <button onClick={connectWallet} type="button" className="custom_button btn px-4 py-2 rounded-pill">
          {currentAccount ? `${currentAccount.substring(0, 10)}... ` : "Connect Wallet"}

        </button>
      </div>

      <div className="d-flex align-items-center justify-content-center mt-5">
        <MainCard />
      </div>
    </div>
  );
};

export default Home;
