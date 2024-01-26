import React from 'react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from './baseUrl';
import "./coinDetail.css";
import { BiSolidUpArrow ,BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from './CoinChart';


const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] =useState("inr");

  useEffect(()=>{
      const getCoin = async()=>{
        try{
          const {data} = await axios.get(`${baseUrl}/coins/${id}`);
          console.log(data);
          setCoin(data);
        }
        catch(error)
        {
          console.log(error);
        }
        setLoading(false);
      }
      getCoin(); 
  },[id])  
  
  const profit = coin.market_data && coin.market_data.price_change_percentage_24h_in_currency &&
        coin.market_data.price_change_percentage_24h_in_currency.inr > 0;

  return (  
    <>
    {
      loading? <Loader /> :<> 
          
          <div className='coin-detail'>
            <div className="coin-info">
              <div className="btn">
                  <button onClick={()=>setCurrency("inr")}>INR</button> 
                  <button onClick={()=>setCurrency("usd")}>USD</button> 
              </div>
              <div className="time">
                  {coin.last_updated}
              </div>
              <div className="image">
                  <img height={"150px"} src={coin.image.large} alt="" />
              </div>
              <div className="name">
                  {coin.name}
              </div>
              <div className="price">
                  {currency === "inr" ? "Rs. " : "$ "}{coin.market_data.current_price[currency]}
              </div>
              <div className="profit">
                 {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/> }{"  "}  
                 { coin.market_data.price_change_percentage_24h_in_currency.inr} %
              </div>
              <div className="rank">
                 <IoPulseOutline color='orange'/> # {coin.market_cap_rank}
              </div>
              <div className="info">
                  <p>{coin.description.en.split('.')[0]}.</p>
              </div>
            </div>
            <div className='chart'>
                <CoinChart currency={currency}/>
            </div>
          </div>
      </>
    }
    </>
  )
}

export default CoinDetails;