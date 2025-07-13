import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Cart from "./components/Cart/Cart";
import Casual from "./components/Casual/Casual";
import Formal from "./components/Formal/Formal";
import Party from "./components/Party/Party";
import Gym from "./components/Gym/Gym";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import Product from "./components/Product/Product";
import { CartProvider } from "./components/contexts/CartContext";
import Sort from "./Pages/Sort";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="Sort/:category?" element={<Sort />} />
            <Route path="/casual" element={<Casual />} />
            <Route path="/formal" element={<Formal />} />
            <Route path="/party" element={<Party />} />
            <Route path="/gym" element={<Gym />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup/>} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
