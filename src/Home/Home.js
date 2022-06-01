import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Home = () => {
  const { userData, setUserData } = useContext(GlobalContext);
  const [data, setData] = useState();
  const fetchData = async () => {
    const tradeList = await axios.get("http://localhost:3005/tradingList");
    setData(tradeList.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onBuy = (item) => {
    if (userData.balance >= item.priceToBook) {
      const newBalance = userData.balance - item.priceToBook;
      setUserData({
        ...userData,
        balance: newBalance,
        listOrder: [...userData.listOrder, item],
      });
      toast.success(`purchase ${item.name} success`);    } else {
      toast.error("insufficient balance");
    }
  };

  return (
    <div>
      <div className="mb-2 mt-2">
        {userData?.name && (
          <p className="text-lg-center">
            Welcome <strong className="text-success">{userData.name}! </strong>
            Your Balance is $ {" "}
            <strong className="text-secondary">{userData.balance}</strong>
          </p>
        )}
        <Link to={`/topup}`} className="btn btn-sm btn-primary mr-1"> Topup </Link>
      </div>
      <h1>Trade List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Region</th>
            <th scope="col">Currency</th>
            <th scope="col">Market Cap</th>
            <th scope="col">Price to Book</th>
            <th scope="col">Symbol</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.region}</td>
              <td>{item.currency}</td>
              <td>{item.marketCap}</td>
              <td>{item.priceToBook}</td>
              <td>{item.symbol}</td>
              <td className="d-flex flex-row">
                <button
                  className="btn btn-sm btn-primary mr-1"
                  onClick={() => onBuy(item)}
                >
                  BUY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userData?.listOrder.length > 0 && (
        <div className="mt-2">
          <h1>Order List</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Region</th>
                <th scope="col">Currency</th>
                <th scope="col">Market Cap</th>
                <th scope="col">Price to Book</th>
                <th scope="col">Symbol</th>
              </tr>
            </thead>
            <tbody>
              {userData.listOrder?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.region}</td>
                  <td>{item.currency}</td>
                  <td>{item.marketCap}</td>
                  <td>{item.priceToBook}</td>
                  <td>{item.symbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;