function renderTime() {
   // Date
    let myDate = new Date();
    let year = myDate.getYear();
    if(year < 1000){
        year += 1900;
    }
    let day = myDate.getDay();
    let month = myDate.getMonth();
    let daym = myDate.getDate();
    let dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",)
    let monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
    // Date End

    // Time
    let currentTime = new Date();
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();

    if(h === 24){
        h=0;
    } else if(h > 12){
        h = h-0;
    }
    if(h < 10){
        h = "0" + h;
    }
    if(s < 10){
        s = "0" + s
    }
    let myClock = document.getElementById("clockDisplay");
    myClock.textContent = "" +dayArray[day]+ " "+daym + " " + monthArray[month]+ " " +year+ " | " + h +":"+m+":"+s;
    myClock.innerText = "" +dayArray[day]+ " "+daym + " " + monthArray[month]+ " " +year+ " | " + h +":"+m+":"+s;

    setTimeout("renderTime()", 1000);
}
let weather = {
  apiKey: "712e2dcefa1fbaa914ab3003167a6f57",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", 
                                                          () => weather.search(document.getElementById('search-input').innerText));

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


weather.fetchWeather("Denver");