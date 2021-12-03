import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Countries from "./components/Countries.jsx";
import CountryPage from "./components/CountryPage";
import "./components/styles/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountriesData(response.data);
      } catch (error) {
        console.log("Error retrieving countries list", error);
      }
    };
    getCountries();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Countries countriesData={countriesData} {...props} />
            )}
          />
          <Route
            exact
            path="/country/:countryId"
            render={(props) => (
              <CountryPage countries={countriesData} {...props} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
