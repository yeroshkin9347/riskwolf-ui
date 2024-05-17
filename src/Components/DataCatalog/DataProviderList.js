import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { Typography, Pagination } from '@mui/material';
import { DataProviderCard } from './DataProviderCard';
import Ajax, { GetToken } from '../../Util/ajax';
import Paginate from '../../Util/paginate';

export const DataProviderList = (props) => {
  const [dataProviders, setDataProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const indexesPerPage = process.env.REACT_APP_DATA_PROVIDERS_PER_PAGE;

  const indexesPages = Paginate.getTotalPages(dataProviders, indexesPerPage);

  const API_URL = `${window.appConfig.apiUrl}/internal/data-catalog/data-providers`;

  const getDataProviders = (riskType) => {
    GetToken().then(token => {
      Ajax.getData(`${API_URL}${riskType === 'all' ? '' : `?riskTypeId=${riskType}`}`, token)
        .then(data => {
          setDataProviders(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    getDataProviders(props.riskType);
    setPage(1);
  }, [props.riskType])

  return (
    <>
      <Grid 
        container
        rowSpacing={{ xs: 2, md: 2.5 }} 
        columnSpacing={{ xs: 2, md: 2.75 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ mt: 2.5 }}
      >
        {(!isLoading && !dataProviders.length) ? (
          <Typography sx={{ml: 2}}>No data</Typography>
        ) : (
          (isLoading ? new Array(3).fill(0) : Paginate.renderPage(dataProviders, indexesPerPage, page)).map((card, index) => (
            <DataProviderCard key={isLoading ? `data-provider-placholder-${index}` : card?.id} card={card} isLoading={isLoading} {...props} />
          ))
        )}
      </Grid>
      {!isLoading && dataProviders.length > indexesPages && (
          <Pagination
            count={indexesPages}
            onChange={(_, pageNumber) => setPage(pageNumber)}
            sx={{mt: 4, ml: 'auto'}}
          />
        )}
    </>
  );

}