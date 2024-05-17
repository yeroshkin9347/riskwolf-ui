import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ToolboxPolicies from '../Toolbox/ToolboxPolicies';
import PoliciesSearch from './PoliciesSearch';
import PoliciesTable from './PoliciesTable';
import formatMissingValue from '../../Util/formatMissingValue';

const PoliciesCard = props => {
  const {title, content, loaded} = props;

  const useStyles = makeStyles(theme => ({
    root: {
      padding: `${theme.typography.pxToRem(30)} ${theme.typography.pxToRem(16)}`,
      borderRadius: 12,
      boxShadow: '0px 3px 12px 0px #0000001F',
      backgroundColor: 'white',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 700,
      fontSize: 48,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      fontWeight: 700,
      fontSize: 20,
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>{loaded ? formatMissingValue(title) : <Skeleton/>}</Typography>
      <Typography className={classes.subtitle}>{content}</Typography>
    </div>
  );

}

const PoliciesCards = props => {
  const { cards, loaded } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(2),
    },
    col: {
      display: 'flex',
    },
  }));

  const classes = useStyles();

  const PoliciesCards = cards.map((card, index) => {
    return (
      <Grid item sm={6} md={3} className={classes.col}>
        <PoliciesCard title={card.title} content={card.content} loaded={loaded} />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        <Grid container spacing={2}>
          { PoliciesCards }
        </Grid>
      </Container>
    </div>
  );
};

const Policies = props => {
  const {
    policies,
    loaded,
    cards,
    page,
    rowsPerPage,
    totalPages,
    totalElements,
    onChangePage,
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxPolicies/>
      <PoliciesCards cards={cards} loaded={loaded}/>
      <PoliciesSearch handleReload={props.handleReload} refreshLoading={props.refreshLoading}/>
      <PoliciesTable {...{ policies, loaded, page, rowsPerPage, totalPages, totalElements, onChangePage }} />
    </Box>
  );
}

export default Policies;
