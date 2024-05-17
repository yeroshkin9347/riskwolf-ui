import { useEffect, useState, useRef } from 'react';
import ReactHighcharts from 'react-highcharts';
import makeStyles from '@mui/styles/makeStyles';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Ajax, { GetToken } from '../../Util/ajax';
import formatMissingValue from '../../Util/formatMissingValue';

require('highcharts-exporting')(ReactHighcharts.Highcharts);
require('highcharts-border-radius')(ReactHighcharts.Highcharts);
require('highcharts-export-csv')(ReactHighcharts.Highcharts);

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0px 3px 12px 0px #0000001F',
    borderRadius: 12,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(1.5),
    width: 'calc(100vw - 305px)',
    '& .highcharts-tooltip > span': {
      background: 'rgb(255 255 255 / 85%)',
      border: '1px solid silver',
      borderRadius: 3,
      boxShadow: '1px 1px 2px #888',
      padding: 8,
      '&, & span:first-child': {
        fontSize: '14px !important',
      },
      '& b': {
        fontWeight: 700,
      }
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
}));

export const BurnCostGraph = (props) => {
  const classes = useStyles();
  const { coverageId, trigger, triggerUnit, minPayout, payoutPerUnit, riskTypeId } = props;

  const minRateValue = parseInt(trigger * 100) / 100;
  const maxRateValue = parseInt((trigger + (100 - (minPayout?.amount ?? 0)) / (payoutPerUnit?.amount ?? 1)) * 100) / 100;

  const [data, setData] = useState([]);
  const ref = useRef(null);

  const highchartConfig = {
    chart: {
      zoomType: 'xy',
      style: {
        overflow: 'visible',
      }
    },
    title: {
      text: '',
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        }
      }
    },
    subtitle: {
      text: '',
    },
    xAxis: [{
      categories: data.map(({year}) => year),
      crosshair: true,
      labels: {
        style: {
          fontSize: 13,
        }
      }
    }],
    yAxis: [{
      title: {
        text: 'Payouts',
        style: {
          fontSize: 15,
        }
      },
      labels: {
        formatter: function () {
          const label = this.axis.defaultLabelFormatter.call(this);
          if (label < 0) return '';
          return `${label} %`;
        },
        style: {
          color: '#4F4F4F',
          fontSize: 13,
        }
      },
      min: minPayout?.amount - trigger * payoutPerUnit?.amount,
      max: 100,
      startOnTick: false,
      endOnTick: false,
      opposite: true,
    }, {
      labels: {
        format: `{value} ${triggerUnit ?? ''}`,
        style: {
          color: '#4F4F4F',
          fontSize: 13,
        }
      },
      title: {
        text: riskTypeId ?? '',
        style: {
          fontSize: 15,
        }
      },
      max: maxRateValue ?? 100,
      min: 0,
      startOnTick: false,
      endOnTick: false,
      plotLines: [{
        value: minRateValue ?? 0,
        color: '#31D158',
        dashStyle: 'solid',
        width: 3,
        label: {
          text: `<div style="height: 32px; border-radius: 16px; background-color: #31D158; padding: 0 14.5px; display: flex; align-items: center;">${formatMissingValue(minRateValue) + " " + (triggerUnit ?? '')} pays ${formatMissingValue(parseInt(minPayout?.amount * 100) / 100)}%</div>`,
          style: {
            color: 'white',
            fontSize: '14px',
            transform: 'translateX(10px)',
          },
          useHTML: true,
        },
        zIndex: 100,
      }, {
        value: maxRateValue ?? 0,
        color: '#F44336',
        dashStyle: 'solid',
        width: 3,
        label: {
          text: `<div style="height: 32px; border-radius: 16px; background-color: #F44336; padding: 0 14.5px; display: flex; align-items: center;">${formatMissingValue(maxRateValue) + " " + (triggerUnit ?? '')} pays 100%</div>`,
          align: 'right',
          style: {
            color: 'white',
            fontSize: '14px',
            transform: 'translateX(-35px)',
          },
          useHTML: true,
        },
        zIndex: 100,
      }],
    }],
    plotOptions: {
      column: {
        borderRadiusTopLeft: 6,
        borderRadiusTopRight: 6,
        pointWidth: 10,
      }
    },
    tooltip: {
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      shared: true,
      style: {
        fontSize: 13,
        padding: 0
      },
      useHTML: true,
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Index',
      type: 'column',
      yAxis: 1,
      data: data.map(({detrend_index}) => parseInt(detrend_index * 100) / 100),
      color: '#A9A9A9',
      tooltip: {
          valueSuffix: `${triggerUnit ?? ''}`
      }
    }, {
      name: 'Total Payout',
      type: 'column',
      data: data.map(({total_payout}) => parseInt(total_payout * 100) / 100),
      color: '#FC8181',
      tooltip: {
          valueSuffix: '%'
      }
    }]
  }

  const fetchGraphData = () => {
    const URI = `${window.appConfig.apiUrl}/internal/coverages/${coverageId}/pricing-result`;

    GetToken().then(token => {
      Ajax.getData(URI, token)
        .then(data => {
          setData(data?.payout ?? []);
        })
        .catch(error => {
          console.error(error);
        })
    });
  }

  const downloadToCSV = () => {
    if (ref.current?.chart) {
      ref.current.chart.downloadCSV();
    }
  }

  useEffect(() => {
    if (coverageId) {
      fetchGraphData();
    }
  }, [coverageId])

  return data.length ? (
    <Box className={classes.root}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb: 2}}>
        <Typography className={classes.title}>Historic Burn Cost</Typography>
        <Tooltip title="Download to CSV">
          <IconButton onClick={downloadToCSV}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <ReactHighcharts ref={ref} config={highchartConfig} />
    </Box>
  ) : null;
}