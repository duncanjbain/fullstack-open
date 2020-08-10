import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({countryName, lat,long}) => {
  const DARK_SKY_KEY=process.env.REACT_APP_API_KEY;
  const DARK_SKY_EXCLUDES='exclude=minutely,alerts,hourly,flags';
  const API_URL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${long}?${DARK_SKY_EXCLUDES}`

  console.log('API URL', API_URL)
  const [countryWeather, updateCountryWeather] = useState(null);

  useEffect(() => {
     axios.get(API_URL).then((response) =>
    updateCountryWeather(response.data))
  },[API_URL]);

  if(countryWeather) {
    return (
      <section>
      <p>Temperature: {countryWeather.currently.temperature}</p>
      <p>Summary: {countryWeather.currently.summary}</p>
      </section>
    )
  } else {
    return (
      <p>Fetching weather</p>
    )
  }
}

export default Weather