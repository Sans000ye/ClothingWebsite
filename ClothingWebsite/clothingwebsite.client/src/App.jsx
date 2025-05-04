import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home";
import Sort from "./Pages/Sort";
import Casual from "./components/Casual/Casual";
import Formal from "./components/Formal/Formal";
import Party from "./components/Party/Party";
import Gym from "./components/Gym/Gym";
import Cart from "./components/Cart/Cart";
import NewArrivals from "./components/NewArrivals/NewArrivals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Sort/:category?" element={<Sort />} />
          <Route path="casual" element={<Casual />} />
          <Route path="formal" element={<Formal />} />
          <Route path="party" element={<Party />} />
          <Route path="gym" element={<Gym />} />
          <Route path="cart" element={<Cart />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
