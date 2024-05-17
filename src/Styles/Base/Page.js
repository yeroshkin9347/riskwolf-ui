import { useTheme } from '@mui/material/styles';

const List = () => {
  const theme = useTheme();

  return {
    '& > li': {
      position: 'relative',
      paddingLeft: '1em',
    },
    '& > li + li': {
      marginTop: theme.spacing(3),
    },
    '& > li::before': {
      display: 'inline-block',
      content: '""',
      backgroundColor: theme.palette.primary.main,
      width: '0.4em',
      height: '0.4em',
      borderradius: '50%',
      marginRight: '0.4em',
      verticalAlign: 'top',
      marginTop: '0.6em',
      position: 'absolute',
      left: 0,
    }
  }
};

export { List };
