import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userData, setUserData } = useContext(GlobalContext);
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedData?.priceToBook * quantity;
  const fetchData = async () => {
    const tradeList = await axios.get("http://localhost:3005/tradingList");
    setData(tradeList.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickBuy = (item) => {
    handleOpen();
    setSelectedData(item);
    setQuantity(1);
  };

  const onBuy = () => {
    if (userData.balance >= totalPrice) {
      const order = {
        ...selectedData,
        quantity,
        totalPrice,
      };
      const newBalance = userData.balance - totalPrice;
      const checkTradingId = userData.listOrder.find((item) => {
        return item.tradingId === selectedData.tradingId;
      });
      let newListOrder = [];
      if (checkTradingId) {
        newListOrder = userData.listOrder.map((object) => {
          if (object.tradingId === selectedData.tradingId) {
            const newQuantity = parseInt(object.quantity) + parseInt(quantity);
            return { ...object, quantity: newQuantity };
          }
          return object;
        });
      } else {
        newListOrder = [...userData.listOrder, order];
      }
      setUserData({
        ...userData,
        balance: newBalance,
        listOrder: newListOrder,
      });
      toast.success(`purchase ${selectedData.name} success`);
    } else {
      toast.error("insufficient balance");
    }
    handleClose();
  };

  return (
    <div>
      <div className="mb-2 mt-2">
        {userData?.name && (
          <p className="text-lg-center">
            Welcome <strong className="text-success">{userData.name}! </strong>
            Your Balance is ${" "}
            <strong className="text-secondary">{userData.balance}</strong>
          </p>
        )}
        <Link to={`/topup`} className="btn btn-sm btn-primary mr-1 m-5">
          {" "}
          Topup{" "}
        </Link>
       
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
                  onClick={() => onClickBuy(item)}
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
                <th scope="col">Quantity</th>
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
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <table className="table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{selectedData?.name}</td>
              </tr>
              <tr>
                <th>Region:</th>
                <td>{selectedData?.region}</td>
              </tr>
              <tr>
                <th>Currecncy:</th>
                <td>{selectedData?.currency}</td>
              </tr>
              <tr>
                <th>Market Cap:</th>
                <td>{selectedData?.marketCap}</td>
              </tr>
              <tr>
                <th>Price To Book:</th>
                <td>{selectedData?.priceToBook}</td>
              </tr>
              <tr>
                <th>Symbol:</th>
                <td>{selectedData?.symbol}</td>
              </tr>
              <tr>
                <th>Total Price:</th>
                <td>{totalPrice}</td>
              </tr>
              <tr>
                <th>Quantity:</th>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-secondary" onClick={onBuy}>
            Buy
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;