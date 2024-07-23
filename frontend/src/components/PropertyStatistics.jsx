import React, { useState, useEffect } from "react";

//components
import VisitBox from "./VisitBox";
//api
import { useSelector } from "react-redux";
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
  const [averageTime, setAverageTime] = useState("");
  const { tourInfo } = useSelector((state) => state.tour);
  console.log("tourInfo", tourInfo);
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

  useEffect(() => {
    const getPreviousDates = (days) => {
      const today = new Date();
      const datesArray = Array.from({ length: days }, (_, index) => {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - index);
        return previousDate;
      });
      return datesArray.reverse();
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
  useEffect(() => {
    if (tourInfo?.videoCalls?.length > 0) {
      /*   const totalDuration = tourInfo.videoCalls.reduce(
        (acc, call) => acc + call.timeDuration,
        0
      ); */
      let totalDuration = tourInfo.videoCalls.reduce(
        (acc, call) => acc + parseInt(call.timeDuration),
        0
      );
      console.log("totalDuration", totalDuration);
      let averageDuration = totalDuration / tourInfo.videoCalls.length;
      console.log("averageDuration", averageDuration);

      const minutes = Math.floor(averageDuration / 60);
      const seconds = averageDuration % 60;
      setAverageTime(`${minutes}m ${seconds}s`);
    }
  }, [tourInfo]);

  const calculateVisitCounts = (dates, visited) => {
    const visitCounts = dates.map((date) => ({
      date,
      visits: 0,
    }));

    visited?.forEach(({ date }) => {
      const visitDate = new Date(date);
      const visitCount = visitCounts.find(
        (vc) => vc.date.toDateString() === visitDate.toDateString()
      );
      if (visitCount) {
        visitCount.visits += 1;
      }
    });

    return visitCounts.map((vc) => vc.visits);
  };

  /* 
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
  }; */
  const visitCounts = calculateVisitCounts(dates, tourInfo?.visited);
  const data = {
    labels: dates.map((date) => formatDate(date)),
    datasets: [
      {
        label: "Dataset 1",
        data: visitCounts,
        borderColor: "#ffc600",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div id="propertystats">
      <div className="propertystatsDiv1">
        <div className="propertystatsDiv1d1">
          <span className="span1">
            <i className="fa-regular fa-eye"></i>
          </span>
          <span className="span2">
            <p className="p1">Total visits</p>
            <p className="p2">
              {tourInfo?.visited && tourInfo?.visited.length}
            </p>
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1 userSpan">
            <i className="fa-solid fa-users"></i>
          </span>
          <span className="span2">
            <p className="p1">Users</p>
            <p className="p2">
              {tourInfo?.visited && tourInfo?.visited.length}
            </p>
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1 clockSpan">
            <i className="fa-regular fa-clock"></i>
          </span>
          <span className="span2">
            <p className="p1">Average time</p>
            {tourInfo?.videoCalls && tourInfo?.videoCalls.length > 0 ? (
              <p className="p2">{averageTime}</p>
            ) : (
              "0m 0s"
            )}
          </span>
        </div>
        <div className="propertystatsDiv1d1">
          <span className="span1">
            <i className="fa-solid fa-video"></i>
          </span>
          <span className="span2">
            <p className="p1">Videocalls</p>
            <p className="p2">
              {tourInfo?.videoCalls && tourInfo?.videoCalls.length}
            </p>
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
          {tourInfo?.visited && tourInfo?.visited.length > 0
            ? tourInfo?.visited.map((visits, index) => (
                <VisitBox
                  visit="last"
                  call={tourInfo?.videoCalls[index]}
                  key={index}
                  visits={visits}
                  tourInfo={tourInfo}
                />
              ))
            : "No Visits"}

          {/*       <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" />
          <VisitBox visit="last" /> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyStatistics;
