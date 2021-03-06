import React from "react";
//MaterialUI
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TablePagination from "@material-ui/core/TablePagination";
//Date
import Moment from "react-moment";
//Redux
import { connect } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 766,
    width: "100%",
    margin: "auto",
  },
  table: {
    minWidth: 650,
  },
}));

function Main({ getArrivel, сurrentDataName, getCurrentData, getDeparture }) {
  const [value, setValue] = React.useState(0);
  //MaterialUI style
  const classes = useStyles();
  const theme = useTheme();
  //Pagination arival
  const [pageArrival, setPageArrival] = React.useState(0);
  const [rowsPerPageArrival, setRowsPerPageArrival] = React.useState(5);

  const handleChangePageArrival = (event, newPage) => {
    setPageArrival(newPage);
  };
  const handleChangeRowsPerPageArrival = (event) => {
    setRowsPerPageArrival(parseInt(event.target.value, 10));
    setPageArrival(0);
  };
  //Pagination departure
  const [pageDeparture, setPageDeparture] = React.useState(0);
  const [rowsPerPageDeparture, setRowsPerPageDeparture] = React.useState(5);

  const handleChangePageDeparture = (event, newPage) => {
    setPageDeparture(newPage);
  };
  const handleChangeRowsPerPageDeparture = (event) => {
    setRowsPerPageDeparture(parseInt(event.target.value, 10));
    setPageDeparture(0);
  };

  // Change tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Check if name of arrival has in departure massive
  const arrivalCurrentData = getArrivel.find(
    (el) => el["airportFromID.name"] == сurrentDataName
  );

  //Status check
  const statusCheck = (status) => {
    switch (status) {
      case "LN":
        return "Прибув";
      case "ON":
        return "Вчасно";
      case "DP":
        return "Вилетів";
      case "CK":
        return "Реєстрація";
      case "DK":
        return "Вилетів";
      case "GC":
        return "Посадка";
      case "FR":
        return "В польоті";
      default:
        return status;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className="tab-wrapper">
        <Tabs
          className="tab-container"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className="tab"
            label="Відправлення"
            {...a11yProps(0)}
            icon={<ArrowUpwardIcon />}
          />
          <Tab
            className="tab"
            label="Прибуття"
            {...a11yProps(1)}
            icon={<ArrowUpwardIcon />}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>ЧАС</TableCell>
                <TableCell>НАПРЯМОК</TableCell>
                <TableCell>РЕЙС</TableCell>
                <TableCell>КОМПАНІЯ</TableCell>
                <TableCell>СТАТУС</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {Object.keys(getCurrentData).length !== 0 ? (
                <TableRow key={getCurrentData[0].ID}>
                  <TableCell scope="row">
                    <Moment format="h:mm">{getCurrentData[0].timeBoard}</Moment>
                  </TableCell>
                  <TableCell>
                    {getCurrentData[0]["airportToID.name"]} (
                    {getCurrentData[0]["airportToID.IATA"]})
                  </TableCell>
                  <TableCell>
                    {getCurrentData[0]["carrierID.IATA"]}{" "}
                    {getCurrentData[0].fltNo}
                  </TableCell>
                  <TableCell>{getCurrentData[0].airline.ru.name}</TableCell>
                  <TableCell>{statusCheck(getCurrentData[0].status)}</TableCell>
                </TableRow>
              ) : (
                <>
                  {getDeparture
                    .slice(
                      pageDeparture * rowsPerPageDeparture,
                      pageDeparture * rowsPerPageDeparture +
                        rowsPerPageDeparture
                    )
                    .map((el) => {
                      return (
                        <TableRow key={el.ID}>
                          <TableCell scope="row">
                            <Moment format="h:mm">{el.timeBoard}</Moment>
                          </TableCell>
                          <TableCell>
                            {el["airportToID.name"]} ({el["airportToID.IATA"]})
                          </TableCell>
                          <TableCell>
                            {el["carrierID.IATA"]} {el.fltNo}
                          </TableCell>
                          <TableCell>{el.airline.ru.name}</TableCell>
                          <TableCell>{statusCheck(el.status)}</TableCell>
                        </TableRow>
                      );
                    })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {Object.keys(getCurrentData).length !== 0 ||
        Object.keys(getDeparture).length === 0 ? (
          ""
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={getDeparture.length}
            rowsPerPage={rowsPerPageDeparture}
            page={pageDeparture}
            onChangePage={handleChangePageDeparture}
            onChangeRowsPerPage={handleChangeRowsPerPageDeparture}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>ЧАС</TableCell>
                <TableCell>НАПРЯМОК</TableCell>
                <TableCell>РЕЙС</TableCell>
                <TableCell>КОМПАНІЯ</TableCell>
                <TableCell>СТАТУС</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {Object.keys(getCurrentData).length !== 0 ? (
                <TableRow>
                  <TableCell scope="row">
                    <Moment format="h:mm">
                      {arrivalCurrentData.timeLandCalc}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    {arrivalCurrentData["airportFromID.name"]} (
                    {arrivalCurrentData["airportFromID.IATA"]})
                  </TableCell>
                  <TableCell>
                    {arrivalCurrentData["carrierID.IATA"]}{" "}
                    {arrivalCurrentData.fltNo}
                  </TableCell>
                  <TableCell>{arrivalCurrentData.airline.ru.name}</TableCell>
                  <TableCell>
                    {statusCheck(arrivalCurrentData.status)}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {getArrivel
                    .slice(
                      pageArrival * rowsPerPageArrival,
                      pageArrival * rowsPerPageArrival + rowsPerPageArrival
                    )
                    .map((el) => {
                      return (
                        <TableRow key={el.ID}>
                          <TableCell scope="row">
                            <Moment format="h:mm">{el.timeLandCalc}</Moment>
                          </TableCell>
                          <TableCell>
                            {el["airportFromID.name"]} (
                            {el["airportFromID.IATA"]})
                          </TableCell>
                          <TableCell>
                            {el["carrierID.IATA"]} {el.fltNo}
                          </TableCell>
                          <TableCell>{el.airline.ru.name}</TableCell>
                          <TableCell>{statusCheck(el.status)}</TableCell>
                        </TableRow>
                      );
                    })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {Object.keys(getCurrentData).length !== 0 ||
        Object.keys(getDeparture).length === 0 ? (
          ""
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={getArrivel.length}
            rowsPerPage={rowsPerPageArrival}
            page={pageArrival}
            onChangePage={handleChangePageArrival}
            onChangeRowsPerPage={handleChangeRowsPerPageArrival}
          />
        )}
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getArrivel: state.app.getArrivel,
    getDeparture: state.app.getDeparture,
    getCurrentData: state.searchBar.items,
  };
};

export default connect(mapStateToProps)(Main);
