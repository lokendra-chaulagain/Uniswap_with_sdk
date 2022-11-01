import React from "react";
import { AiFillSetting } from "react-icons/ai";

const SettingModal = () => {
  return (
    <div>
      <AiFillSetting className="setting_button" size={25} cursor="pointer" data-bs-toggle="modal" data-bs-target="#swapModal" />

      <div className="modal fade " id="swapModal" tab-index="-1" aria-labelledby="swapModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content rounded-1 customCard">
            <div className="modal-body">
              <h4 className="text-center mb-4">Transaction Setting</h4>

              <label className="">Slippage Tolerance</label>
              <div className="input_field mt-2 d-flex align-items-center gap-2">
                <input className=" input_field border-0 rounded-0 px-2 py-2 " placeholder="0"></input>
                <h6 className="px-2">%</h6>
              </div>

              <label className="mt-4">Transaction Deadline</label>
              <div className="input_field mt-2 d-flex align-items-center gap-2">
                <input className=" input_field border-0 rounded-0 px-2 py-2 " placeholder="0"></input>
                <h6 className="px-2">minutes</h6>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button data-bs-dismiss="modal" type="button" className=" custom_button btn px-3">
                  Cancell
                </button>

                <button type="button" className=" custom_button btn px-3">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
