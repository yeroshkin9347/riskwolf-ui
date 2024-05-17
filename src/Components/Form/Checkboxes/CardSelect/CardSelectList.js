import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import CardSelect from './CardSelect';

const CardSelectList = props => {
  const { cards, loaded, onCheckboxChange } = props;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      listStyle: 'none',
      padding: 0,
    },
    item: {
      marginBottom: theme.spacing(2),
    },
  }));
  
  const classes = useStyles();
  
  return (
    <ul className={classes.root}>
      {
        cards.map((card, index) => {
          return (
            <li key={index} className={classes.item}>
              {
                loaded ? (
                  <CardSelect
                    id={card.id}
                    title={card.name}
                    selected={card.selected}
                    icon={card.icon}
                    onCheckboxChange={onCheckboxChange}
                    content={card.description} />
                ) : (
                  <Skeleton variant="rectangular" height={168}/>
                )
              }
            </li>
          );
        })
      }
    </ul>
  );
};

export default CardSelectList;
