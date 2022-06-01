import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData } =
  useContext(GlobalContext);
  const [data, setData] = useState();
  const fetchData = async () => {
    const tradeList = await axios.get("http://localhost:3005/tradingList");
    setData(tradeList.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
          <div className="mb-2 mt-2">
            {userData?.name && (
              <p className="text-lg-center">
                Welcome{" "}
                <strong className="text-success">{userData.name}! </strong>
                Your Balance is {" "}
                <strong className="text-secondary">{userData.balance}</strong>
              </p>
            )}
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
                        <Link
                          to=""
                          className="btn btn-sm btn-primary mr-1"
                        >
                          BUY
                        </Link>
                       
                      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;