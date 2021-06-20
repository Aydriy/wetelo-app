import React from "react";
//MaterialUI
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
//Redux
import { connect, useDispatch } from "react-redux";
import { searchBars } from "./../../redux/actions/searchBar";
import { setResetDatas } from "../../redux/actions/searchBar";

function SearchBar({
  getAllDatas,
  getDeparture,
  setCurrentDataName,
  currentValue,
  setCurrentValue,
  departureLength,
}) {
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch();

  console.log(`value`, value);
  // Autocomplete part with all props
  const AutocompleteElem = (props) => {
    return (
      <Autocomplete
        className={props.classname}
        id={props.id}
        disabled={props.disabled}
        value={currentValue}
        onChange={(event, newValue) => {
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
        options={getDeparture}
        renderInput={(params) => (
          <div
            className="search-input__input-container"
            ref={params.InputProps.ref}
          >
            <div className="search-icon">
              <SearchIcon />
            </div>
            {getAllDatas ? (
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
          if (currentValue !== null) {
            dispatch(searchBars(currentValue));
            setCurrentDataName(() => {
              if (currentValue["airportToID.name"] == undefined) {
                return currentValue["airportFromID.name"];
              } else {
                return currentValue["airportToID.name"];
              }
            });
          } else {
            return dispatch(setResetDatas());
          }
        }}
      >
        Пошук
      </Button>
    );
  };

  return (
    <Box
      className="search-box"
      display="flex"
      p={1}
      justifyContent="space-between"
    >
      {departureLength !== 0 ? (
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

const mapStateToProps = (state) => {
  return {
    getAllDatas: state.app.getAllDatas,
    getDeparture: state.app.getDeparture,
  };
};

export default connect(mapStateToProps)(SearchBar);
