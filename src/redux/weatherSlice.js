import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData } from '../utils/api';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (cities) => {
  const weatherData = await Promise.all(cities.map((city) => fetchWeatherData(city)));
  return weatherData;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;