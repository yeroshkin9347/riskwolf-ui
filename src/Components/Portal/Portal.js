import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import getPathname from "../../Util/pathname";

// Content
import content from "../../Content/content";

// Components
import Aside from "../Aside/Aside";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import QuoteContainer from "../Quote/QuoteContainer";
import CoverageContainer from "../Coverage/CoverageContainer";
import PolicyContainer from "../Policy/PolicyContainer";
import PolicyDraftContainer from "../Policy/PolicyDraftContainer";
import CoveragesNewContainer from "../Coverages/CoveragesNewContainer";
import Dashboard from "../Dashboard/Dashboard";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HeaderContainer from "../Header/HeaderContainer";
import QuotesContainer from "../Quotes/QuotesContainer";
import PoliciesContainer from "../Policies/PoliciesContainer";
import CoveragesContainer from "../Coverages/CoveragesContainer";
import PartnersContainer from "../Partners/PartnersContainer";
import QuoteNew from "../Quotes/QuoteNew/QuoteNew";
import DataCatalog from "../DataCatalog/DataCatalog";

// Icons
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
// import GroupWorkIcon from "@mui/icons-material/GroupWork";

class Portal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asideActiveIndex: 0,
      drawerIsOpen: true,
      asideMenu: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <DashboardIcon />,
        },
        {
          title: "Data Catalog",
          url: '/data-catalog',
          icon: <ChromeReaderModeIcon />,
        },
        { title: "Coverages", url: "/coverages", icon: <BarChartIcon /> },
        { title: "Quotes", url: "/quotations", icon: <DescriptionIcon /> },
        { title: "Policies", url: "/policies", icon: <FolderIcon /> },
        { title: "Partners", url: "/clients", icon: <PersonIcon /> },
        // {
        //   title: "Payouts",
        //   url: "/payout",
        //   icon: <GroupWorkIcon />,
        //   disabled: true,
        // },
      ],
      modalOpen: false,
      // Dev only!
      policies: new Array(56).fill().map(() => {
        return {
          id: "PAA0001",
          name: "Long name policy",
          activated: "01/01/2021",
          expires: "12/12/2022",
          insured: "4,362,500.00",
          payout: "Lump sum",
          premium: "2.46%",
          status: (() => {
            const random = Math.floor(Math.random() * 100);

            if (random <= 33) {
              return "Draft";
            } else if (random > 33 && random <= 66) {
              return "Active";
            } else if (random > 66 && random <= 100) {
              return "Expired";
            }
          })(),
          claim: (() => {
            const random = Math.floor(Math.random() * 100);

            if (random >= 30) {
              return "-";
            } else {
              return "$";
            }
          })(),
        };
      }),
      // Dev only! ./end
      policiesCards: [
        {
          title: "4",
          content: "Countries with claims",
        },
        {
          title: "12",
          content: "Regions with claims",
        },
        {
          title: "124",
          content: "Active claims",
        },
        {
          title: "$75,000",
          content: "In losses",
        },
      ],
      policiesLoaded: true,
      // Dev only!!!
      partners: new Array(56).fill().map(() => {
        return {
          name: "Client name",
          type: "Data provider",
          email: "email@client.com",
          phone: "00 17388493",
          activity: "04/10/21 13:43",
        };
      }),
      // Dev only!!! ./end
      partnersLoaded: true,
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleAsideClick = this.handleAsideClick.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleAsideClick(index) {
    this.setState({
      asideActiveIndex: index,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  handleModalOpen() {
    this.setState({
      modalOpen: true,
    });
  }

  handleDrawerToggle() {
    this.setState(({ drawerIsOpen }) => ({ drawerIsOpen: !drawerIsOpen }));
  }

  setActiveAside() {
    const pathname = getPathname();

    // Get first level of URI, for example:
    // '/coverages/new' ==> 'coverages'
    const urlFirstLevel = pathname.split("/")[1];

    const activeIndex = this.state.asideMenu.findIndex(
      (menuItem) => menuItem.url.replace("/", "") === urlFirstLevel,
    );

    if (this.state.asideActiveIndex !== activeIndex) {
      this.setState({ asideActiveIndex: activeIndex });
    }
  }

  componentDidMount() {
    this.setActiveAside();
  }

  render() {
    const theme = this.props.theme;

    const mainStyles = {
      base: {
        transition: `width ${theme.transitions.duration.leavingScreen}ms , margin ${theme.transitions.duration.leavingScreen}ms`,
      },
      active: {
        marginLeft: -theme.drawerWidth,
      },
    };

    return (
      <BrowserRouter>
        <HeaderContainer drawerToggle={this.handleDrawerToggle} />
        <main
          className="main"
          style={
            this.state.drawerIsOpen
              ? mainStyles.base
              : { ...mainStyles.base, ...mainStyles.active }
          }
        >
          <Aside
            activeIndex={this.state.asideActiveIndex}
            handleAsideClick={this.handleAsideClick}
            menu={this.state.asideMenu}
            drawerToggle={this.drawerToggle}
            drawerIsOpen={this.state.drawerIsOpen}
            onModalOpen={this.handleModalOpen}
          />
          <Switch>
            <Route
              path="/coverages"
              exact
              component={() => <CoveragesContainer />}
            />
            <Route
              path="/quotations"
              exact
              component={() => <QuotesContainer />}
            />
            <Route
              path="/clients"
              exact
              component={() => <PartnersContainer />}
            />
            <Route
              path="/data-catalog"
              component={DataCatalog}
            />
            <Route path="/quotations/new" component={QuoteNew} />
            <Route
              path="/quotations/quotation/:id"
              component={QuoteContainer}
            />
            <Route path="/policies" exact component={PoliciesContainer} />
            <Route path="/policies/policy/:id" component={PolicyContainer} />
            <Route
              path="/policies/policy-draft/:id"
              component={PolicyDraftContainer}
            />
            <Route
              path="/coverages/coverage/:id"
              component={CoverageContainer}
            />
            <Route path="/coverages/new" component={CoveragesNewContainer} />
            <Route path="/dashboard" component={Dashboard} />
            {/* Default page to re-direct */}
            <Redirect to="/dashboard" />
          </Switch>

          {/* Modal */}
          <Dialog
            open={this.state.modalOpen}
            onClose={this.handleModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Box color={theme.palette.error.main}>
                {content.portal.modal.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {content.portal.modal.content}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleModalClose} color="primary" autoFocus>
                {content.portal.modal.cta}
              </Button>
            </DialogActions>
          </Dialog>
          {/* Modal ./end */}
        </main>
      </BrowserRouter>
    );
  }
}

export default Portal;
