import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { ButtonCancel, ButtonSuccess } from "../Buttons/Buttons";
import QuotesNewCancelModal from "../Quotes/QuotesModals/QuotesNewCancelModal";

const ToolboxQuotesNew = (props) => {
  const {
    onQuoteSave,
    saveEnabled,
    activeStep,
    totalSteps,
    handleStartQuote,
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      position: "sticky",
      top: 56,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
      [theme.breakpoints.up("sm")]: {
        top: 64,
      },
    },
    Toolbar: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid",
      borderBottomColor: theme.palette.divider,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    cancel: {
      color: theme.palette.error.main,
    },
    title: {
      marginBottom: "1em",
      fontWeight: "bold",
      [theme.breakpoints.up("sm")]: {
        marginRight: theme.spacing(2),
        marginBottom: 0,
      },
    },
    saveBtn: {
      borderRadius: 8,
    }
  }));

  const classes = useStyles();

  // Dialog box state.
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    setOpen(true);
  };

  const handleAlertClose = (object, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <Typography className={classes.title} variant="h6">
          New Quotation (Draft)
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonCancel
                onClick={handleCancel}
                style={{ textDecoration: "underline" }}
              >
                CANCEL
              </ButtonCancel>
            </Grid>
            <Grid item>
              <Button
                className={classes.saveBtn}
                onClick={onQuoteSave}
                disabled={!saveEnabled}
                variant="contained"
                color="primary"
              >
                SAVE QUOTATION
              </Button>
            </Grid>
            <Grid item>
              <ButtonSuccess
                disabled={activeStep < totalSteps}
                onClick={handleStartQuote}
              >
                COMPLETE QUOTATION
              </ButtonSuccess>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
      <QuotesNewCancelModal open={open} handleClose={handleAlertClose} />
    </Box>
  );
};

export default ToolboxQuotesNew;
