import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import AdminPanel from './Pages/AdminPanel';
import UserLogin from './Components/UserLogin/UserLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/admindash" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
