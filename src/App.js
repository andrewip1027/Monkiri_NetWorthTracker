import React, { useState }from 'react';
import logo from './logo.svg';
import './App.css';

const months = [ 
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
 ]

function App() {
 



  const [name, setName] = useState('');
  const [monthValues, setMonthValues] = useState(new Array(12).fill(0));

  const assetDataKey = 'asset_data';
  const getAssetData = () => {
    const assetDataJson = localStorage.getItem(assetDataKey);
{/*check if not equal to assetData  */}
    if (!assetDataJson) return [];
    return JSON.parse(assetDataJson);
  };

  const [assetData, setAssetData] = useState(getAssetData());

{/* Add -> store asset name */}
  const onNameChanged = (event) => setName(event.target.value);

  const onMonthValueChanged = (event, monthIndex) => {
    const newMonthValues = [...monthValues];
    newMonthValues[monthIndex] = parseFloat(event.target.value); // parseFloat convert string to num 
    setMonthValues(newMonthValues);
  };
  {/*on click ADD button function */}
  const onAddClicked = () => {
    console.log(name);
    console.log(monthValues);
    
    const newAssetData = [...assetData];
    newAssetData.push({
      name,
      monthValues,
    });
    setAssetData(newAssetData);
    localStorage.setItem(assetDataKey, JSON.stringify(newAssetData));
  };

  return (
    //Create a form where the user can input different assets (banking accounts, real estate, etc)
  <div>
  <div>
    <h3>Net worth Tracker:</h3>
  </div>

  {/*jan */}
  <table>
  <thead>
  <tr>
  <th>Asset</th>
  {months.map(month => <th key={month}>{month}</th>)}{/* .map creates a new array populated with the results of calling a provided function on every element in the calling array. */}
  </tr>
  </thead>

  {/*Months*/}
  <tbody>
  <tr>
  <td><input type="text" onChange={onNameChanged}/></td>
  {months.map((month, i) => <td key={month}><input type="number" step={0.01} onChange={(e) => onMonthValueChanged(e, i)}/></td>)}  
  {/*Dont need input closing tag     step = more than 2 decimal palces*/}
  </tr>  
  </tbody>
  </table>

  {/*Add button*/}
  <button onClick={onAddClicked}>Add</button> 
  
  <div>
  <table>
 <thead>
  <tr>
  <th>Asset</th>
  {months.map(month => <th key={month}>{month}</th>)}
  </tr>
 </thead>

 <tbody>
 {assetData.map(asset => <tr><td>{asset.name}</td>{months.map((month, i) => <td key={month}>{asset.monthValues[i]}</td>)}</tr>)}
    <tr>
    <td>Net</td>
  {/* Reduce go through every array*/}
    {months.map((_, i) => <td>{assetData.reduce((sum, data) => sum + data.monthValues[i], 0)}</td>)}
    </tr>
 </tbody>
 
 </table>
  

  </div>

</div>



  );
}

export default App;
