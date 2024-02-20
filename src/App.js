import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import CakesPage from './pages/CakesPage';
import GeneratePage from './pages/GeneratePage';
import FaqsPage from './pages/FaqsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakesPage/>} />
          <Route path="/generatecake" element={<GeneratePage/>} />
          <Route path="/faqs" element={<FaqsPage/>} />
          <Route path="/aboutus" element={<AboutUsPage/>} />
          <Route path="/contactus" element={<ContactUsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
