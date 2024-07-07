export async function fetchCities(input) {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${input}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'd147d5ac39msha7378090fa5bd17p1b42eajsn153c0a0b1bec',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      return;
    }
}
  
export async function fetchWeatherData(input) {
    const url = `http://api.weatherapi.com/v1/current.json?key=d62f6c66193f44ebba2112833240607&q=${input}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      return;
    }
}
export async function fetchForecast(input) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=d62f6c66193f44ebba2112833240607&q=${input}&days=5`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      return;
    }
}
    
