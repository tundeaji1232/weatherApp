window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           console.log(position) 
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/0d5dbf1f579a6f573205ab85aac59ffd/${lat},${long}`;
           fetch(api)
           .then(response =>{
               return response.json();
           })
           .then(data=>{
               console.log(data);
               const { icon,temperature,summary } = data.currently;
               //set DOM element from the API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;
                let celsius = (temperature - 32)* (5/9);
            
               //call the seticon function and use icon from api and .icon from canvas
               //knowing that icon will be changed to the skycon format and set and played
               setIcons (icon, document.querySelector(".icon"));
               temperatureSection.addEventListener("click", ()=>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })
           })
        })
        function setIcons(icon, iconID){
            //creates a new instance of the sky icon object
            const skycons = new Skycons({ color: 'white'});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        }
        
    } else{
        h1.textContent = " pls enable your geolocation"
    }
});

//navigator function already comes with details of the nav but to access
//it we would assign the value with position and the re-assign the object value to
//our our variable...position variable we use carries all the detail we can the use too
// again data is our variable to carry the response from the api call using
//fetch