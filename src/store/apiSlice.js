import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => {
        const url = `?q=${city}&appid=${API_KEY}`;
        return url;
      },
      keepUnusedDataFor: 120000,
      transformResponse: (response) => ({
        cityName: response.name,
        ...response,
      }),
    }),
    toggleTemperature: builder.query({
        query: ({lat,long, units}) => {
          if (!lat || !long) {
            return { data: null, isLoading: false, isError: false };
          }
          const url = `?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}`;
          return url;
        },
      }),
      keepUnusedDataFor: 120000,
      transformResponse: (response) => ({
        cityName: response.name,
        ...response,
      }),
  }),
});

export const { useGetWeatherByCityQuery , useToggleTemperatureQuery} = weatherApi;
