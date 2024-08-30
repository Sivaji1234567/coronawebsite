import React, { useState, useEffect } from "react";
import axios from "axios";
import './practice.css';
import Navbar from "./Navbar";
function Practice() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [iso, setIso] = useState('');
  const [date,setDate]=useState('');
  const [name,setName]=useState('');
  const [report,setReport]=useState([]);
  const [province,setProvince]=useState('');
  const [temp,setTemp]=useState(false);
  const [error,setError] =useState('');
  const handleSubmit = () => {
    if (!name || !province || !date) {
      setError('Please enter the details');
    } else {
      setError('');
      setTemp(true);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3003/Regions`)
      .then(res => {
        console.log(res.data.data);
        setCountries(res.data.data);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, []); 
  useEffect(() => {
    if (iso) {  
      axios.get(`http://localhost:3003/prov?iso=${iso}`)
        .then(res => {
          console.log("States data", res);
          setStates([]);
          setStates(res.data.data);
        })
        .catch(err => {
          console.log("error", err);
        });
    } else {
      setStates([]); 
    }
  }, [iso]); 

  useEffect(()=>{
   let  token=localStorage.getItem("token");
    if(temp){
    axios.get(`http://localhost:3003/report?region_province=${province}&iso=${iso}&region_name=${name}&date=${date}`
      , {
        method: 'GET',
         headers: {
          'Authorization':token,
          'Content-Type': 'application/json'
      }
      }
    )
    .then(res=>{
      console.log("reports",res.data.data)
      setReport(res.data.data)
    })
    .catch(err=>{
      console.log("error");
    })
  }},[province,iso,name,date,temp]);
console.log(report);
  return (
    <>
    <Navbar/>
    <div className="full">
      <h1 style={{textAlign:"center"}}>Covid Statistics</h1>
      <div className="half1">
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>SELECT COUNTRY:::</label>
      <select  className="report"
  onChange={e => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setIso(selectedOption.value);
    setName(selectedOption.text);
    setTemp(false);
  }}
>
  <option value="">Select a country</option>
  {countries.map((item) => (
    <option value={item.iso} key={item.iso}>
      {item.name}
    </option>
  ))}
</select>
</div>
<div>
  <label>SELECT PROVINCE:::</label>
      <select  className="report" onChange={e=>{setProvince(e.target.value)
        setTemp(false);
      }}>
        <option value="">Select a province</option> 
        {states.map((item) => (
          <option value={item.province} key={item.iso}>
            {item.province}
          </option>
        ))}
      </select>
      </div>
      <div>
      <label>SELECT THE DATE:::</label>
      <input className="report" type="date" onChange={(e) => {setDate(e.target.value)
       setTemp(false);
      }}  />
      </div>
      <div>
      <button  disabled={!name || !province || !date} onClick={handleSubmit}>Generate Report</button>
      </div>
      </div>
      <div className="half2">
       <div> <h1>REPORT</h1></div>
       <div>
        {temp ? (
        report.map((item, index) => (
          <div key={index}>
  
            <p><strong>Confirmed: {item.confirmed}</strong></p>
            <p><strong>Deaths: {item.deaths}</strong></p>
            <p><strong>Recovered: {item.recovered}</strong></p>
            <p><strong>Confirmed Difference: {item.confirmed_diff}</strong></p>
            <p><strong>Deaths Difference: {item.deaths_diff}</strong></p>
            <p><strong>Recovered Difference: {item.recovered_diff}</strong></p>
            <p><strong>Last Update: {item.last_update}</strong></p>
            <p><strong>Active: {item.active}</strong></p>
            <p><strong>Active Difference: {item.active_diff}</strong></p>
            <p><strong>Fatality Rate:</strong> {item.fatality_rate.toFixed(4)}</p>
        
          </div>
        ))
      ) : !temp ? "" : (
        <p>No reports found.</p>
      )}
      </div>
      
      </div>
    </div>
    </>
  );
}

export default Practice;

