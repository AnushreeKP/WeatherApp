// script.js
document.getElementById('weatherForm').addEventListener('submit', fetchWeather);

async function fetchWeather(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = '3728a188031214adad6ee2b0d4e16f6d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            document.getElementById('error').textContent = '';
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('error').textContent = 'Error: ' + error.message;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperature = `${data.main.temp}°C`;
    const description = data.weather[0].description;

    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${icon}" alt="${description}">
        <p>Temperature: ${temperature}</p>
        <p>Condition: ${description}</p>
    `;
}
