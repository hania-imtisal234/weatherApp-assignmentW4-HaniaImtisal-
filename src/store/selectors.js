import { createSelector } from '@reduxjs/toolkit';

export const selectRecentSearches = createSelector(
  (state) => state.weatherApi.queries,
  (queries) => {
    const cities = Object.values(queries)
      .map((query) => query?.data?.cityName) 
      .filter(Boolean); 

    return [...new Set(cities)].slice(-5);
  }
);
