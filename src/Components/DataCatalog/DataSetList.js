import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { DataSetCard } from './DataSetCard';
import Ajax, { GetToken } from '../../Util/ajax';

export const DataSetList = (props) => {
  const {dataProvider} = props;

  const [dataSets, setDataSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = `${window.appConfig.apiUrl}/internal/data-catalog/data-providers`;

  const getDataSets = (provider) => {
    setIsLoading(true);
    GetToken().then(token => {
      Ajax.getData(`${API_URL}/${provider}/data-sets`, token)
        .then(data => {
          console.log(data)
          setDataSets(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    if (dataProvider !== undefined) {
      getDataSets(dataProvider);
    }
  }, [dataProvider])

  return (
    <Stack
      gap={2.5}
      sx={{ mt: 2.5 }}
    >
    {(!isLoading && !dataSets.length) ? (
      <Typography sx={{ml: 2}}>No data</Typography>
    ) : (
      (isLoading ? new Array(3).fill(0) : dataSets).map((card, index) => (
        <DataSetCard key={isLoading ? `data-set-placholder-${index}` : card.id} isLoading={isLoading} card={card} />
      ))
    )}
    </Stack>
  );

}