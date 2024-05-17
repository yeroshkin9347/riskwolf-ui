import { useTheme } from '@mui/material/styles';

const Slider = () => {
  const theme = useTheme();

  return {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: '#1A1A21',
      '& span': {
        borderRadius: 4,
      }
    },
    '& .MuiTextField-root': {
      maxWidth: 132,
      marginRight: theme.spacing(2),
    },
    '& .MuiSlider-root': {
      maxWidth: 300,
      position: 'relative',
      top: theme.typography.pxToRem(10),
      marginRight: theme.spacing(2),
      '& .MuiSlider-thumb': {
        width: 24,
        height: 24,
        display: 'flex',
        outline: 0,
        position: 'absolute',
        boxSizing: 'border-box',
        transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        alignItems: 'center',
        borderRadius: '50%',
        justifyContent: 'center',
        backgroundColor: theme.palette.indicatorYellow,
      },
      
      '& .MuiSlider-markLabel': {
        display: 'block',
        fontWeight: 700,
        fontSize: 16,
      },
      '& .MuiSlider-rail, & .MuiSlider-track': {
        borderRadius: 4,
        width: '100%',
        height: 8,
        display: 'block',
        position: 'absolute',
      },
      '& .MuiSlider-track': {
        backgroundColor: theme.palette.indicatorYellow,
        border: 'none',
      },
      '& .MuiSlider-rail': {
        backgroundColor: 'currentColor',
        opacity: 0.38,
      },
      '& .MuiSlider-mark': {
        display: 'none',
      }
    },
  }
};

export { Slider };
