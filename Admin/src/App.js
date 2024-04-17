import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import AdminPanel from './Pages/AdminPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
