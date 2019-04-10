window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/8772d8455eb34c9494f18bc4cee6fa88/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    const timezone = data.timezone;

                    temperatureDegree.textContent = Math.floor((temperature - 32) / 1.8);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;

                    setIcons(icon, document.getElementById('weather-icon'));
                })

        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            "color": "#fff",
            "resizeClear": true
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});