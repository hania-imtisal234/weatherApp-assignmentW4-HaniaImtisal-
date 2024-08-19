import React from "react";
import { useSelector } from "react-redux";
import { selectRecentSearches } from "../../store/selectors";

const RecentSearches = () => {
  const recentSearches = useSelector(selectRecentSearches);

  return (
    <div className="recent-searches mb-4">
      <h2 className="text-xl font-semibold text-blue-700">Recent Searches:</h2>
      <ul>
        {recentSearches.map((city, index) => (
          <li key={index} className="text-sm">
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
