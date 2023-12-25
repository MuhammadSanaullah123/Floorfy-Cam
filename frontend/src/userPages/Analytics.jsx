import React, { useState, useEffect } from "react";

//components
import VisitBox from "../components/VisitBox";

//react-chartjs-2
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [dates, setDates] = useState([]);
  const [showFullDate, setShowFullDate] = useState(true);

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const toggleDateDisplay = () => {
    const screenWidth = window.innerWidth;
    setShowFullDate(screenWidth > 500);
  };

  const formatDate = (date) => {
    if (showFullDate) {
      return date.toLocaleDateString("en-GB");
    } else {
      return date.getDate().toString();
    }
  };

  const data = {
    labels: dates.map((date) => formatDate(date)),
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 3, 4, 5, 1, 3, 7],
        borderColor: "#ffc600",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    const getPreviousDates = (days) => {
      const today = new Date();
      const datesArray = Array.from({ length: days }, (_, index) => {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - index);
        return previousDate;
      });
      return datesArray;
    };

    setDates(getPreviousDates(7));
  }, []);

  useEffect(() => {
    toggleDateDisplay();
    window.addEventListener("resize", toggleDateDisplay);

    return () => {
      window.removeEventListener("resize", toggleDateDisplay);
    };
  }, []);
  return (
    <div id="analytics">
      <p className="p1">Tendency</p>
      <div className="graphDiv">
        <div>
          <Line options={options} data={data} className="lineGraph" />
        </div>
      </div>
      <div className="visitParentDiv">
        <div className="lastvisitDiv">
          <p className="p1">Last Visits</p>
          <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" />

          <VisitBox visit="last" />

          <VisitBox visit="last" />
        </div>
        <div className="mostvisitedDiv">
          <p className="p1">Most Visited Properties</p>
          <VisitBox visit="most" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
