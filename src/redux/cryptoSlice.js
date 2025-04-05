import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoData, fetchCryptoHistory } from '../utils/api';
import { addNotification } from './notificationsSlice';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async (ids, { dispatch }) => {
  const data = await fetchCryptoData(ids);
  data.forEach((crypto) => {
    if (Math.abs(crypto.price_change_percentage_24h) > 5) {
      dispatch(
        addNotification({
          id: `${crypto.id}-${Date.now()}`,
          type: 'price_alert',
          message: `${crypto.name} price changed by ${crypto.price_change_percentage_24h}%!`,
        })
      );
    }
  });
  return data;
});

export const fetchCryptoHistoryThunk = createAsyncThunk('crypto/fetchCryptoHistory', async (id) => {
  return await fetchCryptoHistory(id);
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], history: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCryptoHistoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchCryptoHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;