import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonNav } from '../Buttons/Buttons';

const useStyles = makeStyles((theme) => ({
  toolbox: {
    padding: `0 ${theme.spacing(2)}`,
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1px solid #EFEFEF',
    position: 'sticky',
    top: 56,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.up('md')]: {
      top: 64,
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  backBtn: {
    color: theme.palette.primary.main,
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
  },
  logo: {
    marginLeft: 'auto',
    '& svg': {
      width: 46,
      height: 46,
    }
  },
}));

export const ToolboxDataCatalog = (props) => {
  const { dataProvider, onBack } = props;
  const classes = useStyles();

  return (
    <Box className={classes.toolbox}>
      {!!dataProvider && (
        <ButtonNav className={classes.backBtn} onClick={onBack}>
          <ArrowBackIcon />
        </ButtonNav>
      )}
      <Typography className={classes.title} variant="h6">Data Catalog</Typography>
    </Box>
  );
}