const api = {
  key: "16844946433fae1fa6bf480e010132d9",
  baseApi: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector("#search");

searchBox.addEventListener("keypress", (e) => {
  if (e.which == 13 || e.which == 32) {
    getResult(search.value);
    console.log(e.target.value);
  }
});

function getResult(q) {
  fetch(`${api.baseApi}weather?q=${q}&units=metric&appid=${api.key}`)
    //
    .then((wather) => {
      return wather.json();
    })
    .then(displayResult);
}

function displayResult(wather) {
  console.log(wather);
  let city = document.querySelector(".city"),
    temperature = document.querySelector(".temp"),
    date = document.querySelector(".date"),
    lowHigh = document.querySelector(".high_low"),
    weath = document.querySelector(".weather"),
    now = new Date();

  city.innerHTML = `${wather.name}, ${wather.sys.country}`;

  date.innerHTML = dateBuilder(now);

  temperature.innerHTML = `${Math.round(wather.main.temp)}℃`;

  lowHigh.innerHTML = `${Math.round(wather.main.temp_min)}℃ / ${Math.round(
    wather.main.temp_max
  )}℃`;

  let description,
    tem = wather.main.temp;

  if (wather.main.temp < 0) {
    description = "Cold";
  } else if (tem > 0 || tem < 10) {
    description = "Cloudy";
  } else if (tem > 10 || tem < 20) {
    description = "Wet";
  } else {
    description = "Sunny";
  }

  weath.innerHTML = `${description}`;
}

function dateBuilder(a) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[a.getDay()];
  let date = a.getDate();
  let month = months[a.getMonth()];
  let year = a.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
