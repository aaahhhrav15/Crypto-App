import React from 'react'
import { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { baseUrl } from './baseUrl';
import Header from './Header.jsx';
import "./Exchanges.css";
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loading,setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =currency==='inr'? "Rs." : "$";

  useEffect(()=>{
    const getCoinsData = async()=>{
      const res = await axios.get(`${baseUrl}/coins/markets?vs_currency=${currency}`);
      console.log(res.data);
      setCoins(res.data);
      setLoading(false);
    }
    getCoinsData();
  },[currency])
  return (
    <>
      {
        loading ? <Loader/> : <>
        <Header/>
        <div className="btns">
            <button onClick={()=>setCurrency("inr")}>INR</button> 
            <button onClick={()=>setCurrency("usd")}>USD</button> 
        </div>
        {
            coins.map((coinData, index)=>{
              return (
                <CoinCard coinData={coinData} index={index} id={coinData.id} currencySymbol={currencySymbol}/>
              )
            })
        }
        </>
      }
    </>
  )
}

const CoinCard=({coinData,index,id,currencySymbol})=>{
  const profit = coinData.price_change_percentage_24h > 0
  return(
    <Link to={`/coins/${id}`} style={{color:"white",textDecoration:'none'}}>
        <div key={index} className='ex-cards'>
        <div className="image">
            <img height={"40px"} src={coinData.image} alt="" />
        </div>
        <div className="name">
            {coinData.name}
        </div>
        <div className="price">
            {currencySymbol} {coinData.current_price.toFixed(2)}
        </div>
        <div style={profit ? {color : "green"} : {color : "red"}}className="profit">
            { profit ? "+"+coinData.price_change_percentage_24h.toFixed(2) : coinData.price_change_percentage_24h.toFixed(2)}{"%"}
        </div>
        </div> 
    </Link>
  )
}

export default Coins;