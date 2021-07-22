document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        showWarning('Buscando...')

        let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${keyApi}&units=metric&lang=pt_br`

        let result = await fetch(urlApi);
        let json = await result.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDesc: json.weather[0].description,
                windSpeed: json.wind.deg,
            });
        } else {
            showWarning(`Não foi possível localizar ${json.name}.`)
        }
        
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed/100}<span>km/h<span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windSpeed}deg)`;

    document.querySelector('.ventoNome').innerHTML = `${json.tempDesc}`;

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

const keyApi = '270b06e49b8d8c8e09903932b4175c26'