import React from 'react';
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import ReactHighcharts from "react-highcharts";
import DashboardCard from "./DashboardCard";
import Box from "@mui/material/Box";

const useStyles = makeStyles(theme => ({
  cardTitle: {
    fontWeight: 700,
    fontSize: 20,
    marginTop: theme.spacing(2),
  },
}))

const DashboardEventCard = () => {
  const classes = useStyles();
  
  const highChartConfig = {
    chart: {
      type: 'column',
      height: 280,
    },
    title: {
      text: ''
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        }
      }
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: [
        'May, 21',
        'Jul, 21',
        'Aug, 21',
        'Sep, 21',
        'Oct, 21',
        'Nov, 21',
        'Dec, 21',
        'Jan, 22',
        'Feb, 22',
        'Mar, 22',
        'Apr, 22',
      ],
      crosshair: true,
      labels: {
        style: {
          color: '#A3A3A3',
          fontWeight: 400,
          fontSize: 10,
        }
      },
      lineWidth: 0,
      tickWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: '#A3A3A3',
          fontWeight: 400,
          fontSize: 10,
        }
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      itemStyle: { fontSize: 10 },
      itemDistance: 12,
      symbolWidth: 8,
      symbolHeight: 8,
      floating: true,
      x: 0,
      y: 0,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 1.5,
        borderWidth: 0,
        borderRadius: 0,
        pointWidth: 16,
      }
    },
    series: [{
      name: 'Duration',
      data: [49.9, 71.5, 106.4, 76, 44.0, 13, 35.6, 48.5, 16.4, 94.1, 95.6],
      color: '#04D1FF',
    }, {
      name: 'Trigger',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6],
      color: '#FDE035',
    },]
  }
  
  return (
    <DashboardCard>
      <Typography className={classes.cardTitle}>Events vs triggers</Typography>
      <Box sx={{ maxWidth: 700, pb: 1, mt: 3 }}>
        <ReactHighcharts config={highChartConfig} />
      </Box>
    </DashboardCard>
  );
}

export default DashboardEventCard;
