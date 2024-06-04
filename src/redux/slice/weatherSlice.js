import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action) => {
      return { ...state, weather: action.payload };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setWeather, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
