import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

const TopUp = () => {
  const { userData, setUserData } = useContext(GlobalContext);
  const [topUp, setTopUp] = useState("");
  const navigate = useNavigate();

  const onTopUp = () => {
    const newBalance = parseInt(userData.balance) + parseInt(topUp);
    setUserData({
      ...userData,
      balance: newBalance,
    });
    toast.success("top up success");
    navigate("/");
  };
  return (
    <div className="mx-auto">
      <div className="form-group ">
        <label>Top Up Balance</label>
        <input
          type="number"
          className="form-control"
          value={topUp}
          onChange={(e) => setTopUp(e.target.value)}
        />
      </div>
      <button onClick={onTopUp} className="btn btn-primary">
        TopUp
      </button>
    </div>
  );
};

export default TopUp;