import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
        const { rates, date } = response.data;
        const importantCurrencies = {
          USD: rates['USD'],
          GBP: rates['GBP'],
          JPY: rates['JPY'],
          CNY: rates['CNY'],
          CAD: rates['CAD'],
        };
        const exchangeRatesArray = Object.entries(importantCurrencies).map(([currency, rate]) => ({
          currency,
          rate,
        }));
        setExchangeRates(exchangeRatesArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setIsLoading(false);
      }
    };

    fetchExchangeRates();

    const intervalId = setInterval(fetchExchangeRates, 86400000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Currency Exchange Rates</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover shadow"> 
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map(({ currency, rate }) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrencyExchangeRates;
