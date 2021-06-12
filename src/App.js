import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { React, useState, useEffect, forwardRef } from "react";
import { Hero, SearchBar, Main } from "./components";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [allDatas, getAllDatas] = useState(null);
  const [arrival, setArrival] = useState([]);
  const [departure, setDeparture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  // Main hooks
  const [сurrentDataName, setCurrentDataName] = useState(null);

  // Search hooks
  const [currentValue, setCurrentValue] = useState(null);
  const [сurrentData, setCurrentData] = useState(null);

  const date = startDate.toLocaleDateString();

  useEffect(() => {
    async function fetchDataList() {
      try {
        const response = await axios(
          `https://api.iev.aero/api/flights/${date}`
        );
        getAllDatas(response.data.body);
        setArrival(response.data.body.arrival);
        setDeparture(response.data.body.departure);
        setLoading(false);
      } catch (error) {
        setLoading(null);
        console.log(`error`, error);
      }
    }

    fetchDataList();
  }, [date]);

  // console.log(`allDatas`, allDatas);
  // console.log(`arrival`, arrival);
  // console.log(`departure`, departure);
  // console.log(`сurrentData`, сurrentData);
  // console.log(`сurrentDataName`, сurrentDataName);
  // console.log(`startDate`, date);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: "60px",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  // Clear all after selecr date
  const clearSelected = (date) => {
    setStartDate(date);
    setCurrentValue(null);
    setCurrentData(null);
    setLoading(true);
  };

  // Check if departure object is empty
  let departureLength = Object.keys(departure).length;

  console.log("departurelLength", departureLength);

  // Button element to react-datapicker
  const CustomInputData = forwardRef(({ value, onClick }, ref) => (
    <Button
      className={`${
        departureLength != 0 ? "data-button" : "data-button red-border"
      }`}
      variant="contained"
      color="primary"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));
  // Data-picker element
  const DataElement = () => {
    return (
      <div className="data-container">
        <DatePicker
          selected={startDate}
          customInput={<CustomInputData />}
          onChange={(date) => clearSelected(date)}
          dateFormat="MM/dd/yyyy"
        />
        {departureLength != 0 ? "" : <span>На цю дату немає рейсів!</span>}
      </div>
    );
  };
  return (
    <div className="App">
      <Hero />

      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : loading === null ? (
        <h1>Не знайдено рейсів</h1>
      ) : (
        <section className="main">
          <SearchBar
            date={date}
            allDatas={allDatas}
            setCurrentData={setCurrentData}
            departure={departure}
            arrival={arrival}
            setCurrentDataName={setCurrentDataName}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            departureLength={departureLength}
          />
          <DataElement />

          <Main
            arrival={arrival}
            сurrentData={сurrentData}
            сurrentDataName={сurrentDataName}
          />
        </section>
      )}
    </div>
  );
}

export default App;
