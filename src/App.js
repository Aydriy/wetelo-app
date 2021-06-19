import { React, useState, useEffect, forwardRef } from "react";
import { Hero, SearchBar, Main } from "./components";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
//Date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Redux
import { connect, useDispatch } from "react-redux";
import { fetchDatas } from "./redux/actions/app";

function App({ getDeparture, isLoading }) {
  // Date change hooks
  const [startDate, setStartDate] = useState(new Date());
  const date = startDate.toISOString().split("T")[0];

  // Main hooks
  const [сurrentDataName, setCurrentDataName] = useState(null);

  // Search hooks
  const [currentValue, setCurrentValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDatas(date));
  }, [date]);

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
  };

  // Check if departure object is empty
  let departureLength = Object.keys(getDeparture).length;

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
        {departureLength != 0 ? (
          ""
        ) : (
          <span>
            На цю дату немає рейсів! <br />
            Виберіть іншу дату!
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="App">
        <Hero />

        {isLoading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : isLoading === null ? (
          <h1>Не знайдено рейсів</h1>
        ) : (
          <section className="main">
            <SearchBar
              setCurrentDataName={setCurrentDataName}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
              departureLength={departureLength}
            />
            <DataElement />

            <Main сurrentDataName={сurrentDataName} />
          </section>
        )}
      </div>
      <footer>
        <span>Copyright © 2021</span>
      </footer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    getDeparture: state.app.getDeparture,
    isLoading: state.app.setLoaded,
  };
};

export default connect(mapStateToProps)(App);
