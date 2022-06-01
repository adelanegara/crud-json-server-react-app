import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import TopUp from './components/TopUp/TopUp';


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
          <Route path="/topup" element={<PrivateRoutes component={TopUp} />} />

          </Routes>


      </Router>
    </div>
  );
}

export default App;
