"use client";
import { setWeather, setError } from "@/redux/slice/weatherSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Switch,
  Card,
} from "@mui/material";
import axios from "axios";

const YOUR_API_KEY = "6b76fb6e114358c26c047aa8087f67f0";
const Home = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  console.log(`weather`, weather);
  const error = useSelector((state) => state?.weather?.error);

  const fetchWeather = async () => {
    dispatch(setError(null));
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_API_KEY}&units=${unit}`
      );
      console.log(`response`, response);
      dispatch(setWeather(response.data));
    } catch (err) {
      console.log(`err`, err);
      dispatch(setError("City not found or unable to fetch weather data"));
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };
  console.log("weather", weather);
  return (
    <Container>
      <Box sx={{ my: 4, boxShadow: 2, p: 5 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            city && fetchWeather();
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter city name"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              size="small"
              sx={{ mr: 4 }}
            />
            <Button variant="contained" type="submit" color="primary">
              Fetch
            </Button>
          </Box>
        </form>
        {error ? (
          <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : (
          <Box>
            {/* we can divide into components  */}
            {weather && (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {`${weather?.name}, ${weather?.sys?.country}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {new Date().toDateString()}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    my: 5,
                    backgroundColor: "#585d61",
                    pointerEvents: "none",
                    borderRadius: "40px",
                  }}
                >
                  {weather?.weather[0]?.description}
                </Button>

                <Typography variant="h1">
                  {unit === "metric"
                    ? weather?.main?.temp
                    : ((weather?.main?.temp * 9) / 5 + 32).toFixed(2)}
                  {unit === "metric" ? "°C" : "°F"}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ p: 2 }} variant="subtitle1">
                    Min:{weather?.main?.temp_min}
                  </Typography>
                  <Typography sx={{ p: 2 }} variant="subtitle1">
                    Max:{weather?.main?.temp_max}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              sx={{ my: 5, display: "flex", justifyContent: "space-around" }}
            >
              <Card
                sx={{
                  marginRight: "1rem",
                  width: "15rem",
                  height: "2rem",
                  p: 4,
                }}
              >
                <Typography variant="subtitle1">
                  Real Feel <br /> {weather?.main?.feels_like}
                </Typography>
              </Card>
              <Card sx={{ width: "15rem", height: "2rem", p: 4 }}>
                <Typography variant="subtitle1">
                  Huminity <br /> {weather?.main?.humidity}%
                </Typography>
              </Card>
            </Box>
            {/* we can divide into components  */}
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Card
                sx={{
                  marginRight: "1rem",
                  width: "15rem",
                  height: "2rem",
                  p: 4,
                }}
              >
                Wind <br /> {weather?.wind?.speed} m/s
              </Card>
              <Card sx={{ width: "15rem", height: "2rem", p: 4 }}>
                Pressure <br /> {weather?.main?.pressure} hPa
              </Card>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>
                Convert to {unit === "metric" ? "Fahrenheit" : "Celsius"}
              </Typography>
              <Switch checked={unit === "imperial"} onChange={toggleUnit} />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
