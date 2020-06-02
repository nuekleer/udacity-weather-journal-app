/* Global Variables */
const apiKey = "5c3e19698641cd26369f542194b2c048";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

document.getElementById("generate").addEventListener("click", makeEntry);

function makeEntry(event) {
    let zipData =  document.getElementById("zip").value + ",us&units=imperial&appid=";
    getWeatherData(apiURL,zipData,apiKey);
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//console.log(d);

const getWeatherData = async (URL, zip, key) =>{ 
    const request = await fetch(URL+zip+key);
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  const startData = async (url = "") =>{ 
    const request = await fetch("/test");
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}
