import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    boxShadow: '0px 3px 12px 0px #0000001F',
    padding: theme.spacing(2),
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      '& article *': {
        textAlign: 'center',
        marginTop: theme.spacing(2),
      }
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: theme.spacing(0.75),
  },
  content: {
    fontSize: 16,
    fontWeight: 400,
    color: '#9FA2B4',
    marginBottom: theme.spacing(1),
  },
  link: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.alt.main,
    textDecoration: 'underline',
    width: '100%',
    display: 'block',
    '&:hover': {
      textDecoration: 'none',
    }
  },
  disabled: {
    opacity: 0.3,
  },
  iconBox: {
    width: 108,
    height: 108,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    flexShrink: 0,
    marginRight: theme.spacing(2),
    '& .MuiSvgIcon-root': {
      color: 'inherit',
      fontSize: 80,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
}));

const CardIcon = props => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, {
      [classes.disabled]: !props.reportId,
    })}>
      {props.icon ? (
        <aside className={classes.iconBox}>
          {props.icon}
        </aside>
      ) : null}
      <article>
        <Typography variant="h6" className={classes.title}>{props.title}</Typography>
        <Typography variant="body1" className={classes.content}>{props.children}</Typography>
        {props.loaded ? (
          props.reportId ? (
            <Link variant="body1"
              onClick={() => {props.handleDownload(props.linkUrl)}}
              href="#!"
              className={classes.link}>Review report</Link>
          ) : <Typography>No report available</Typography>
        ) : null}
      </article>
    </div>
  );
};

export default CardIcon;
