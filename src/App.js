import React from 'react';
import { Routes , Route, BrowserRouter } from "react-router-dom";
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Exchanges/>} />
      <Route path="/coins" element={<Coins/>} />
      <Route path="/coins/:id" element={<CoinDetails/>} />
    </Routes>
  )
}

export default App;
