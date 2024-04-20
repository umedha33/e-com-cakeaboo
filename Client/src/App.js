import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import CakesPage from './pages/CakesPage';
import GeneratePage from './pages/GeneratePage';
import FaqsPage from './pages/FaqsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import Footer from './components/Footer/Footer';
import MyAccountPage from './pages/MyAccountPage';
import SingleProduct from './components/SingleProduct/SingleProduct';
import CartPage from './pages/CartPage';
import Checkout from './components/Checkout/Checkout';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserLogin from './components/UserLogin/UserLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakesPage />} />
          <Route path="/generatecake" element={<GeneratePage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/myaccount" element={<MyAccountPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/userlogin' element={<UserLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
