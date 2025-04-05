import axios from 'axios';

const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const COINGECKO_API = process.env.NEXT_PUBLIC_COINGECKO_API;
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const NEWSDATA_API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;

export const fetchWeatherData = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
  );
  return response.data;
};

export const fetchCryptoData = async (ids) => {
  const url = `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids.join(',')}${
    COINGECKO_API_KEY ? `&x_cg_demo_api_key=${COINGECKO_API_KEY}` : ''
  }`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchCryptoHistory = async (id) => {
  const url = `${COINGECKO_API}/coins/${id}/market_chart?vs_currency=usd&days=7${
    COINGECKO_API_KEY ? `&x_cg_demo_api_key=${COINGECKO_API_KEY}` : ''
  }`;
  const response = await axios.get(url);
  return response.data.prices; // Returns [timestamp, price] pairs
};

export const fetchNewsData = async () => {
  const response = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=cryptocurrency`
  );
  return response.data.results;
};