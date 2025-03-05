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
            const inputCityData = data.find(city => city.cityName.toLowerCase() === location);

            // Store the weather data in sessionStorage
            sessionStorage.setItem('inputCityWeatherData', JSON.stringify(inputCityData));
            
            if (inputCityData) { // if the city data exists

                console.log(inputCityData); // for debugging purposes
                console.log(sessionStorage['inputCityWeatherData']); // for debugging purposes
                
            } else {
                console.error('City not found');
            }
        })
}

// Update the respective elements with data from the input city

// Function to retrieve weather data from sessionStorage
function getStoredWeatherData() {
    const storedWeatherData = sessionStorage.getItem('inputCityWeatherData');
    return storedWeatherData ? JSON.parse(storedWeatherData) : null; // return the parsed JSON data or null if no data is found
}

function updateHumidity() {

    // Update temperature reading from session storage
    const cityData = getStoredWeatherData();

    // Update humidity reading
    document.getElementById('humidityReading').innerText = `${cityData.humidity}`;

    // Humidity color change (example threshold: 0.5)
    if (cityData.humidity > 0.5) {
        document.getElementById('dropBottom').style.fill = 'orange';
        document.getElementById('dropTop').style.fill = 'orange';
    } else {
        document.getElementById('dropBottom').style.fill = 'purple';
        document.getElementById('dropTop').style.fill = 'purple';
    }
}

function updateTemperature() {

    // Update temperature reading from session storage
    const cityData = getStoredWeatherData();

    // Update temperature reading from session storage
    document.getElementById('temperatureReading').innerText = `${cityData.temperatureCelsius}`;

    // Style Updates based on weather conditions
    // Temperature color change
    if (parseInt(`${cityData.temperatureCelsius}`) >= 20) {
        document.getElementById('thermometerBase').style.fill = 'yellow';
        document.getElementById('thermometerNeck').style.fill = 'yellow';
    } else {
        document.getElementById('thermometerBase').style.fill = 'blue';
        document.getElementById('thermometerNeck').style.fill = 'blue';
    }
}

function toggleTemperatureUnit() {
    const cityData = getStoredWeatherData();
    const tempUnitCheckbox = document.getElementById('tempUnit');
    const temperatureReading = document.getElementById('temperatureReading');

    if (tempUnitCheckbox.checked) {
        // Convert Celsius to Fahrenheit
        const tempFahrenheit = (cityData.temperatureCelsius * 9/5) + 32;
        temperatureReading.innerText = tempFahrenheit.toFixed(1); // Rounded to 1 decimal place
    } else {
        // Display Celsius
        temperatureReading.innerText = cityData.temperatureCelsius;
    }
}

function updateUv() {

    // Update temperature reading from session storage
    const cityData = getStoredWeatherData();

    // Update UV Index reading from session storage
    document.getElementById('uvReading').innerText = `${cityData.uvIndex}`;

    // UV Index color change (example threshold: 5)
    if (cityData.uvIndex > 5) {
        document.getElementById('center').style.fill = 'pink';
        document.getElementById('nBeam').style.fill = 'pink';
        document.getElementById('nwBeam').style.fill = 'pink';
        document.getElementById('wBeam').style.fill = 'pink';
        document.getElementById('swBeam').style.fill = 'pink';
        document.getElementById('sBeam').style.fill = 'pink';
        document.getElementById('seBeam').style.fill = 'pink';
        document.getElementById('eBeam').style.fill = 'pink';
        document.getElementById('neBeam').style.fill = 'pink';
    } else {
        document.getElementById('center').style.fill = 'brown';
        document.getElementById('nBeam').style.fill = 'brown';
        document.getElementById('nwBeam').style.fill = 'brown';
        document.getElementById('wBeam').style.fill = 'brown';
        document.getElementById('swBeam').style.fill = 'brown';
        document.getElementById('sBeam').style.fill = 'brown';
        document.getElementById('seBeam').style.fill = 'brown';
        document.getElementById('eBeam').style.fill = 'brown';
        document.getElementById('neBeam').style.fill = 'brown';
    }
}

function updateWind() {

    // Update temperature reading from session storage
    const cityData = getStoredWeatherData();

    // Update wind speed reading from session storage
    document.getElementById('windReading').innerText = `${cityData.windSpeed}`;

    // Wind speed color change (example threshold: 20km)
    if (parseInt(cityData.windSpeed) > 20) {
        document.getElementById('upGust').style.stroke = 'red';
        document.getElementById('downGust').style.stroke = 'red';
    } else {
        document.getElementById('upGust').style.stroke = 'green';
        document.getElementById('downGust').style.stroke = 'green';
    }
}

function setBackgroundImage() {
    const cityData = getStoredWeatherData();
    const cityName = cityData['cityName'];
    if (cityName) {
        const bodyElement = document.body;
        bodyElement.style.backgroundImage = `url('../images/${cityName}.jpg')`;
        bodyElement.style.backgroundSize = 'cover';
        bodyElement.style.backgroundPosition = 'center';
        bodyElement.style.backgroundBlendMode = 'overlay'; // Blend the background image with the color
    }
}