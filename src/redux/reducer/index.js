import { combineReducers } from "@reduxjs/toolkit";
import weatherSlice from "../slice/weatherSlice";

const rootReducer = combineReducers({
  weather: weatherSlice,
});

export default rootReducer;
