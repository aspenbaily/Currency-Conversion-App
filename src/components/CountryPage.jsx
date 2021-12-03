import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Currencies from "./Currencies";

const CountryPage = ({ countries }) => {
  const [countryDetails, setCountryDetails] = useState("");
  console.log("country page : ", countries);

  const { countryId } = useParams();

  const country = countries.find((country) => country.alpha3Code == countryId);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/alpha/${countryId}`
        );
        setCountryDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryData();
  }, [countryId]);

  return (
    <>
      <div className="country-page">
        <ul className="country-page-data">
          <li>
            <h2 className="country-page-data__details">
              {countryDetails.name}
            </h2>
          </li>
          <li className="country-page-data__details ">
            <img
              className="country-page-data__details flag"
              src={countryDetails.flag}
              alt=""
            />
          </li>
          <li className="country-page-data__details">
            Population: {countryDetails.population}
          </li>
          <li className="country-page-data__details">
            Capital: {countryDetails.capital}
          </li>
          <li className="country-page-data__details">
            Region: {countryDetails.region}
          </li>
          <li className="country-page-data__details">
            Sub-region: {countryDetails.subregion}
          </li>
          <li className="country-page-data__details">
            Native name: {countryDetails.nativeName}
          </li>
          <div>
            <Currencies currency={country?.currencies[0]} />
          </div>
        </ul>
      </div>
    </>
  );
};

export default CountryPage;
