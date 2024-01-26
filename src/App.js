import React from 'react';
import { Routes , Route } from "react-router-dom";
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Exchanges/>} />
      <Route path="/coins" element={<Coins/>} />
      <Route path="/coins/:id" element={<CoinDetails/>} />
      <Route path="/" element={<Exchanges/>} />
    </Routes>
  )
}

export default App;