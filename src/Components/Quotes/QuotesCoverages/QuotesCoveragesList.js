import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import QuotesCoverage from './QuotesCoverage';
import Pagination from '@mui/material/Pagination';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { Link as link } from '../../../Styles/Base/Type';

import Paginate from '../../../Util/paginate';

const QuotesCoveragesList = props => {
  const {
    loading,
    totalCoverages,
    coverages,
    coveragesSelected,
    coveragesStagePage,
    onCoverageCheckboxChange,
    onCoveragesListPageChange } = props;

  const useStyles = makeStyles(theme => ({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(-1),
      marginBottom: theme.spacing(3),

      '& > *': {
        padding: theme.spacing(1),
      }
    },
    bold: {
      fontWeight: 'bold',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      marginBottom: theme.spacing(2),
    },
    pagination: {
      '& > ul': {
        justifyContent: 'flex-end',
      }
    },
    link: {
      ...link(),
    },
    item: {
      '& + *': {
        marginTop: theme.spacing(1),
      }
    }
  }));

  const classes = useStyles();

  return (
    <div>
      {/* Results */}
      <div>
        <header className={classes.header}>
          {/* Show results status only after lading has finished */}
          <Typography>{loading ? null : <strong className={classes.bold}>{coverages.length ? `${coverages.length} coverage${coverages.length > 1 ? 's ':''}` : 'No coverages found'}</strong>}</Typography>
          <Typography><Link href="#!" className={classes.link}>Can't find a coverage?</Link></Typography>
        </header>
        <ul className={classes.list}>
          {
            coverages.map(coverage => {
              const {
                trigger,
                triggerUnit,
                indexDefinition,
                minPayout,
                id,
                title,
                limit,
                monitoringTarget,
                start,
                end,
                createdBy,
                createdAt,
                dataSet } = coverage;

              return (
                <li key={id} className={classes.item}>
                  <QuotesCoverage
                    id={id}
                    title={coverage.dataSourceDescription}
                    description={monitoringTarget}
                    indexDefinition={indexDefinition}
                    dataSet={dataSet}
                    limit={limit}
                    trigger={trigger+triggerUnit}
                    payout={[minPayout.amount, minPayout.currency]}
                    onCoverageCheckboxChange={onCoverageCheckboxChange}
                    selected={false}
                    start={start}
                    end={end}
                    createdBy={createdBy}
                    createdAt={createdAt}
                    // Check if the coverage is already selected and if it is,
                    // disable it. Basically compares the two arrays.
                    disabled={ coveragesSelected.findIndex(coverageSelected => coverageSelected.id === id) > -1 ? true : false}
                  />
                </li>
              );
            })
          }
        </ul>
        <Pagination
          className={classes.pagination}
          count={Paginate.getTotalPages(totalCoverages, 10)}
          page={coveragesStagePage}
          color="primary"
          onChange={onCoveragesListPageChange} />
      </div>
      {/* Selected [stage] */}
      <div>
        <header className={classes.header}>
          {/* Show results status only after loading has finished */}
          <Typography>{loading ? null : <strong className={classes.bold}>{coveragesSelected.length ? `${coveragesSelected.length} coverage${coveragesSelected.length > 1 ? 's' : ''} selected` : 'No coverages selected'}</strong>}</Typography>
        </header>
        <ul className={classes.list}>
          {
            coveragesSelected.map(coverageSelected => {
              const {
                trigger,
                minPayout,
                limit,
                title,
                description,
                dataSet,
                start,
                end,
                createdBy,
                createdAt,
                id } = coverageSelected;

              return (
                <li key={id} className={classes.item}>
                  <QuotesCoverage
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    dataSet={dataSet}
                    limit={[limit.value, limit.currency]}
                    trigger={trigger}
                    payout={[minPayout.value, minPayout.currency]}
                    onCoverageCheckboxChange={onCoverageCheckboxChange}
                    start={start}
                    end={end}
                    createdBy={createdBy}
                    createdAt={createdAt}
                    selected={true}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default QuotesCoveragesList;
