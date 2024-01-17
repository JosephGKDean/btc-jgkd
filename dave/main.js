document.getElementById("searchTaunton").addEventListener('click', GetWeather)

async function GetWeather() {
    const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Taunton&appid=52475448b07cee255e82d46a986b3deb").then(result => result.json())

    if(result){
        const weatherResult = document.getElementById('weatherResult')
        weatherResult.innerHTML="<h3>"+result['weather'][0]['description']+"</h3>"
        console.log(result)
        console.log(result['weather'][0]['description'])
    }
}