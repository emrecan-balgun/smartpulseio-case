import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FinalTable from './finalTable';

function App() {
  const [data, setData] = useState();
  const [objectData, setObjectData] = useState();
  const [objectTime, setObjectTime] = useState();
  const year = 2000;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const BASE_URL = `transparency/service/market/intra-day-trade-history?endDate=${today}&startDate=${today}`;

  useEffect(() => {
    if(data){
      let dataObject = {};
      let timeObject = {};
      let totalTransAmount, totalTransPrice, weightedAvgPrice, time;

      data.map(item => {
          if(dataObject[item.conract]){
            totalTransAmount = dataObject[item.conract].totalTransAmount + item.quantity/10;
            totalTransPrice = dataObject[item.conract].totalTransPrice + (item.price*item.quantity) / 10;
            weightedAvgPrice = totalTransPrice / totalTransAmount;
            dataObject[item.conract] = {'id' : item.conract, 'totalTransPrice' : totalTransPrice , 'totalTransAmount' : totalTransAmount ,'weightedAvgPrice' : weightedAvgPrice}
          }

          else {
            totalTransAmount = item.quantity / 10;
            totalTransPrice = (item.price * item.quantity) / 10;
            weightedAvgPrice = totalTransPrice / totalTransAmount;
            time = new Date(year + parseInt(item.conract.substr(2,2)), item.conract.substr(4,2), item.conract.substr(6,2), item.conract.substr(8,2), 0, 0, 0).toISOString().substr(0, 16).replace('T', ' ')
            dataObject[item.conract] = {'id' : item.conract, 'totalTransPrice' : totalTransPrice , 'totalTransAmount' : totalTransAmount ,'weightedAvgPrice' : weightedAvgPrice}
            timeObject[item.conract] = {'time' : time}
          }
      })

      setObjectData(dataObject)
      setObjectTime(timeObject)
    }
  }, [data]);

  const getFullData = async () => {
    try {
      const data = await axios.get(BASE_URL)
      .then((response) => setData(response.data.body.intraDayTradeHistoryList.filter((item) => item.conract.slice(0,2) === "PH")))
    }
    catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <div className="App">
      <h1>SmartPulse.io Case</h1>
      <button onClick={() => { getFullData() }}>Create Table</button>
      <hr />
      <div>
        <FinalTable objectData={objectData} objectTime={objectTime}/>
      </div>
    </div>
  );
}

export default App;
