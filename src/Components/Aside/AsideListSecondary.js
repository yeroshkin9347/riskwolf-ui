import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import makeStyles from '@mui/styles/makeStyles';

const AsideListSecondary = () => {
  const items = [
    {
      title: 'Getting Started',
      url: '#!'
    },
    {
      title: 'API Documentation',
      url: '/internal/swagger-ui/index.html?configUrl=/internal/v3/api-docs/swagger-config',
      newWindow: true
    },
    {
      title: 'Riskwolf Support',
      url: '#!'
    },
    {
      title: 'Changelog',
      url: '#!'
    },
  ];

  const useStyles = makeStyles((theme) => ({
    listItemText: {
      '& .MuiTypography-root' : {
        fontSize: 14,
      }
    }
  }));

  const classes = useStyles();

  const listItems = items.map((item, index) => {
    return (
      <ListItem
        key={index}
        button
        component="a"
        href={item.url}
        target={item.newWindow === true ? "_blank": "_self"}>
          <ListItemText primary={ item.title } className={ classes.listItemText }/>
      </ListItem>
    );
  });

  return (
    <List component="nav" aria-label="secondary navigation">
      { listItems }
    </List>
  );
};

export default AsideListSecondary;
