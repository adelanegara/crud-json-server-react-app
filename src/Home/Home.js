import React, {useEffect} from 'react'
import Database from "../../db.json"
import axios from 'axios';

const Home = () => {
  // const fetchData = async () => {
  //   const users = await axios.get(
  //     " http://localhost:3005/tradingList",
  //   );
  //   users.data.forEach((item) => {
  //     const { tradingId, name, region, currency, marketCap, priceToBook, symbol } = item;
      
  //   });
  // };

  // useEffect(() => {
  //   if (trade.length === 0) {
  //     fetchData();
  //   }
  // }, []);

  return (
    // <div>

    // </div>
    <div><h1>Home</h1>
    {Database && Database.map(database => {
      return(
        <div key={database.tradingId }> {database.name} </div>
      )
    })}


    </div>
  )
}

export default Home