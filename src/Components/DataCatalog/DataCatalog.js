import { useState, useEffect } from 'react';
import { Box, Toolbar, Typography, Stack, Skeleton, Select, FormControl, InputLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ToolboxDataCatalog } from '../Toolbox/ToolboxDataCatalog';
import { DataProviderList } from './DataProviderList';
import { DataSetList } from './DataSetList';
import Ajax, { GetToken } from '../../Util/ajax';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  main: {
    backgroundColor: '#f7f8fc',
    flex: 1,
    padding: `${theme.spacing(2.5)} ${theme.spacing(2)}`,
  },
  card: {
    borderRadius: 15,
    boxShadow: '0px 6px 16px 0px #7575751A',
    padding: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(5)}`,
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }
}));

const DataCatalog = () => {
  const classes = useStyles();
  const [dataProvider, setDataProvider] = useState();
  const [riskTypeFilter, setRiskTypeFilter] = useState('all');
  const [riskTypes, setRiskTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectDataProvider = (providerId) => {
    setDataProvider(providerId);
  }

  const API_URL = `${window.appConfig.apiUrl}/internal/risk-types`;

  const getRiskTypes = () => {
    GetToken().then(token => {
      Ajax.getData(API_URL, token)
        .then(data => {
          setRiskTypes(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    getRiskTypes();
  }, [])

  const dataProviderList = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography className={classes.title} variant="h6">Data Providers</Typography>
        <Box sx={{ml: 'auto'}}>
          {isLoading ? <Skeleton /> : (
            <FormControl fullWidth size="small">
              <InputLabel id="risk-main-type">Risk type</InputLabel>
              <Select
                label="Risk type"
                native
                value={riskTypeFilter}
                labelId="risk-main-type"
                onChange={e => setRiskTypeFilter(e.target.value)}
                variant="outlined"
              >
                <option aria-label="None" value="all">All</option>
                {
                  riskTypes.map((option, index) => {
                    return <option value={option.id} key={index}>{option.name}</option>;
                  })
                }
              </Select>
            </FormControl>
          )}
        </Box>
      </Stack>
      <DataProviderList onSelectProvider={handleSelectDataProvider} riskType={riskTypeFilter} />
    </>
  );

  const dataSetList = (
    <>
      <Typography className={classes.title} variant="h6">Data sets</Typography>
      <DataSetList dataProvider={dataProvider} riskType={riskTypeFilter} />
    </>
  );

  return (
    <Box className={classes.root}>
      <Toolbar />
      <ToolboxDataCatalog 
        onBack={() => setDataProvider(undefined)} 
        dataProvider={dataProvider} 
        riskType={riskTypeFilter}
        onChangeRiskType={setRiskTypeFilter}
      />
      <Box className={classes.main}>
        <Box className={classes.card}>
          {dataProvider ? dataSetList : dataProviderList}
        </Box>
      </Box>
    </Box>
  );
}

export default DataCatalog;