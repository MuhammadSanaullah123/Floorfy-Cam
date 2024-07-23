import React, { useState, useEffect } from "react";

//components
import VisitBox from "../components/VisitBox";
//api
import { useDispatch, useSelector } from "react-redux";
import { setAllTour } from "../slices/tourSlice";
import { useGetAllTourMutation } from "../slices/tourApiSlice";
//others
import { toast } from "react-toastify";
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
  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);
  const [showFullDate, setShowFullDate] = useState(true);
  const [getAllTours] = useGetAllTourMutation();

  const { tourInfo } = useSelector((state) => state.tour);

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
  const handleGetTours = async () => {
    try {
      const res = await getAllTours().unwrap();

      dispatch(setAllTour({ ...res }));
    } catch (error) {
      console.error(error);
      toast.error(error.msg);
    }
  };
  useEffect(() => {
    handleGetTours();
  }, []);
  useEffect(() => {
    toggleDateDisplay();
    window.addEventListener("resize", toggleDateDisplay);

    return () => {
      window.removeEventListener("resize", toggleDateDisplay);
    };
  }, []);
  const calculateVisitCounts = (dates, tourInfo) => {
    const visitCounts = dates?.map((date) => ({
      date,
      visits: 0,
    }));

    tourInfo?.forEach((tour) => {
      tour.visited?.forEach(({ date }) => {
        const visitDate = new Date(date);
        const visitCount = visitCounts.find(
          (vc) => vc.date.toDateString() === visitDate.toDateString()
        );
        if (visitCount) {
          visitCount.visits += 1;
        }
      });
    });

    return visitCounts.map((vc) => vc.visits);
  };
  const calculateLatestVisitDates = (tourInfo) => {
    return tourInfo?.map((tour) => {
      const latestVisitDate = tour.visited.reduce((latestDate, visit) => {
        const visitDate = new Date(visit.date);
        return visitDate > latestDate ? visitDate : latestDate;
      }, new Date(0));
      return { ...tour, latestVisitDate };
    });
  };
  /*   let visitCounts;
  let sortedTourInfo; */
  const [visitCounts, setVisitCounts] = useState([]);
  const [sortedTourInfo, setSortedTourInfo] = useState([]);
  useEffect(() => {
    console.log("inside useeffect tourInfo", tourInfo);

    let visitCountsTemp = calculateVisitCounts(dates, tourInfo);
    setVisitCounts(visitCountsTemp);
    let sortedTourInfoTemp = calculateLatestVisitDates(tourInfo).sort(
      (a, b) => b.latestVisitDate - a.latestVisitDate
    );
    setSortedTourInfo(sortedTourInfoTemp);
  }, [tourInfo]);

  console.log("tourInfo", tourInfo);
  const data = {
    labels: dates.map((date) => formatDate(date)),
    datasets: [
      {
        label: "Visits",
        data: visitCounts,
        borderColor: "#ffc600",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log("sortedTourInfo ", sortedTourInfo);
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
          {sortedTourInfo?.map((tour) => (
            <VisitBox key={tour._id} visit="last" page="total" tour={tour} />
          ))}
          {/*   <VisitBox visit="last" />
          <VisitBox visit="last" />

          <VisitBox visit="last" />

          <VisitBox visit="last" /> */}
        </div>
        <div className="mostvisitedDiv">
          <p className="p1">Most Visited Properties</p>
          {tourInfo
            ?.slice()
            .sort((a, b) => b.visited.length - a.visited.length)
            .map((tour, index) => (
              <VisitBox
                key={tour._id}
                visit="most"
                tour={tour}
                page="total"
                number={index + 1}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
