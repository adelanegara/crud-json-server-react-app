import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import BuyTrade from './BuyTrade/BuyTrade';
import TopUp from './TopUp/TopUp';


function App() {
  return (
    <div className="App" data-testid="App">
    <Router>
    <div>
      <Navbar/>       
 <ToastContainer />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />  
          <Route path="/" element={<PrivateRoutes component={Home} />} />
          <Route path="/buy" element={<PrivateRoutes component={BuyTrade} />} />
          <Route path="/topup" element={<PrivateRoutes component={TopUp} />} />

          </Routes>


      </Router>
    </div>
  );
}

export default App;
