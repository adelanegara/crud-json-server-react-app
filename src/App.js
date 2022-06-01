import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';


function App() {
  return (
    <div className="App">
    <Router>
    <div>
          <ToastContainer />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />  
          <Route path="/" element={<Home />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
