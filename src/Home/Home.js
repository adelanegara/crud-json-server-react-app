import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;