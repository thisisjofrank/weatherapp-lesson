let ably = new Ably.Realtime('i6lHRw.lCewIA:tavzLo-ZM53EW6ua');
let image = document.getElementById('icon');
let infoEls = document.querySelectorAll('[data-name]');

function setIcon(weather) {
    image.src = "http://openweathermap.org/img/wn/" + weather.icon + "@4x.png"
    image.alt = weather.description;
}

function calculateTemperature(temp) {
    return temp - 273;
}

function setInfo(viewModel) {
    
    for (let element of infoEls) {

        const requiredData = element.attributes["data-name"].value;
        const isATemperature = element.attributes["data-temp"] != null;
        let dataValue = viewModel[requiredData];

        if (isATemperature) {
            let dataValueAsNumber = parseInt(dataValue);
            dataValue = calculateTemperature(dataValueAsNumber);
        }

        element.innerHTML = dataValue;
    }
}

async function asyncMain() {
    let chanName = '[product:ably-openweathermap/weather?rewind=1]weather:2643741';
    let channel = ably.channels.get(chanName);

    channel.subscribe(function(message) {

        // In our message handler, we grab the data we're interested in from Ably
        const viewModel = {
            city: message.data.name,
            country: message.data.sys.country,
            temp: message.data.main.temp,
            description: message.data.weather[0].description,
            feels_like: message.data.main.feels_like,
            temp_max: message.data.main.temp_max,
            temp_min: message.data.main.temp_min,
            humidity: message.data.main.humidity,
            wind_speed: message.data.wind.speed
        }; 

        setIcon(message.data.weather[0]);
        setInfo(viewModel);
    });
}

asyncMain();