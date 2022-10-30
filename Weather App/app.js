// Initializing all elements constants
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");


// Adding event listen to the form
form.addEventListener("submit", search);


// Default Location
let city="karachi";

// Function to fetch Data from Weather API
const fethData=async (city)=>{

   try {
    const url=`https://api.weatherapi.com/v1/current.json?key=d7e06d858aeb44f9baa121118223010&q=${city}`

    const response= await fetch(url);
    const data =await response.json();

    // console.log(data)

    // Destructuring
    const {
        current:{
            temp_c,
            condition:{text,icon} 
        },
       location:{
        name,
        localtime,
    }
    }=data;

  // Calling update Dom Function
    updateDom(temp_c,name,localtime,icon,text)
    
   } catch (error) {
    alert("Location Not Found")
    
   }
     

}
// Function to update Dom
const updateDom=(temp,city,time,emoji,text) =>{
    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=getDayFullName(new Date(exactDate).getDay())
    dateField.innerText=`${exactTime} - ${exactDay} ${exactDate}`;
    temperateField.innerHTML=temp;
    cityField.innerHTML=city;
    // console.log(getDayFullName(4))
    emojiField.src=emoji;
    weatherField.innerText=text;
}

fethData(city)

// Function to search the location
function search(e) {

    e.preventDefault();

    city=searchField.value;

    fethData(city)
    
}



// Function to get the name of day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
            break;
            
        case 1:
        return "Monday";
        break;    
        
        case 2:
            return "Tuesday";
            break;

        case 3:
        return "Wednesday";
        break;    

        case 4:
            return "Thursday";
            break;


        case 5:
            return "Friday";
            break;       


        case 6:
            return "Saturday";
            break;

        default:
            return "Don't know"
            break;
    }
    
}
