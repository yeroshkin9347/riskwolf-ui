import React, { useEffect, useState, useRef } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import maplibre from 'maplibre-gl';
import Ajax, { GetToken } from '../../Util/ajax';
import 'maplibre-gl/dist/maplibre-gl.css';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    borderradius: 10,
  },
  locationMap: {
    width: '100%',
  },
  map: {
    width: '100%',
    height: 400,
  }
}));

const CoverageMap = (props) => {
  const classes = useStyles();
  const { dataSourceId, dataSetId, monitoringTargetId } = props;
  
  const [paths, setPaths] = useState([]);
  const [center, setCenter] = useState(
    {
      lat: undefined,
      lng: undefined
    }
  );
  const [mapReady, setMapReady] = useState(false);
  const mapContainer = useRef(null);
  const maplibreRef = useRef();
  const apiKey = window.appConfig.geoapify.api.key;

  const showMap = center.lat !== undefined && center.lng !== undefined;

  const getMonitoringTarget = () => {
    const URI = `${window.appConfig.apiUrl}/internal/data-catalog/data-providers/${dataSourceId}/data-sets/${dataSetId}/monitoring-targets/${monitoringTargetId}`;

    GetToken().then(token => {
      Ajax.getData(URI, token)
        .then(data => {
          const newPaths = data.geometryData?.geoJson?.features?.map((feature) => feature.geometry.coordinates[0].map(([lng, lat]) => ({lat, lng})));
          if (newPaths?.length) {
            setPaths(newPaths);
          }
        })
        .catch(error => {
          // Requested by the client.
          console.error(error);
        })
    });
  }

  useEffect(() => {
    if (dataSourceId && dataSetId && monitoringTargetId) {
      getMonitoringTarget();
    }
  }, [dataSourceId, dataSetId, monitoringTargetId])

  useEffect(() => {
    if (paths.length && paths[0].length) {
      setCenter(paths[0][0]);
    }
  }, [paths])

  useEffect(() => {
    if (!showMap) return;
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
    maplibreRef.current = new maplibre.Map({
      container: mapContainer.current,
      style: `${mapStyle}?apiKey=${apiKey}`,
      center: [center.lng, center.lat],
      interactive: false,
      zoom: 6,
    });
    maplibreRef.current.on('load', () => {
      setMapReady(true);
    });
    return () => {
      setMapReady(false);
      maplibreRef.current?.remove?.();
    };
  }, [showMap, center, apiKey]);

  useEffect(() => {
    if (
      !center.lat ||
      !center.lng ||
      !mapContainer.current ||
      !maplibreRef.current ||
      !mapReady ||
      !paths.length
    )
      return;

    const map = maplibreRef.current;
    
    map.addSource('maine', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                paths[0]?.map((path) => [path.lng, path.lat])
              ]
            }
          },
        ],
      }
    })

    map.addLayer({
      id: 'main1',
      type: 'fill',
      source: 'maine',
      paint: {
        'fill-color': '#888888',
        'fill-opacity': 0.4
      },
    });
    map.addLayer({
      id: 'main2',
      type: 'line',
      source: 'maine',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3
      },
    });
  }, [center, paths, mapReady]);

  return showMap ? (
    <Box className={classes.root}>
      <div className={classes.locationMap}>
        <div className={classes.map} ref={mapContainer} />
      </div>
    </Box>
  ) : null;
};

export default CoverageMap;
