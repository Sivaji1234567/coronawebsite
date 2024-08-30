import React  from "react";
import './App.css'
import Navbar from './Navbar';
const Home=()=>{
  let login=sessionStorage.getItem("login");
    console.log(login);
  return(
    <div>
      <Navbar/>
      <h1 className="head">Corona</h1>
      <h1 className="home">
        Coronavirus is a large family of viruses that causes illnesses like<br/>
        Severe Acute Respiratory Syndrome (SARS) and 
      the Middle East respiratory syndrome (MERS). Towards the end of the year 2019,<br/>
       a new type of coronavirus called Severe Acute
      Respiratory Syndrome Coronavirus 2 (SARS-CoV-2) was identified. It causes the disease we <br/>
      know as Coronavirus Disease 2019 or
      COVID-19. By March 2020, the World Health Organization (WHO) declared this COVID-19 <br/>
      outbreak as a pandemic.
      Despite the global outbreak news making headlines, and it becoming a major cause of panic,<br/>
       this infection can be prevented. 
      This is because one can only get infected, by coming in contact with someone who already has<br/>
       the infection,
      through air droplets or contaminated surfaces. Thus, healthcare organizations like WHO & others,<br/>
       have issued guidelines,
       recommendations & home isolation advice to prevent the spread of this disease. </h1>
    </div>
  )
}
export default Home;
