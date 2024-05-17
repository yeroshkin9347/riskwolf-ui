import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import makeStyles from '@mui/styles/makeStyles';

const CoveragesNewMap = () => {
  const containerStyle = {
    width: '100%',
    height: '270px'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      overflow: 'hidden',
      borderradius: 10,
    },
  }));

  const classes = useStyles();

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
    >
    <div className={classes.root}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
    </LoadScript>
  );
};

export default CoveragesNewMap;
