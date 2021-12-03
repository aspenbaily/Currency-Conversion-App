import { React, useState, useEffect } from "react";
import axios from "axios";
// import CurrencyItem from "./CurrencyItem";

function Currencies({ currency }) {
  const [exchangeRates, setExchangeRates] = useState();
  const [conversionRates, setConversionRates] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [selectedValue, setSelectedValue] = useState(1);

  useEffect(() => {
    console.log({ currency });
    if (!currency) return;

    const getExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGERATE_KEY}/latest/${currency.code}`
        );
        setExchangeRates(response.data);
        const tempArray = [];
        Object.keys(response.data.conversion_rates).forEach((key) =>
          tempArray.push({ [key]: response.data.conversion_rates[key] })
        );

        console.log(tempArray);
        setConversionRates(tempArray);
      } catch (error) {
        console.log(error);
      }
    };
    getExchangeRates();
  }, [currency]);
  console.log(exchangeRates);

  return (
    <>
      <div className="currency-items">
        <input
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="text-input currency-items__input "
          type="number"
        />
        <p className="currency-items__title">{exchangeRates?.base_code}</p>
        <p className="currency-items__title">to</p>
        <div className="currency-items">
          <select
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            className="currency-item__input"
          >
            {conversionRates?.map((item) => {
              return (
                <option value={Object.values(item)[0]}>
                  {Object.keys(item)[0]}
                </option>
              );
            })}
          </select>
          <button>Convert</button>
        </div>
      </div>
      <div className="currency-items__output">
        <p result className="currency-items__output--value">
          Result: {inputValue * selectedValue}
        </p>
      </div>
    </>
  );
}

export default Currencies;
