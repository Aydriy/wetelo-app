/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
    width: "100%",
    margin: "auto",
    boxShadow: "0px 2px 24px rgba(0, 0, 0, 0.04)",

    padding: 0,
    marginTop: "-35px",
    marginBottom: "20px",
  },
}));

export default function SearchBar({
  allDatas,
  setCurrentData,
  departure,
  arrival,
  setCurrentDataName,
  currentValue,
  setCurrentValue,
  departureLength,
}) {
  const classes = useStyles();
  const allDataConcat = arrival.concat(departure);

  // Autocomplete part with all props
  const AutocompleteElem = (props) => {
    return (
      <Autocomplete
        className={props.classname}
        id={props.id}
        disabled={props.disabled}
        freeSolo
        value={currentValue}
        onChange={(event, newValue) => {
          console.log(newValue);
          if (newValue !== "") {
            setCurrentValue(newValue);
          } else {
            return;
          }
        }}
        getOptionLabel={(option) => {
          if (option["airportFromID.name"] == undefined) {
            return `${option.fltNo}, ${option["airportToID.name"]}`;
          } else if (option["airportToID.name"] == undefined) {
            return `${option.fltNo}, ${option["airportFromID.name"]}`;
          }
        }}
        options={departure}
        renderInput={(params) => (
          <div
            className="search-input__input-container"
            ref={params.InputProps.ref}
          >
            <div className="search-icon">
              <SearchIcon />
            </div>
            {allDatas ? (
              <input
                type="text"
                placeholder="Номер рейсу або місто"
                {...params.inputProps}
              />
            ) : (
              <input type="text" placeholder="Номер рейсу або місто" />
            )}
          </div>
        )}
      />
    );
  };

  // Button search which get current data
  const ButtonSearch = (props) => {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={props.disabled}
        className="search-input__btn"
        onClick={() => {
          if (currentValue != null) {
            setCurrentData(currentValue);
            setCurrentDataName(() => {
              if (currentValue["airportToID.name"] == undefined) {
                return currentValue["airportFromID.name"];
              } else {
                return currentValue["airportToID.name"];
              }
            });
          } else {
            return;
          }
        }}
      >
        Пошук
      </Button>
    );
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      p={1}
      justifyContent="space-between"
    >
      {departureLength != 0 ? (
        <>
          <AutocompleteElem
            disabled={false}
            id={"free-solo-demo"}
            classname={"search-input"}
          />
          <ButtonSearch disabled={false} />
        </>
      ) : (
        <>
          <AutocompleteElem
            disabled={true}
            id={"disabled"}
            classname={"search-input"}
          />
          <ButtonSearch disabled={true} />
        </>
      )}
    </Box>
  );
}
