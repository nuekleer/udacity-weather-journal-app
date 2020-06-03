/* Global Variables */
const apiKey = "5c3e19698641cd26369f542194b2c048";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//form submitted event listener
document.getElementById("weatherForm").addEventListener("submit", makeEntry);

//triple stack
function makeEntry(event) {
  event.preventDefault();
  getPostGet();
}

//async get request to api to get current temp
//return it for the chained promise
const getWeatherData = async (URL, zip, key) =>{ 
  const request = await fetch(URL+zip+key);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData.main.temp;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
    alert("Weather data unavailable at this time");
  }
}

const showData = async (url = "") =>{ 
  const request = await fetch("/show");
  try {
    // Transform into JSON
    const allData = await request.json();
    //set html to display latest post
    if(allData[0] != "empty"){
      document.getElementById('temp').innerHTML = "Temp: " + allData[allData.length - 1].temp + "&deg;F";
      document.getElementById('content').innerHTML = "Feeling: " + allData[allData.length - 1].response;
      document.getElementById('date').innerHTML = "Date: " +allData[allData.length - 1].date;
    }
  }
  catch(error) {
      console.log("error", error);
      // appropriately handle the error
      alert("Unable to display data at this time");
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
    }catch(error) {
    console.log("error", error);
    alert("Unable to save data at this time");
    }
}

function getPostGet(){
  //get zip code set up api call
  let zipData =  document.getElementById("zip").value + ",us&units=imperial&appid=";
  
  //triple 'then' to get weather - post it to array - diplay on screen
  getWeatherData(apiURL,zipData,apiKey).then(function(data){
    postData("/addWeather", {temp: data, date: newDate, response: document.getElementById('feelings').value});
  }).then(showData);

}

//show data on refresh
showData();
