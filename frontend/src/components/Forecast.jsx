import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { iconUrlFromCode } from "../services/weatherService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function Forecast({ title, weather }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const items = [];
  for (let i = 0; i < 5; i++) {
    const ob = {};
    ob["title"] = weather.forecast.forecastday[i].date;
    ob["temp"] = weather.forecast.forecastday[i].day.maxtemp_c;
    ob["icon"] = weather.forecast.forecastday[i].day.condition.icon;
    items.push(ob);
  }

  // Extend dates by one on each side
  const extendedLabels = ["", ...items.map(item => formatDate(item.title)), ""];

  // Prepare data for the chart
  const data = {
    labels: extendedLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [null, ...items.map(item => item.temp), null],
        borderColor: 'white',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointStyle: items.map(item => {
          const img = new Image();
          img.src = item.icon;
          return img;
        }),
        pointRadius: windowWidth < 700 ? 4 : 10,
        pointHoverRadius: windowWidth < 700 ? 17 : 17
      }
    ]
  };

  // Find the min and max temperatures to set the y-axis limits
  const minTemp = Math.min(...items.map(item => item.temp));
  const maxTemp = Math.max(...items.map(item => item.temp));

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: 'white',
        },
        ticks: {
          color: 'white',
          font: {
            size: 12, // Decrease font size
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: 'white', // Set axis line color to white
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          font: {
            size: 10, // Decrease font size
          },
        },
        grid: {
          display: false,
        },
        min: minTemp - 1, // Add margin to the bottom
        max: maxTemp + 1, // Add margin to the top
        border: {
          color: 'white', // Set axis line color to white
        },
      },
    },
  };
  

  return (
    <div>
      <div className="flex w-[100%] items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{formatDate(item.title)}</p>
            <img
              src={item.icon}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°C`}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-10">
        <Line data={data} options={options} key={windowWidth} />
      </div>
    </div>
  );
}

export default Forecast;
