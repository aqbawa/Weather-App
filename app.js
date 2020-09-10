window.addEventListener("load", () => {
  let long;
  let lat;
  let timeZone = document.querySelector(".timeZone");
  let temp = document.querySelector(".currentTemp");
  let discription = document.querySelector(".discription");
  let degree = document.querySelector(".degree");
  let tempSpan = document.querySelector(".degree span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          const timezone = data.timezone;
          timeZone.textContent = timezone;
          temp.textContent = temperature;
          discription.textContent = summary;
          let celcius = (temperature - 32) * (5 / 9);
          setIcons(icon, document.querySelector(".icon"));
          degree.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              temp.textContent = Math.floor(celcius);
            } else {
              tempSpan.textContent = "F";
              temp.textContent = temperature;
            }
          });
        });
    });
  }
  const setIcons = (icon, iconId) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  };
});
