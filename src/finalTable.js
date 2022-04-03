import './index.css';

const FinalTable = ({objectData,objectTime}) => {
  return objectData ? (
    <div>
      <h1>Final Table</h1>
      <div className="container">
      <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Toplam İşlem Miktarı (MWh)</th>
              <th>Toplam İşlem Tutarı (TL)</th>
              <th>Ağırlıklı Ortalama Fiyat (TL/MWh)</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(objectData).map((item) => (
                <tr key={item.id}>
                  <td>{objectTime[item.id].time}</td>
                  <td>{item.totalTransAmount.toFixed(2)}</td>
                  <td>{item.totalTransPrice.toFixed(2)}</td>
                  <td>{item.weightedAvgPrice.toFixed(2)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
    
  ) : (
    <div>...</div>
  )
};

export default FinalTable;