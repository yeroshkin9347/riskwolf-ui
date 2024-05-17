import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import makeStyles from '@mui/styles/makeStyles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';

const ButtonDropdown = props => {
  const [isVisible, setIsVisible] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-block',
      position: 'relative',
    },
    options: {
      display: 'flex',
      position: 'absolute',
      flexDirection: 'column',
      gap: '5px',
      padding: 5,
      backgroundColor: theme.palette.common.white,
      boxSizing: 'border-box',
      minWidth: 'calc(100% + 10px)',
      boxShadow: theme.shadows[2],
      left: -5,
      borderradius: theme.shape.borderRadius,
      opacity: 0,
      visibility: 'hidden',
    },
    isVisible: {
      opacity: 1,
      visibility: 'visible',
    },
  }));

  const classes = useStyles();

  return (
    // Close the dropdown menu if the user clicks somewhere else on the page.
    <ClickAwayListener onClickAway={() => setIsVisible(false)}>
      <div className={classes.root}>
        <Button
          disabled={props.loaded ? false : true}
          onClick={() => setIsVisible(!isVisible)}
          variant="contained"
          color="primary"
          endIcon={isVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        >
          Customer response
        </Button>
          <div
            onClick={() => setIsVisible(!isVisible)}
            className={clsx(classes.options, isVisible && classes.isVisible)}>
            { props.children }
          </div>
      </div>
    </ClickAwayListener>
  );
};

export default ButtonDropdown;
