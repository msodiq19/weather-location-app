/* const container = document.getElementById('map');

function initMap() {
  let map = new google.maps.Map(container, {
    center: { lat: -6.47, lng: 3.41 },
    zoom: 8,
  });
};
 */
console.log(firebase)
const container = document.getElementById("map");
const weather_key = "de740582d03c413ba1b183127212106";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const map = new google.maps.Map(container, {
        center: { lat: lat , lng: lng },
        zoom: 18,
      });

      const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map : map
      });

      const url = `http://api.weatherapi.com/v1/current.json?key=${weather_key}&q=${lat} ${lng}&aqi=yes`;
        fetch(url).then(res=>res.json()).then(json=>{
          const location  = json.location;
          const current = json.current;
          document.querySelector(".weather-info").innerHTML += `

            <div class="current-weather">

              <div class="weather-display">
                <div class="weather-content">
                  <img src=${current.condition.icon}>
                  <p><span>${current.temp_c}&#8451;</span> / <span>${current.temp_f}&#8457;</span></p>
                  <p>${current.condition.text}</p>
                </div>
                <div class="location">
                  <p> ${location.name}, ${location.region}, ${location.country}.</p>
                  <p>lat: ${location.lat} | lng: ${location.lon}</p>
                  <p>updated as of ${current.last_updated}</p>
                </div>
              </div>

              <div class="weather-condition">
                <div class="item">
                  <div class="icon"><i class="fas fa-thermometer-half"></i></div>
                  <div class="item-text">
                    <h4>feels like</h4>
                    <p>${current.feelslike_c}&#8451; / ${current.feelslike_f}&#8457;</p>
                  </div>
                </div>
                <div class="item">
                  <div class="icon"><i class="fas fa-wind"></i></div>
                  <div class="item-text">
                    <h4>wind</h4>
                    <p>${current.wind_kph} km/h</p>
                  </div>
                </div>
                <div class="item">
                  <div class="icon"><i class="fas fa-eye"></i></div>
                  <div class="item-text">
                    <h4>visibility</h4>
                    <p>${current.vis_km} km</p>
                  </div>
                </div>
                <div class="item">
                  <div class="icon"><i class="fas fa-tint"></i></div>
                  <div class="item-text">
                    <h4>humidity</h4>
                    <p>${current.humidity}%</p>
                  </div>
                </div>
                <div class="item">
                  <div class="icon"><i class="fab fa-gripfire"></i></div>
                  <div class="item-text">
                    <h4>pressure</h4>
                    <p>${current.pressure_mb} mb</p>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
    });
  } else {
    console.log("not supported in the browser");
  }
}

/* fetch("https://ipapi.co/197.210.79.47/json/")
  .then(function (response) {
    response.json().then((jsonData) => {
      console.log(jsonData);
    });
  })
  .catch(function (error) {
    console.log(error);
  });  */