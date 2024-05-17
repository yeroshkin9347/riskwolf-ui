import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';

import get from 'lodash/get';
import Time from '../../Util/time';

const NoClaims = () => {
  const useStyles = makeStyles(theme=> ({
    root: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
      textAlign: 'center',
    },
    content: {
      color: theme.palette.grey[400],
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.content}>There have been no clams on this policy</Typography>
    </div>
  );
};

const PolicyAccordion = props => {
  const { claims, onDownload } = props;

  const useStyles = makeStyles(theme=> ({
    root: {
      maxWidth: theme.typography.pxToRem(684),
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: theme.spacing(4),
    },
    accordion: {
      '& + *': {
        marginTop: theme.typography.pxToRem(16),
      }
    },
    title: {
      fontWeight: 'bold',
      marginRight: '1em',
    },
    summary: {
      backgroundColor: '#F6F9FD',
    },
    dot: {
      width: theme.typography.pxToRem(20),
      height: theme.typography.pxToRem(20),
      marginRight: theme.typography.pxToRem(26),
      backgroundColor: '#F44336',
      borderradius: '50%',
    },
    spread: {
      display: 'flex',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    line: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      '& + *': {
        marginTop: theme.typography.pxToRem(10),
      }
    },
    link: {
      color: theme.palette.alt.main,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      }
    },
    toolbox: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
      alignItems: 'center',
    },
    toolboxTitle: {
      marginRight: '1em',
    }
  }));

  const classes = useStyles();

  const getLastSlug = slugs => {
    const divider = slugs.search(/>/) !== -1 ? ' > ' : ' / ';

    try {
      const slugParts = slugs.split(divider);

      return slugParts[slugParts.length - 1];
    } catch {
      return null;
    }
  };

  const accordions = claims.map((claim, index) => {
    const title = [
      getLastSlug(get(claim, 'parametricLoss.coverage.riskType')),
      getLastSlug(get(claim, 'parametricLoss.coverage.monitoringTarget')),
      `${get(claim, 'parametricLoss.parametricEvent.value')}${get(claim, 'parametricLoss.parametricEvent.unit')}`,
      `${get(claim, 'amount.amount')}${get(claim, 'amount.currency')}`,

    ].join(' / ');
    const date = get(claim, 'parametricLoss.parametricEvent.startTime');
    const documentId = get(claim, 'claimReportDocumentId');
    const lines = [
      [
        'Cohort name', get(claim, 'policyItem.name'),
      ],
      [
        'Cover', get(claim, 'parametricLoss.coverage.indexDefinition')
      ],
      [
        'Location', get(claim, 'parametricLoss.coverage.monitoringTarget')
      ],
      [
        'Measured value / Trigger', `${get(claim, 'parametricLoss.parametricEvent.value')}${get(claim, 'parametricLoss.parametricEvent.unit')} / ${get(claim, 'parametricLoss.coverage.trigger')}${get(claim, 'parametricLoss.coverage.triggerUnit')}`
      ],
      [
        'Payout', get(claim, 'amount.amount') + get(claim, 'amount.currency')
      ],
      [
        'Claim Report',
        <Link variant="body1"
          onClick={() => {onDownload(`${window.appConfig.apiUrl}/internal/files/${documentId}`)}}
          href="#!"
          className={classes.link}>Download</Link>
      ],
    ];

    return (
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.summary}
        >
          <div className={classes.dot}></div>
          <div className={classes.spread}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.date}>{Time.getDate(date)}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          { lines.map((line, index) => {
            return (
              <div className={classes.line}>
                <Typography>{line[0]}</Typography>
                <Typography>{line[1]}</Typography>
              </div>
            );
          })}
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <div className={classes.root}>
      {/* =============================================================== */}
      {/* Disabled as per client's request. Not sure if it will be needed */}
      {/* =============================================================== */}
{/*      <div className={classes.toolbox}>
        <Typography className={classes.toolboxTitle}>
          <Box
            component="span"
            fontWeight="fontWeightBold">2 active claims</Box>
        </Typography>
        <Button variant="contained" color="primary">
          View all claims
        </Button>
      </div>
*/}      {accordions}
    </div>
  );
};

const PolicyClaims = props => {
  const { claims, onDownload } = props;

  return (
    <>
      {
        (claims && claims.length) ? <PolicyAccordion claims={claims} onDownload={onDownload}/> : <NoClaims/>
      }
    </>
  );
};

export default PolicyClaims;
