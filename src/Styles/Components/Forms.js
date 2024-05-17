import { useTheme } from '@mui/material/styles';


const FormControl = () => {
  const theme = useTheme();

  return {
    marginBottom: theme.spacing(3),
    position: 'relative',
  }
}

export { FormControl };
