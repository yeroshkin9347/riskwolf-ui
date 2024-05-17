import React from "react";

import Portal from "./Components/Portal/Portal";
import Login from "./Components/Login/Login";

// Styles
import "./app.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// Azure login
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

// Context
import ContextTheme from "./Contexts/Theme";

const queryClient = new QueryClient();

const App = () => {
  const theme = createTheme(adaptV4Theme({
    props: {
      MuiButtonBase: {
        // No more elevation, in the entire application!
        disableElevation: true,
      },
      MuiLink: {
        underline: 'hover',
      }
    },
    typography: {
      fontFamily: "Open Sans, sans-serif",
      allVariants: {
        color: "#1A1A21",
      },
    },
    palette: {
      primary: {
        main: "#1A1A21",
      },
      secondary: {
        main: "#FFE034",
      },
      alt: {
        main: "#2C98F0",
      },
      success: {
        main: "#31D158",
      },
      text: {
        primary: "#1A1A21",
        hint: "rgba(0, 0, 0, 0.38)",
      },
      border: "#DFE0EB",
      stripe: "#F6F9FD",
      simulated: "#5AAFFA",
      created: "#FFE034",
      simulatedLight: "#DDF0FF",
      running: "#FFE034",
      runningLight: "#FFF9D6",
      activated: "#31D158",
      divider: "#d2d2d2",
      indicatorGreen: "#31D158",
      indicatorGreenLight: "#DEFFE5",
      indicatorBlue: "#5AAFFA",
      indicatorYellow: "#ffe034",
      indicatorRed: "#F44336",
      indicatorRedLight: "#FFA1A1",
      indicatorGrey: "rgba(0, 0, 0, 0.12)",
      indicatorOrange: "#F4A836",
      indicatorGreyLight: "#EDEDED",
    },
    drawerWidth: 222,
    shape: {
      borderRadiusLg: 8,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    }
  }));
  
  const cache = createCache({
    key: 'css',
    prepend: true,
  });

  theme.overrides = {
    MuiOutlinedInput: {
      [outlinedInputClasses.notchedOutline]: { borderColor: theme.palette.action.active },
      inputMarginDense: { paddingTop: "8.5px", paddingBottom: "8.5px" },
    },
    // All the sliders in the app!
    MuiSlider: {
      root: {
        height: 8,
      },
      markLabel: {
        display: "none",
      },
      valueLabel: {
        fontSize: theme.typography.pxToRem(16),
        transform: "none",
        marginTop: "4px",
        left: "calc(-50% - 6px)",
        fontWeight: "bold",
        "& > span": {
          transform: "none",
          borderradius: "3px",
          height: theme.typography.pxToRem(28),
          width: theme.typography.pxToRem(62),
          // Triangle
          "&::after": {
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "8px 10px 0 10px",
            borderColor: "transparent transparent transparent transparent",
            borderTopColor: theme.palette.primary.main,
            content: '""',
            display: "block",
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translate(-50%)",
          },
          "& > span": {
            transform: "none",
          },
        },
      },
      track: {
        height: theme.spacing(1),
        borderradius: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.main,
      },
      rail: {
        height: theme.spacing(1),
        borderradius: theme.spacing(0.5),
      },
      mark: {
        display: "none",
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: theme.palette.secondary.main,
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
          boxShadow: "inherit",
        },
      },
    },
    MuiDivider: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.orientation === 'vertical' && ownerState.variant === 'middle' && {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        }),
      })
    },
    MuiPaper: {
      root: {
        backgroundImage: 'unset',
      },
    },
    MuiFormLabel: {
      root: {
        color: theme.palette.primary.main,
        lineHeight: 1.375,
        marginBottom: 12,
      },
    },
    body: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
  };

  // Only in development mode.
  if (process.env.NODE_ENV === "development") {
    window.theme = theme;
  }

  const themeProperties = {
    locale: navigator.language,
  };

  // Declare global var to be used instead of context. It's easier to reference
  // and this value does not really change.
  window.locale = navigator.language || 'de-DE';

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <AuthenticatedTemplate>
              <ContextTheme.Provider value={themeProperties}>
                <Portal theme={theme} />
              </ContextTheme.Provider>
            </AuthenticatedTemplate>
  
            <UnauthenticatedTemplate>
              <Login />
            </UnauthenticatedTemplate>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
