import { tool } from "ai";
import axios from "axios";
import { z } from "zod";

export const geocodeCity = async (
  city: string
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const { data } = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!data || !data.results || data.results.length === 0) return null;

    const result = data.results[0];
    return { latitude: result.latitude, longitude: result.longitude };
  } catch (error) {
    return null;
  }
};

export const getWeather = tool({
  description: "Get the current weather for a given city.",
  inputSchema: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    city: z
      .string()
      .describe("The name of the city to get the weather for.")
      .optional(),
  }),
  execute: async (input) => {
    let { latitude, longitude, city } = input;

    if (city) {
      const geocoded = await geocodeCity(city);
      if (geocoded) {
        latitude = geocoded.latitude;
        longitude = geocoded.longitude;
      } else return { error: `Could not geocode city: ${city}` };
    } else if (latitude && longitude) {
      // coordinates are provided, do nothing
    } else {
      return {
        error:
          "Please provide either a city name or both latitude and longitude.",
      };
    }

    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    );

    if (!data) return { error: "Could not fetch weather data." };
    if (city) data.cityName = city;
    return data;
  },
});
