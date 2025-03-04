/* JSON Data Integration: Upon user input (city search), fetch weather data from a local JSON file using the Fetch API.
Parse the received data and update the respective elements (Temperature, Humidity, UV Index, Wind Speed)
with data from the input city accordingly.

 Style Updates: Dynamically adjust the color of icons within each section based on weather conditions.
For example, if the temperature exceeds 20°C, the temperature icon should turn yellow; otherwise, it should remain blue.
Apply similar color adjustments for wind speed, humidity, and UV (you can choose the threshold).*/

function getWeather() {
    // Saving input from user
    var location = document.getElementById('location').value.toLowerCase();
    
    // Fetch the weather data from the local JSON file
    fetch('sample.json')
        .then((response) => response.json())
        .then((data) => {
            // Find the weather data for the input city
            const cityData = data.find(city => city.cityName.toLowerCase() === location);
            
            if (cityData) {
                // Update the respective elements with data from the input city
                document.getElementById('temperature').innerText = `Temperature: ${cityData.temperatureCelsius}°C`;
                document.getElementById('humidity').innerText = `Humidity: ${cityData.humidity * 100}%`;
                document.getElementById('uvIndex').innerText = `UV Index: ${cityData.uvIndex}`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${cityData.windSpeed}`;
                
                // Style Updates based on weather conditions
                // Temperature color change
                if (cityData.temperatureCelsius > 20) {
                    document.getElementById('thermometer').style.fill = 'yellow';
                } else {
                    document.getElementById('thermometer').style.fill = 'blue';
                }

                // Wind speed color change (example threshold: 20km)
                if (parseInt(cityData.windSpeed) > 20) {
                    document.getElementById('windSpeed').style.fill = 'red';
                } else {
                    document.getElementById('windSpeed').style.fill = 'green';
                }

                // Humidity color change (example threshold: 0.5)
                if (cityData.humidity > 0.5) {
                    document.getElementById('drop').style.fill = 'orange';
                } else {
                    document.getElementById('drop').style.fill = 'purple';
                }

                // UV Index color change (example threshold: 5)
                if (cityData.uvIndex > 5) {
                    document.getElementById('uvIndex').style.fill = 'pink';
                } else {
                    document.getElementById('uvIndex').style.fill = 'brown';
                }
            } else {
                console.error('City not found');
            }
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}