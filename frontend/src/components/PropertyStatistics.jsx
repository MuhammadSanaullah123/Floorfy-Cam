import React, { useState, useEffect } from "react";

//components
import VisitBox from "./VisitBox";

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

const PropertyStatistics = () => {
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
    <div id="propertystats">
      <div className="propertystatsDiv1">
        <div className="propertystatsDiv1d1">
          <span className="span1">
            <i className="fa-regular fa-eye"></i>
          </span>
          <span className="span2">
            <p className="p1">Total visits</p>
            <p className="p2">4</p>
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1 userSpan">
            <i className="fa-solid fa-users"></i>
          </span>
          <span className="span2">
            <p className="p1">Users</p>
            <p className="p2">1</p>
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1 clockSpan">
            <i className="fa-regular fa-clock"></i>
          </span>
          <span className="span2">
            <p className="p1">Average time</p>
            <p className="p2">38m 33s</p>
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1">
            <i className="fa-solid fa-video"></i>
          </span>
          <span className="span2">
            <p className="p1">Videocalls</p>
            <p className="p2">0</p>
          </span>
        </div>
      </div>
      <div className="propertystatsDiv2">
        <div className="propertystatsDiv2d1">
          <p>Tendency</p>
          <div className="graphDiv">
            <div>
              <Line options={options} data={data} className="lineGraph" />
            </div>
          </div>
        </div>
        <div className="propertystatsDiv2d2">
          <p> LAST VISITS</p>

          <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" />
        </div>
      </div>
    </div>
  );
};

export default PropertyStatistics;
