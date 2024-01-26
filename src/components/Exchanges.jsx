import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
import axios from "axios";
import { baseUrl } from './baseUrl.js';
import Loader from './Loader.js';
import "./Exchanges.css";


const Exchanges = () => {
  const [loading,setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  useEffect(()=>{
    const getExchangeData = async()=>{
      const res = await axios.get(`${baseUrl}/exchanges`);
      console.log(res.data);
      setExchanges(res.data);
      setLoading(false);
    }

    getExchangeData();
  },[])

  return (
    <>
      {
        loading?<Loader /> : <>
        <Header />
        <div>
           {
              exchanges.map((item, index)=>{
                  return(
                    <div key={index} className='ex-cards'>
                    <div className="image">
                        <img height={"50px"} src={item.image} alt="" />
                    </div>
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="price">
                        {"Rs. "}{item.trade_volume_24h_btc.toFixed(0)}
                    </div>
                    <div className="rank">
                        {item.trust_score_rank}
                    </div>
                    </div>
                  )
              })
           }
        </div>
        </>
      }
    </>
  )
}

export default Exchanges;