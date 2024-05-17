import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import "material-icons/iconfont/material-icons.css";

const CardSelect = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: theme.spacing(12 / 8),
    },
    selected: {
      backgroundColor: "#F6F7FF",
    },
    actions: {
      display: "none",
    },
    title: {
      fontWeight: 600,
      cursor: "pointer",
    },
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    main: {
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: theme.spacing(0.5),
    },
    content: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
    cta: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      minWidth: theme.spacing(15),
    },
    ctaSelected: {
      color: "#999",
    },
    icon: {
      marginRight: theme.spacing(10/8),
    }
  }));

  const classes = useStyles();

  const onClick = () => onCheckboxChange(id);

  const { id, selected, title, content, onCheckboxChange, icon } = props;

  return (
    <Card
      variant="outlined"
      className={clsx(classes.root, {
        [classes.selected]: selected,
      })}
    >
      <CardContent>
        <div className={classes.body}>
          <div className={classes.header}>
            {!!icon && <i className={clsx('material-icons', classes.icon)}>{icon}</i>}
            <Typography
              className={classes.title}
              onClick={onClick}
            >
              {title}
            </Typography>
          </div>
          <div className={classes.main}>
            <Typography className={classes.content}>{content}</Typography>
            <Button
              className={clsx(classes.cta, {
                [classes.ctaSelected]: selected,
              })}
              {...(selected ? {} : { color: "primary" })}
              variant="contained"
              onClick={onClick}
              disabled={selected}
              disableElevation
            >
              {selected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.actions}></CardActions>
    </Card>
  );
};

export default CardSelect;
