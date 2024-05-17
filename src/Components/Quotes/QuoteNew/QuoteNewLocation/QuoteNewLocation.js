import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import makeStyles from '@mui/styles/makeStyles';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { get, useFormContext, useWatch } from 'react-hook-form';
import maplibre from 'maplibre-gl';
import clsx from 'clsx';
import 'maplibre-gl/dist/maplibre-gl.css';
import Ajax, { GetToken } from '../../../../Util/ajax';
import { pointInPolygon } from '../../../../Util/pointInPolygon';
import QuotesLocationNoFeaturesModal from './QuotesLocationNoFeaturesModal';

const QuoteNewLocationFeaturesQuery = 'QuoteNewLocation-features';
const MAP_ZOOM = 11;
const LAT_OFFSET = 0.05;
const MAP_FLY_ANIMATION_DURATION = 1000;

const QuoteNewLocation = () => {
  const [location, setLocation] = useState({ lat: undefined, long: undefined });
  const [mapReady, setMapReady] = useState(false);
  const [showEmptyFeaturesModal, setShowEmptyFeaturesModal] = useState(false);
  const [URL, setURL] = useState();
  const { setValue } = useFormContext();

  const mapContainer = useRef(null);
  const maplibreRef = useRef();
  const country = useWatch({ name: 'country', exact: true });
  const program = useWatch({ name: 'program', exact: true });
  
  const showMap = location.lat !== undefined && location.long !== undefined;
  
  const { data = [], isLoading } = useQuery({
    queryKey: [QuoteNewLocationFeaturesQuery, URL],
    queryFn: async () => {
      const token = await GetToken();
      return await Ajax.getData(URL, token);
    },
    refetchOnWindowFocus: false,
    enabled: !!URL,
  });

  const apiKey = window.appConfig.geoapify.api.key;

  const useStyles = makeStyles((theme) => ({
    container: {
      position: 'relative',
    },
    extendedContainer: {
      position: 'relative',
      width: 'calc(100vw - 250px)',
      transform: 'translateX(-50%)',
      left: '50%',
      
      [theme.breakpoints.down('md')]: {
        width: '100%',
      }
    },
    locationMap: {
      position: 'relative',
      height: 600,
      paddingBottom: 20,
    },
    addressInputContainer: {
      position: 'absolute',
      width: '100%',
      top: theme.spacing(2)
    },
    addressInput: {
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  const classes = useStyles();

  const onAddressChange = (value) => {
    setURL(undefined);
    if (value === null) {
      setLocation({ lat: undefined, long: undefined });
      setURL(undefined);
      setValue('targetId', undefined);
      setValue('coveragesSelected', []);
    } else {
      const latValue = get(value, 'properties.lat');
      const lonValue = get(value, 'properties.lon');
      const address = get(value, 'properties.address_line2');
      const postcode = get(value, 'properties.postcode');
      const city = get(value, 'properties.city');
      setValue('postcode', postcode);
      setValue('city', city);
      setLocation({ lat: latValue, long: lonValue, address });
    }
  };
  
  const handleCloseEmptyFeaturesModal = () => {
    setShowEmptyFeaturesModal(false);
  };

  useEffect(() => {
    if (!showMap) return;
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
    maplibreRef.current = new maplibre.Map({
      container: mapContainer.current,
      style: `${mapStyle}?apiKey=${apiKey}`,
      center: [location.long, location.lat],
      interactive: false,
      zoom: MAP_ZOOM,
    });
    maplibreRef.current.on('load', () => {
      maplibreRef.current.on('click', 'maine', (e) => {
        setLocation({ long: e.lngLat.lng, lat: e.lngLat.lat });
      });
      setMapReady(true);
    });
    return () => {
      setMapReady(false);
      maplibreRef.current?.remove?.();
    };
  }, [showMap]);

  useEffect(() => {
    if (
      !location.lat ||
      !location.long ||
      !mapContainer.current ||
      !maplibreRef.current ||
      !mapReady
    )
      return;

    const map = maplibreRef.current;
    if (location.address) {
      map.flyTo({ duration: MAP_FLY_ANIMATION_DURATION, center: [location.long, location.lat], zoom: MAP_ZOOM });
    }
    const polygonListData = data?.features?.map(({ geometry }) => geometry.coordinates) ?? [];
    let polygonArrayData = [];
    polygonListData.forEach((polygonData) => {
      polygonArrayData.push(...polygonData);
    });

    const selectedFeature = data?.features?.filter((feature) =>
      pointInPolygon([location.long, location.lat], feature.geometry.coordinates[0]),
    )?.[0];
    
    setValue('targetId', selectedFeature?.properties?.monitoringTargetId);
    setTimeout(() => {
      const mapBounds = map.getBounds();
      const LON_OFFSET = (mapBounds._ne.lng - mapBounds._sw.lng) * 0.2;
      
      setURL(
        `${window.appConfig.apiUrl}/internal/features?topLeftLat=${(mapBounds._sw.lat - LAT_OFFSET).toFixed(
          1,
        )}&topLeftLon=${(mapBounds._ne.lng + LON_OFFSET).toFixed(1)}&bottomRightLat=${(mapBounds._ne.lat + LAT_OFFSET).toFixed(
          1,
        )}&bottomRightLon=${(mapBounds._sw.lng - LON_OFFSET).toFixed(1)}`,
      );}, MAP_FLY_ANIMATION_DURATION);
    
    if (!isLoading) {
      if (data.features && data.features?.length) {
        const sourceMaine = map.getSource('maine');
        const gridCells = {
          type: 'FeatureCollection',
          features: polygonArrayData.map((polygon, index) => (
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [polygon]
              }
            })
          )
        }
        if (!sourceMaine) {
          map.addSource('maine', {
            type: 'geojson',
            data: gridCells,
          });
          map.addLayer({
            id: 'maine',
            type: 'fill',
            source: 'maine',
            layout: {},
            paint: {
              'fill-color': 'rgb(7,105,25)',
              'fill-opacity': 0.2,
            },
          });
          map.addLayer({
            id: 'main2',
            type: 'line',
            source: 'maine',
            layout: {},
            paint: {
              'line-color': '#ff00fb30',
              'line-width': 8
            },
          });
        } else {
          sourceMaine.setData(gridCells);
        }
        const searchedPolygonSource = map.getSource('searchedPolygon');
        if (!searchedPolygonSource) {
          map.addSource('searchedPolygon', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: selectedFeature?.geometry?.coordinates ?? [],
              },
            },
          });
          map.addLayer({
            id: 'searchedPolygon',
            type: 'fill',
            source: 'searchedPolygon',
            layout: {},
            paint: {
              'fill-color': '#0000ff',
              'fill-opacity': 0.3,
            },
          });
        } else {
          searchedPolygonSource.setData({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: selectedFeature?.geometry?.coordinates ?? [],
            },
          });
        }
      } else {
        setShowEmptyFeaturesModal(true);
      }
    }
  }, [location, data, mapReady, isLoading]);
  
  useEffect(() => {
    setLocation({ lat: undefined, long: undefined });
  }, [program])

  return (
    <div className={clsx(showMap ? classes.extendedContainer : classes.container)}>
      {showMap && (
        <div className={classes.locationMap}>
          <div className="map-container" ref={mapContainer} />
        </div>
      )}
      <div className={showMap ? classes.addressInputContainer : ''}>
        <GeoapifyContext apiKey={apiKey}>
          <Typography className={classes.addressInput} component="div">
            <GeoapifyGeocoderAutocomplete
              filterByCountryCode={[country?.slice(0, 2)?.toLowerCase()]}
              position={{ lat: location.lat, lon: location.long }}
              placeSelect={onAddressChange}
              placeholder="Search by location, district or sub-district"
              disabled={true}
            />
          </Typography>
        </GeoapifyContext>
      </div>
      <QuotesLocationNoFeaturesModal open={showEmptyFeaturesModal} handleClose={handleCloseEmptyFeaturesModal} address={location.address} />
    </div>
  );
};

export default QuoteNewLocation;
