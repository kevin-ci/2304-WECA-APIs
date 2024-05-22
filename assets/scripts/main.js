const apiKey = "7816d9f235c88adc096427a68ca872f2";
const units = "metric";

const inputElement = document.getElementById("city-input");
const buttonElement = document.getElementById("submit-button");
const outputElement = document.getElementById("output-area");
const imageElement = document.getElementById("status-image");
const statusElement = document.getElementById("status-text");
const forecastElement = document.getElementById("forecast-row");

buttonElement.addEventListener('click', function () {
    const userInput = inputElement.value;
    const sanitizedUserInput = userInput.toLowerCase();
    
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${sanitizedUserInput}&appid=${apiKey}&units=${units}`;

    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        forecastElement.innerHTML = "";
        const cityName = data.city.name;
        const currentTemp = data.list[0].main.temp;
        const currentStatus = data.list[0].weather[0].main;
        const weatherCode = data.list[0].weather[0].icon;
        const imgUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

        outputElement.innerText = `The temperature in ${cityName} is ${currentTemp}°C.`;
        statusElement.innerText = `${currentStatus}`;
        imageElement.src = imgUrl;


        for (let i = 7; i <= data.cnt; i+=8) {
            const currentTemp1 = data.list[i].main.temp;
            const currentStatus1 = data.list[i].weather[0].main;
            const weatherCode1 = data.list[i].weather[0].icon;
            const imgUrl1 = `https://openweathermap.org/img/wn/${weatherCode1}@2x.png`;
            const timeStamp = data.list[i].dt;
            const day = new Date(timeStamp * 1000).toLocaleDateString('en-GB', { weekday: 'long' }); 

            const htmlText = `
                <div class="col">
                    <h4>${day}</h4>
                    <h5>${currentTemp1}°C</h5>
                    <img src="${imgUrl1}" alt="">
                    <h5>${currentStatus1}</h5>
                </div>
            `;
            forecastElement.innerHTML += htmlText;
        }

    });


});