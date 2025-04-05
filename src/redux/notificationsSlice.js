import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    clearNotification: (state, action) => {
      return state.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;