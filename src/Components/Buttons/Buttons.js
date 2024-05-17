import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';

const ButtonCancel = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 110,
      color: theme.palette.error.main,
      "& a": {
        textDecoration: "none",
        color: "inherit",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      href={props.href}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const ButtonNav = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.divider,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  }));

  const classes = useStyles();

  return (
    <IconButton color="primary" className={classes.root} {...props} size="large">
      {props.children}
    </IconButton>
  );
};

const ButtonSuccessSimple = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.success.light,
      fontWeight: 700,
    },
  }));

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      {...props}
      href={props.href}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

const ButtonSuccess = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.backgroundPaper,
      backgroundColor: theme.palette.success.light,
      "&:hover": {
        backgroundColor: theme.palette.success[700],
      },
      borderRadius: 8,
    },
  }));

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      href={props.href}
      onClick={props.onClick}
      variant="contained"
      color="primary"
      disableElevation
      {...props}
    >
      {props.children}
    </Button>
  );
};

const ButtonError = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.backgroundPaper,
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
  }));

  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      disableElevation
      {...props}
    >
      {props.children}
    </Button>
  );
};

const ButtonRound = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderradius: "100px",
      minWidth: theme.spacing(22),
      paddingTop: "0.75em",
      paddingBottom: "0.75em",
    },
  }));

  const classes = useStyles();

  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      disableElevation
      className={classes.root}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export {
  ButtonCancel,
  ButtonRound,
  ButtonSuccess,
  ButtonError,
  ButtonSuccessSimple,
  ButtonNav,
};
