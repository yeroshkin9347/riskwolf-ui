import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Strong = props => {
  return <Typography {...props}>
    <Box
      component="span"
      fontWeight="fontWeightBold"
      >{props.children}</Box>
  </Typography>
};

export default Strong;
