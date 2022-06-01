import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './Home/Home';
import Login from './Login/Login';


function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
