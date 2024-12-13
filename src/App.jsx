import React, { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import SummaryCard from './SummaryCard';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function App() {
  const locationList = [
    { value: "Canada", label: "Canada" },
    { value: "USA", label: "United States" },
    { value: "Germany", label: "Germany" },
    { value: "UK", label: "United Kingdom" },
    { value: "India", label: "India" },
    { value: "Brazil", label: "Brazil" },
  ];

  const [activeLocation, setActiveLocation] = useState("Canada");
  const [lastUpdated, setLastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});
  const [timeseriesData, setTimeseriesData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "https://disease.sh/v3/covid-19";

  const timeseriesOptions = {
    responsive: true,
    normalized: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
      },
    },
  };

  useEffect(() => {
    getSummaryData();
    getTimeseriesData();
  }, [activeLocation]);

  const getSummaryData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/countries/${activeLocation}`);
      const data = await res.json();
      setSummaryData({
        totalCases: data.cases.toLocaleString(),
        totalRecovered: data.recovered.toLocaleString(),
        totalDeaths: data.deaths.toLocaleString(),
        totalVaccinated: data.tests.toLocaleString(),
      });
      setLastUpdated(new Date(data.updated).toLocaleString());
    } catch (error) {
      setError("Failed to fetch summary data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeseriesData = async () => {
    try {
      const res = await fetch(`${baseUrl}/historical/${activeLocation}?lastdays=all`);
      const data = await res.json();

      const timeseries = data.timeline;

      setTimeseriesData({
        datasets: [
          {
            label: "Cases",
            borderColor: "blue",
            data: Object.keys(timeseries.cases).map((date) => ({
              x: date,
              y: timeseries.cases[date],
            })),
          },
          {
            label: "Deaths",
            borderColor: "red",
            data: Object.keys(timeseries.deaths).map((date) => ({
              x: date,
              y: timeseries.deaths[date],
            })),
          },
          {
            label: "Recovered",
            borderColor: "green",
            data: Object.keys(timeseries.recovered).map((date) => ({
              x: date,
              y: timeseries.recovered[date],
            })),
          },
        ],
      });
    } catch (error) {
      setError("Failed to fetch timeseries data.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>COVID-19 Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="dashboard-container">
        <div className="dashboard-menu">
          <Select
            options={locationList}
            onChange={(selectedOption) => setActiveLocation(selectedOption.value)}
            defaultValue={locationList.find((option) => option.value === activeLocation)}
            className="dashboard-select"
          />
          <p className="update-name">Last Updated: {lastUpdated}</p>
        </div>
        <div className="dashboard-timeseries">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Line data={timeseriesData} options={timeseriesOptions} className="line-chart" />
          )}
        </div>
        <div className="dashboard-summary">
          <SummaryCard title="Total Cases" value={summaryData.totalCases} />
          <SummaryCard title="Total Recovered" value={summaryData.totalRecovered} />
          <SummaryCard title="Total Deaths" value={summaryData.totalDeaths} />
          <SummaryCard title="Total Vaccinated" value={summaryData.totalVaccinated} />
        </div>
      </div>
    </div>
  );
}

export default App;
