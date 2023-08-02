import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    width: "100%",
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const WeekView = ({ dateProps }: any) => {
  const classes = useStyles();
  const daysInWeek = [0, 1, 2, 3, 4, 5, 6];
  const weekdays = daysInWeek.map((day) => {
    const dayOfWeek = new Date(
      dateProps && dateProps.getFullYear(),
      dateProps && dateProps.getMonth(),
      dateProps && dateProps.getDate() + day
    );
    // const dateFormat = "EEE";
    return (
      <Grid item xs key={Date.now()}>
        <Typography variant="h6">
          {/* {dayOfWeek.toLocaleString("en-US", { weekday: dateFormat })} */}
        </Typography>
        <Typography>{dayOfWeek.getDate()}</Typography>
      </Grid>
    );
  });

  return (
    <Grid container direction="column">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.paper}
      >
        {weekdays}
      </Grid>
    </Grid>
  );
};

const DayView = ({ dateProps }: any) => {
  const classes = useStyles();
  const dateFormat = "EEEE, MMMM d, yyyy";
  const dateString =
    dateProps && dateProps.toLocaleString("en-US", { weekday: dateFormat });

  return (
    <Grid container direction="column">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.paper}
      >
        <Typography variant="h5">{dateString}</Typography>
      </Grid>
    </Grid>
  );
};

const Calendar = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

  //   const handleChange = (event) => {
  //     setSelectedDate(new Date(event.target.value));
  //   };

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const renderDays = () => {
    const days = [];
    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    const startDay = startOfMonth.getDay();
    const endDay = endOfMonth.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(<TableCell key={`empty-${i}`} />);
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      days.push(
        <TableCell
          key={`day-${i}`}
          className={i === selectedDate.getDate() ? classes.selected : ""}
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
            )
          }
        >
          {i}
        </TableCell>
      );
    }

    for (let i = endDay; i < 6; i++) {
      days.push(<TableCell key={`empty-${i}`} />);
    }

    const rows = [];
    let cells: any[] = [];

    days.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(<TableRow key={`row-${i / 7}`}>{cells}</TableRow>);
        cells = [day];
      }
    });

    rows.push(<TableRow key={`row-${rows.length}`}>{cells}</TableRow>);

    return <TableBody>{rows}</TableBody>;
  };

  const dateFormat = "MMMM yyyy";
  const monthYear = selectedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    const monthYear = selectedDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Calendar
        </Typography>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.paper}
        >
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5">{monthYear}</Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedDate(new Date())}>
            <TodayIcon />
          </IconButton>
        </Grid>
      </>
    );
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  const renderView = () => {
    switch (view) {
      case "week":
        return <WeekView dateProps={selectedDate} />;
      case "day":
        return <DayView dateProps={selectedDate} />;
      default:
      // return <MonthView date={selectedDate} />;
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          {renderHeader()}

          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.paper}
          >
            <IconButton onClick={() => handleViewChange("month")}>
              <Typography
                variant="body1"
                style={{ fontWeight: view === "month" ? "bold" : "normal" }}
              >
                Month
              </Typography>
            </IconButton>
            <IconButton onClick={() => handleViewChange("week")}>
              <Typography
                variant="body1"
                style={{ fontWeight: view === "week" ? "bold" : "normal" }}
              >
                Week
              </Typography>
            </IconButton>
            <IconButton onClick={() => handleViewChange("day")}>
              <Typography
                variant="body1"
                style={{ fontWeight: view === "day" ? "bold" : "normal" }}
              >
                Day
              </Typography>
            </IconButton>
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Sun</TableCell>
                <TableCell>Mon</TableCell>
                <TableCell>Tue</TableCell>
                <TableCell>Wed</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>Sat</TableCell>
              </TableRow>
            </TableHead>
            {renderDays()}
          </Table>
          {renderView()}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Calendar;
