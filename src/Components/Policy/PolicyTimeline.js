import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import clsx from 'clsx';

import LinkIcon from '@mui/icons-material/Link';

const PolicyTimelineItem = props => {
  const { title, content, time, type, last, url } = props;

  const useStyles = makeStyles(theme=> ({
    root: {
      '&::before': {
        display: 'none',
      }
    },
    dot: {
      boxShadow: 'none',
      boxSizing: 'border-box',
      width: theme.typography.pxToRem(20),
      height: theme.typography.pxToRem(20),
      backgroundColor: theme.palette.primary.main,
    },
    dotRed: {
      backgroundColor: theme.palette.indicatorRed,
    },
    dotGreen: {
      backgroundColor: '#3EAF3F',
    },
    link: {
      display: 'inline-flex',
    },
    title: {
      fontSize: theme.typography.pxToRem(14),
      marginBottom: theme.spacing(1),
    },
    titleRed: {
      color: theme.palette.indicatorRed,
    },
    titleGreen: {
      color: '#3EAF3F',
    },
    icon: {
      marginLeft: theme.typography.pxToRem(14),
    },
    small: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.grey[600],
    }
  }));

  const classes = useStyles();

  return (
    <TimelineItem className={classes.root}>
      <TimelineSeparator>
        <TimelineDot className={clsx(classes.dot, {
          [classes.dotRed]: type === 'red',
          [classes.dotGreen]: type === 'green',
        })} />
        {
          last ? null : <TimelineConnector />
        }
      </TimelineSeparator>
      <div>
        <TimelineContent>
          { url ? (
              <a href="#!" className={classes.link}>
                <Typography className={classes.title}>{title}</Typography>
                <LinkIcon className={classes.icon}/>
              </a>
            ) : (
              <Typography className={clsx(classes.title, {
                [classes.titleRed]: type === 'red',
                [classes.titleGreen]: type === 'green',
              })}>{title}</Typography>
            )
          }
          <Typography className={classes.small}>{time}</Typography>
          <Typography className={classes.small}>{content}</Typography>
        </TimelineContent>
      </div>
    </TimelineItem>
  );
};

const PolicyTimeline = props => {
  const { items } = props;

  const useStyles = makeStyles(theme=> ({
    root: {
      alignItems: 'flex-start',
    },
  }));

  const classes = useStyles();

  const timelineItems = items.map((item, index) => <PolicyTimelineItem
      key={index}
      title={item.title}
      content={item.content}
      time={item.time}
      type={item.type}
      url={item.url}
      last={index === items.length - 1} />)

  return (
    <Timeline className={classes.root}>
      {timelineItems}
    </Timeline>
  );
};

export default PolicyTimeline;
