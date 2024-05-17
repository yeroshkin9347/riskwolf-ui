import { useTheme } from '@mui/material/styles';

const Link = () => {
  const theme = useTheme();

  return {
    color: theme.palette.alt.main,
  }
}

const LinkPrimary = () => {
  const theme = useTheme();

  return {
    color: theme.palette.alt.main,
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    }
  }
}

export { Link, LinkPrimary };
