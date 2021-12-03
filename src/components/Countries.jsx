import { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

const Countries = ({ countriesData = [] }) => {
  console.log("countries : ", countriesData);
  const [filteredCountries, setFilteredCountries] = useState(countriesData);

  // Search by country name
  const handleSearch = (e) => {
    let value = e.target.value;
    let result = [];
    console.log(value);
    result = countriesData.filter((data) => {
      return data.name.toLowerCase().search(value) !== -1;
    });
    setFilteredCountries(result);
  };

  return (
    <>
      <input
        className="search"
        type="text"
        name=""
        placeholder="Search by country"
        onChange={handleSearch}
      />
      <ul className="countries">
        {filteredCountries.map((countriesData) => {
          return (
            <Link
              to={{
                pathname: `/country/${countriesData.alpha3Code}`,
                state: { test: "test state" },
              }}
            >
              <li key={countriesData.alpha3Code} className="countries-list">
                <h2>{countriesData.name}</h2>
                <img
                  className="countries-list__data flag-list"
                  src={countriesData.flags.png}
                  alt=""
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Countries;
