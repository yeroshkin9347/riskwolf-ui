import React, { Component } from 'react';
import QuotesNew from './QuotesNew';
import ModalAjaxError from '../Modals/ModalAjaxError';
import Ajax, { GetToken } from '../../Util/ajax';
import Paginate from '../../Util/paginate';
import get from 'lodash/get';
import validator from 'validator';
import { redirect } from '../../Util/web';

class QuotesNewContainer extends Component {
  constructor () {
    super();

    this.state = {
      // Customer Search
      customerSearchTerm: '',
      customerSearchTermSelected: '',
      customerFound: false,
      customerSearchResults: [],
      customerSearchDropdownOpen: false,
      customerSearchLoading: false,

      // New Customer
      newCustomer: {
        inputFields: [
          {
            id: 'organization-name',
            label: 'Oraganization name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'contact-name',
            label: 'Contact name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'email',
            label: 'Email (contact person)',
            type: 'email',
            error: false,
            value: '',
          },
        ],
        noValidationErrors: false,
        isLoading: false,
      },

      // Quote object (used to create a new quote; sent to server - API).
      // It's intitiated empty, but the server populates it latter.
      newQuote: {
        name: '',
      },

      name: '', // Customer name
      customerId: '',

      // Insure
      // Dummy content used for skeleton
      insureOptions: new Array(6).fill({selected: false}),
      insureOptionsLoaded: false,

      // Coverages
      coveragesRiskTypeSelected: '',
      coveragesRiskTypes: [],
      coveragesSearchDisabled: true,
      coveragesLocationSearchTerm: '',
      coveragesLocationSearchLoading: false,
      coveragesSearchResults: [],
      coveragesSearchByAddress: false,
      coveragesSearchByCoverage: true,

      coverages: [],
      coveragesStage: [],
      coveragesStagePage: 1,
      coveragesSelected: [], // used internaly by the component

      // Customization
      totalSumInsured: 0,

      // Exclusion
      exclusionStageText: '',
      exclusionStageCheckboxes: [],

      // Review
      commission: 0.125,

      // UI
      modalUserCreateOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      formHasChanged: true, //Used to enable/disable the "Save" button.
      // UI ./end

      // Loaders
      backdropOpen: false,
      // Loaders ./end

      // Step completed
      // dataSourcesStep: false,
      // riskSubTypeStep: false,
      // dataProviderStep: false,
      // Step completed ./end

      // Locked next button
      nextLocked: true,
      // Locked prev button
      prevLocked: false,

      // Stepper navigation
      activeStep: 0,
      totalSteps: 4,
      editMode: false,

      ajaxError: false,
      ajaxErrorMessage: '',
      ajaxErrorModalOpen: false,
    };

    // CONSTANTS
    this.STEPS = [
      'basics',
      'coverages',
      'customization',
      'terms',
      'review',
    ];

    // Event binders
    this.setActiveStep = this.setActiveStep.bind(this);
    this.handleCoveragesListPageChange = this.handleCoveragesListPageChange.bind(this);
    this.handleCustomerSearchChange = this.handleCustomerSearchChange.bind(this);
    this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleModalUserNewToggle = this.handleModalUserNewToggle.bind(this);
    this.handleCustomerSearchDropdownClose = this.handleCustomerSearchDropdownClose.bind(this);
    this.handleCustomerSearchClear = this.handleCustomerSearchClear.bind(this);
    this.handleCoveragesRiskTypeChange = this.handleCoveragesRiskTypeChange.bind(this);
    this.handleLocationSearchChange = this.handleLocationSearchChange.bind(this);
    this.handleQuoteSave = this.handleQuoteSave.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleInsuranceCheckboxChange = this.handleInsuranceCheckboxChange.bind(this);
    this.handleCoverageCheckboxChange = this.handleCoverageCheckboxChange.bind(this);
    this.handlePremiumInsuredNumberChange = this.handlePremiumInsuredNumberChange.bind(this);
    this.handleCohortNameChange = this.handleCohortNameChange.bind(this);
    this.handleExclusionCheckboxChange = this.handleExclusionCheckboxChange.bind(this);
    this.handleExlusionOtherChange = this.handleExlusionOtherChange.bind(this);
    this.handleCommissionChange = this.handleCommissionChange.bind(this);
    this.handleCompleteQuotation = this.handleCompleteQuotation.bind(this);
    this.handleQuoteNameChange = this.handleQuoteNameChange.bind(this);
    this.handleNewCustomerInputBlur = this.handleNewCustomerInputBlur.bind(this);
    this.handleNewCustomerInputChange = this.handleNewCustomerInputChange.bind(this);
    this.handleNewCustomerSubmit = this.handleNewCustomerSubmit.bind(this);
    this.handleSumInsuredIndividualChange = this.handleSumInsuredIndividualChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSearchByCoverageChange = this.handleSearchByCoverageChange.bind(this);

    this.endPoint = {
      productivityLoss: 'internal/sum-insured-basis',
      customerName: {
        get: searchTerm => `internal/business-partners?role=POLICY_HOLDER&name=${searchTerm}`
      },
    };

    // Search Flags

    // BASIC INFORMATION
    // Customer Search
    this.searchTimeout = 0;
    this.searchIsLoading = false;

    // COVERAGES
    // Location Search
    this.coveragesLocationSearchTimeout = 0;
    this.coveragesLocationSearchIsLoading = false;
  }

  // Check wether step (form) is completed or not. Locks/unlocks 'Next' button.
  isStepCompleted (step) {
    const state = {...this.state};

    // 'basics'
    if (step === this.STEPS[0]) {
      if (
        get(state, 'customerId')
        && get(state, 'newQuote.sumInsuredBasis.id')
        && get(state, 'newQuote.name')
      ) {
        return true;
      }
    // coverages
    } else if (step === this.STEPS[1]) {
      if (state.coveragesSelected.length > 0) {
        return true;
      }
    // customization
    } else if (step === this.STEPS[2]) {
      let noErrorExists = true;

      if (state.coveragesSelected.length > 0) {
        // Check all of quote items
        state.coveragesSelected.forEach(coverageSelected => {
          const { sumInsured, name } = coverageSelected;

          if (isNaN(sumInsured) || sumInsured <= 0 || name.length < 3) {
            // Error detected somewhere
            noErrorExists = false;
          }
        });

        if (noErrorExists) {
          return true;
        }
      }
      // terms
    } else if (step === this.STEPS[3]) {
      // 3228: UI: New Quotation flow - Screen 4 - Make terms optional
      // Validation was removed as requested by the client.
      return true;
    }

    return false;
  }

  handleSnackbarClose () {
    this.setState({
      snackbarOpen: false,
    })
  }

  // Save Quotation
  handleQuoteSave () {
    const quoteId = this.state.newQuote.id;
    const { name, customerId } = this.state;
    const payload = {
      // '@type': this.state.newQuote['@type'], // Don't use the system provided one.
      '@type': "NewQuote", // hard-coded
      name: this.state.newQuote.name,
      customerId: customerId,
      inceptionDate: this.state.newQuote.inceptionDate,
      expiryDate: this.state.newQuote.expiryDate,
      quoteItems: [...this.state.coveragesSelected.map(coverage => {
        return {
          '@type': "NewQuoteItem",
          coverageId: coverage.id,
          name: coverage.name,
          quantity: coverage.quantity,
          sumInsured: {
            amount: coverage.sumInsured,
            currency: coverage.limit.currency,
          }
        };
      })],
    };

    this.setState({backdropOpen: true, snackbarOpen: false, formHasChanged: false}, () => {
      GetToken().then(token => {
        Ajax.postData(`${window.appConfig.apiUrl}/internal/quotes/${quoteId}`, payload, token)
        .then(data => {
          this.setState({
            backdropOpen: false,
            snackbarOpen: true,
            snackbarMessage: 'Quotation Saved',
            newQuote: data, // Update quote data received from server
          })
        })
        .catch()
      });
    });
  }

  // Complete Quotation
  handleCompleteQuotation() {
    const quoteId = this.state.newQuote.id;
    const { name, customerId } = this.state;
    const URL = `${window.appConfig.apiUrl}/internal/quotes/${quoteId}/create`;
    const payload = {
      // '@type': this.state.newQuote['@type'], // Don't use the system provided one.
      '@type': "NewQuote", // hard-coded
      sumInsuredBasis: this.state.newQuote.sumInsuredBasis.id,
      name: this.state.newQuote.name,
      customerId: customerId,
      inceptionDate: this.state.newQuote.inceptionDate,
      expiryDate: this.state.newQuote.expiryDate,
      quoteItems: [...this.state.coveragesSelected.map(coverage => {
        return {
          '@type': "NewQuoteItem",
          coverageId: coverage.id,
          name: coverage.name,
          description: coverage.name,
          quantity: coverage.quantity,
          sumInsured: {
            amount: coverage.sumInsuredIndividual,
            currency: coverage.limit.currency,
          }
        };
      })],
    };

    // Set backdrop loader to ON
    this.setState({backdropOpen: true,}, () => {
      GetToken().then(token => {
        // Complete Quote (POST request)
        Ajax.postData(URL, payload, token)
        .then(data => {
          // Remove loader
          this.setState({
            backdropOpen: false,
          }, () => {
            // Re-direct back to quotes listing page.
            redirect('/quotations?command=refresh');
          });
        })
        .catch(error => {
          this.setState({
            backdropOpen: false,
            ajaxError: true,
            ajaxErrorModalOpen: true,
          })
        })
      });
    });
  }

  // CUSTOMER =================================================================
  // New Customer
  inputIsInvalid (value, id, fieldIndex, type='text') {
    const validateField = (type, value) => {
      if (value) {
        if (type === 'email') {
          return validator.isEmail(value);
        } else {
          return !validator.isEmpty(value) && value.length >= 3;
        }
      }

      return false;
    }

    // Check if the field input is valid.
    if (!validateField(type, value)) {

      const getErrorMessage = type => {
        if (type === 'email') {
          return 'Email is invalid.';
        } else {
          return 'You must input minimum 3 characters';
        }
      };

      if (fieldIndex >= 0) {
        return getErrorMessage(type);
      }
    }

    // Field is valid.
    return false;
  }

  handleNewCustomerInputChange(event, fieldIndex) {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;

    const errorMessage = this.inputIsInvalid(value, id, fieldIndex);

    const tempState = {...this.state};

    tempState.newCustomer.inputFields[fieldIndex].error = false;
    tempState.newCustomer.inputFields[fieldIndex].helperText = '';
    tempState.newCustomer.inputFields[fieldIndex].value = value;

    this.setState(tempState);
  };

  handleNewCustomerSubmit() {
    let noValidationErrors = true;

    // Go through all the inputs and validate them.
    this.state.newCustomer.inputFields.forEach((inputField, fieldIndex) => {
      const errorMessage = this.inputIsInvalid(inputField.value, inputField.id, fieldIndex, inputField.type);

      // If any of the fields has validation error, flag it.
      if (errorMessage) {
        noValidationErrors = false;
      }
    });

    // All fields passed validation.
    if (noValidationErrors) {
      const URI = `${window.appConfig.apiUrl}/internal/business-partners`;

      const getStagedFieldValue = id => {
        return {...this.state.newCustomer}.inputFields[this.state.newCustomer.inputFields.findIndex(element => element.id === id)].value;
      };

      const name = getStagedFieldValue('contact-name');
      const email = getStagedFieldValue('email');
      const organization = getStagedFieldValue('organization-name');

      const payload = {
        "@type": "BusinessPartner",
        name: organization,
        country:"country",
        role:"POLICY_HOLDER",
        contactName: name,
        contactEmailAddress: email
      };

      this.setState({
        newCustomer:{
          ...this.state.newCustomer,
          isLoading: true,
        }
      }, () => {
        GetToken().then(token => {
          Ajax.postData(URI, payload, token).then(response => {
            const { id, name } = response;

            this.handleCustomerSelect(name);
            this.handleModalUserNewToggle();
            this.setState({
              name: name,
              customerId: id,
              customerSearchTermSelected: name,
              newCustomer: {
                ...this.state.newCustomer,
                isLoading: false,
              },
              newQuote: {
                ...this.state.newQuote,
                policyHolder: {
                  '@type': 'BusinessPartner',
                  'version': 1,
                  'id': id,
                },
              }
            })
          }).catch(error => {
            // this.setState({
            //   ajaxError: true,
            //   ajaxErrorModalOpen: true,
            // })
            this.setState({
              newCustomer: {
                ...this.state.newCustomer,
                isLoading: false,
              }
            })
            console.error('error', error)
          });
        });
      });
    }
  }

  // Validate fields when user input looses focus.
  handleNewCustomerInputBlur(event, fieldIndex) {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;
    const type = event.currentTarget.type;

    const errorMessage = this.inputIsInvalid(value, id, fieldIndex, type);

    const tempState = {...this.state};

    if (!tempState.newCustomer.inputFields[fieldIndex].error && errorMessage) {
      tempState.newCustomer.inputFields[fieldIndex].error = true;
      tempState.newCustomer.inputFields[fieldIndex].helperText = errorMessage;
    } else {
      tempState.newCustomer.inputFields[fieldIndex].value = value;
      tempState.newCustomer.inputFields[fieldIndex].error = false;
      tempState.newCustomer.inputFields[fieldIndex].helperText = '';
    }

    this.setState(tempState)
  }

  // Select customer from the dropdown.
  handleCustomerSelect (customerData=[]) {
    const [name, id] = customerData;

    this.setState({
      name: name,
      customerId: id,
      formHasChanged: true,
      customerSearchTermSelected: name,
      customerSearchDropdownOpen: false,

    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('basics'),
      })
    });
  }

  // Close search dropdown.
  handleCustomerSearchDropdownClose () {
    this.setState({ customerSearchDropdownOpen: false })
  }

  // Close the dropdown and remove both search input and
  // selected customer values.
  handleCustomerSearchClear() {
    this.setState({
      customerSearchDropdownOpen: false,
      customerSearchTerm: '',
      customerSearchTermSelected: '',
      customerId: '',
      name: '',
      newQuote: {
        ...this.state.newQuote,
      },
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('basics'),
      })
    })
  }

  // BASICS ===================================================================
  // Quote Name
  handleQuoteNameChange (event) {
    const value = event.target.value;

    this.setState({
      newQuote: {
        ...this.state.newQuote,
        name: value,
      }
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted(this.STEPS[0]),
      })
    })
  }

  // Customer Search
  handleCustomerSearchChange (event) {
    const value = event.target.value;

    const loadSearchResults = () => {
      GetToken().then(token => {
        Ajax.getData(`${window.appConfig.apiUrl}/${this.endPoint.customerName.get(value)}`, token)
        .then(data => {
          this.searchIsLoading = false;
          this.setState({
            customerFound: data.length ? true : false,
            customerSearchResults: data,
            customerSearchDropdownOpen: value.length ? true : false,
            customerSearchLoading: false,
          })
        }).catch();
      });
    };

    // If there is nothing in the input field, report it
    // straight away.
    if (!value.length) {
      this.setState({
        customerSearchDropdownOpen: false,
        customerSearchTerm: '',
        customerSearchTermSelected: '',
        customerFound: false,
      })
    } else {

      // Cache 'newCustomer' object.
      const updatedNewCustomer = {...this.state.newCustomer};

      // Update value of the 'organization-name' field.
      updatedNewCustomer.inputFields[0].value = value;

      // Update new search input and clear any previously selected
      // customer names.
      this.setState({
        customerSearchTerm: value,
        customerSearchTermSelected: '',
        customerSearchDropdownOpen: false,
        newCustomer: updatedNewCustomer,
      });

      clearTimeout(this.searchTimeout);
      this.searchIsLoading = false;

      // Perform a search only if no previous search is running.
      if (!this.searchIsLoading) {
        this.searchIsLoading = true;
        this.searchTimeout = setTimeout(() => {
          this.setState({customerSearchLoading: true}, () => {
            loadSearchResults();
          });
        }, 500);
      }
    }
  }

  // COVERAGES ================================================================
  // Location Search
  handleLocationSearchChange (event) {
    const target = event.target;
    const value = target.value;

    const loadSearchResults = () => {
      const location = this.state.coveragesLocationSearchTerm;
      const riskTypeId = this.state.coveragesRiskTypeSelected;
      // const URL = 'https://dev.riskwolf.com/internal/coverages?state=active&riskTypeId=ICT_SHOCK&targetName=Paris';
      const URL = `${window.appConfig.apiUrl}/internal/coverages?state=active&riskTypeId=${riskTypeId}&targetName=${location}&page=0&size=10000`;

      GetToken().then(token => {
        Ajax.getData(URL, token)
        .then(data => {
          this.coveragesLocationSearchLoading = false;

          this.setState({
            coveragesStage: Paginate.renderPage(data.content, 10, 1),
            coveragesStagePage: 1,
            coveragesLocationSearchLoading: false,
            coverages: data.content,
            formHasChanged: true,
          });
        }).catch();
      });
    };

    // Update search term regardles of API call
    this.setState({
      coveragesLocationSearchTerm: value,
      newQuote: {
        ...this.state.newQuote,
        quoteItems: [],
      }
    });

    // If search input is not empty
    if (value.trim().length) {
      // Perform a search only if no previous search is running.
      if (!this.coveragesLocationSearchLoading) {
        this.setState({coveragesLocationSearchLoading: true}, () => {
          this.coveragesLocationSearchLoading = true;
          this.coveragesLocationSearchTimeout = setTimeout(loadSearchResults, 1000);
        });
      }
    } else {
      this.setState({
        coverages: [],
        coveragesStage: [],
      })
    }
  }

  // Coverage Search (geoapify)
  handleSearchByCoverageChange (value) {
    const riskTypeId = this.state.coveragesRiskTypeSelected;
    const lat = get(value, 'properties.lat');
    const lon = get(value, 'properties.lon');

    if (lat !== undefined && lon !== undefined) {
      const URL = `${window.appConfig.apiUrl}/internal/coverages/find-by-location?lat=${value.properties.lat}&lon=${value.properties.lon}`;

      this.setState({
        backdropOpen: true
      }, () => {
        GetToken().then(token => {
          Ajax.getData(URL, token)
          .then(data => {
            this.setState({
              backdropOpen: false,
              coveragesStage: Paginate.renderPage(data, 10, 1),
              coveragesStagePage: 1,
              coveragesLocationSearchLoading: false,
              coverages: data,
              formHasChanged: true,
            });
          }).catch();
        });
      });
    } else {
      this.setState({
        coverages: [],
        coveragesStage: [],
      })
    }

    // console.log('api call', URL);
  }
#here
  // Risk Type
  handleCoveragesRiskTypeChange (event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      coveragesRiskTypeSelected: value,
      coveragesSearchDisabled: !value,
      // Reset search term input value
      coveragesLocationSearchTerm: '',
      // Remove any previous results
      coverages: [],
      coveragesStage: [],
      formHasChanged: true,
    });
  }


  handleCoveragesListPageChange (event, value) {
    const stateCopy = {...this.state};

    this.setState({
      coveragesStage: Paginate.renderPage(stateCopy.coverages, 10, value),
      coveragesStagePage: value
    })
  }

  // Check/uncheck coverage
  handleCoverageCheckboxChange(e, data) {
    const {
      id,
      limit,
      title,
      trigger,
      payout,
      selected,
      description,
      start,
      end,
      createdBy,
      createdAt,
      dataSet} = data;
    const payoutValue = payout[0];
    const payoutCurrency = payout[1];
    const limitValue = limit.amount;
    const limitCurrency = limit.currency;
    const isChecked = e.target.checked;
    const tempState = {...this.state};

    const addSelectedCoverage = () => {
      tempState.coveragesSelected.push({
        id: id,
        title: title,
        trigger: trigger,
        description: description,
        dataSet: dataSet,
        quantity: 1, // default value
        sumInsuredIndividual: 100, // default value
        sumInsured: 1 * 100,
        start: start,
        end: end,
        createdBy: createdBy,
        createdAt: createdAt,
        name: `Cohort ${tempState.coveragesSelected.length + 1}`,
        minPayout: {
          value: payoutValue,
          currency: payoutCurrency,
        },
        limit: {
          value: limitValue,
          currency: limitCurrency,
        },
      });
    };

    const coverageSelectedIndex = tempState.coveragesSelected.findIndex(coverage => coverage.id === id);

    // Coverage already added - remove it.
    if (coverageSelectedIndex > -1) {
      tempState.coveragesSelected.splice(coverageSelectedIndex, 1)
    // Selected coverage is not yet added to the list.
    } else {
      addSelectedCoverage();
    }

    this.setState(tempState, () => {
      const totalSumInsured = this.state.coveragesSelected.reduce(
      (previousValue, currentValue) => previousValue + currentValue.sumInsured
      , 0);
      this.setState({
        totalSumInsured: totalSumInsured,
        nextLocked: !this.isStepCompleted('coverages'),
        formHasChanged: true,
      })
    });
  }

  // CUSTOMIZATION ============================================================
  handleSumInsuredIndividualChange (event, data) {
    const value = event.target.value ? parseInt(event.target.value) : 0;
    const id = data.id;

    // Find index of coverages that is having its 'Number of Insured' changed.
    const coveragesSelectedIndex = this.state.coveragesSelected.findIndex(coverage => coverage.id === id);

    const tempCoveragesSelected = [...this.state.coveragesSelected];

    tempCoveragesSelected[coveragesSelectedIndex]['sumInsuredIndividual'] = value;

    // sumInsured = sumInsuredIndividual * numberOfInsured
    const sumInsured = value * tempCoveragesSelected[coveragesSelectedIndex].quantity;

    tempCoveragesSelected[coveragesSelectedIndex].sumInsured = sumInsured;

    // Sum up all insured sums.
    const totalSumInsured = tempCoveragesSelected.reduce(
        (previousValue, currentValue) => previousValue + currentValue.sumInsured
        , 0);

    this.setState({
      totalSumInsured: totalSumInsured,
      coveragesSelected: tempCoveragesSelected,
      formHasChanged: true,
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('customization'),
      })
    });
  }

  handlePremiumInsuredNumberChange (event, data) {
    const target = event.target;
    const value = target.value ? parseInt(target.value) : 0;
    const id = data.id;

    // Find index of coverages that is having its 'Number of Insured' changed.
    const coveragesSelectedIndex = this.state.coveragesSelected.findIndex(coverage => coverage.id === id);

    const tempCoveragesSelected = [...this.state.coveragesSelected];

    tempCoveragesSelected[coveragesSelectedIndex]['quantity'] = value;

    const sumInsuredIndividual = tempCoveragesSelected[coveragesSelectedIndex].sumInsuredIndividual ? tempCoveragesSelected[coveragesSelectedIndex].sumInsuredIndividual : 0;

    // sumInsured = numberOfInsured * sumInsuredIndividual
    const sumInsured = value * sumInsuredIndividual;

    tempCoveragesSelected[coveragesSelectedIndex].sumInsured = sumInsured;

    // Sum up all insured sums.
    const totalSumInsured = tempCoveragesSelected.reduce(
        (previousValue, currentValue) => previousValue + currentValue.sumInsured
        , 0);

    this.setState({
      totalSumInsured: totalSumInsured,
      coveragesSelected: tempCoveragesSelected,
      formHasChanged: true,
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('customization'),
      })
    });
  }

  handleCohortNameChange (event, data) {
    const target = event.target;
    const value = target.value;
    const id = data.id;

    const coveragesSelectedIndex = this.state.coveragesSelected.findIndex(coverageSelected => coverageSelected.id === id);

    const tempCoveragesSelected = [...this.state.coveragesSelected];

    if (coveragesSelectedIndex >= 0) {
      tempCoveragesSelected[coveragesSelectedIndex]['name'] = value;
    }

    this.setState({
      coveragesSelected: tempCoveragesSelected,
      formHasChanged: true,
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('customization'),
      })
    });
  }

  // EXCLUSIONS ===============================================================

  /**
   * Format exclusions into server-friendly format
   * @param  {array} exclusions Exclusions to be formatted
   * @return {string}           Combined exclusions
   */
  formatExclusions (exclusions) {
    // Join with '\\n' characters.
    return exclusions.join('\\n')
  }

  handleExclusionCheckboxChange (event) {
    const target = event.target;
    const value = target.value;
    const checked = target.checked;
    const exclusionCheckboxesTemp = [...this.state.exclusionStageCheckboxes];

    if (checked) {
      exclusionCheckboxesTemp.push(value);

    } else {
      const exclusionIndex = exclusionCheckboxesTemp.findIndex(exclusionItem => exclusionItem === value);

      exclusionCheckboxesTemp.splice(exclusionIndex,1);
    }

    const exclusionsFormatted = this.formatExclusions(exclusionCheckboxesTemp);

    this.setState({
      exclusionStageCheckboxes: exclusionCheckboxesTemp, // save for internal use
      formHasChanged: true,
      newQuote: {
        ...this.state.newQuote,
        exclusions: exclusionsFormatted,
      },
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('terms'),
      });
    });
  }

  handleExlusionOtherChange (event) {
    const target = event.target;
    const value = target.value;

    // Replace '\n' with '\\n'
    const formatNewLines = inputLines => {
      return inputLines.replace(/(?:\r\n|\r|\n)/g, '\\n');
    };

    const exclusionsTemp = [...this.state.exclusionStageCheckboxes, formatNewLines(value)];

    this.setState({
      exclusionStageText: value,
      formHasChanged: true,
      newQuote: {
        ...this.state.newQuote,
        exclusions: this.formatExclusions(exclusionsTemp),
      },
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('terms'),
      });
    });
  }

  // REVIEW ===================================================================

  // Commission
  handleCommissionChange (event, newValue) {

    this.setState({
      commission: newValue, // for internal use
      newQuote: {
        ...this.state.newQuote,
        commission: newValue,
      }
    }, () => {this.setState({
      formHasChanged: true,
    })})
  }

  closeBackdrop() {
    setTimeout(() => {
      this.setState({
        backdropOpen: false,
      })
    }, 300);
  }

  handleModalClose () {
    this.setState({
      ajaxErrorModalOpen: false,
    });
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  componentDidMount () {
    const stateCopy = {...this.state};
    const coverages = this.state.coverages;
    const index = stateCopy.coveragesStagePage;

    // TODO: Requests are serial rather than parallel. Failure in one will
    // break the others down the line. This should be changed eventually.

    // Set backdrop loader to ON
    this.setState({backdropOpen: true,}, () => {
      GetToken().then(token => {
        // Create new quote (POST request)
        // Takes in empty request and returns an object if successful.
        const createQuotePayload = {};

        Ajax.postData(`${window.appConfig.apiUrl}/internal/quotes`, createQuotePayload, token)
        .then(data => {
          data['commission'] = 0.125; // force default value
          data.name = this.state.newQuote.name; // Inject default quote name.
          // Save the newly received 'Quote' object.
          this.setState({
            newQuote: data,
            backdropOpen: false,
          }, () => {
            Ajax.getData(`${window.appConfig.apiUrl}/${this.endPoint.productivityLoss}`, token)
            .then(data => {
              this.setState({
                insureOptions: data,
                insureOptionsLoaded: true,
              }, () => {
                Ajax.getData(`${window.appConfig.apiUrl}/internal/risk-types`, token)
                .then(data => {
                  this.setState({
                    coveragesRiskTypes: data,
                  })
                })
              })
            }).catch();
          })
        })
      });
    });
  }

  handleTextboxChange (e) {
    const target = e.target;
    const name = target.getAttribute('name');

    this.setState({
      [name]: target.value,
      [`${name}UI`]: target.value,
      pricingUnit: null,
    })
  }

  setActiveStep (step) {
    this.setState({
      activeStep: step,
      nextLocked: !this.isStepCompleted(this.STEPS[step]),
    });
  }

  handleBack () {
    this.setState(prevState => ({
      prevLocked: prevState.activeStep - 1 === 2  && this.state.editMode ? true : false,
      activeStep: prevState.activeStep - 1,
      nextLocked: !this.isStepCompleted(this.STEPS[prevState.activeStep - 1]),
    }));

    this.scrollToTop();
  }

  handleNext () {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      nextLocked: !this.isStepCompleted(this.STEPS[prevState.activeStep + 1]),
    }));

    this.scrollToTop();
  }

  // Legacy
  handleSelectChange (e) {
    const target = e.currentTarget;
    const unlock = target.getAttribute('data-unlock');
    const name = target.getAttribute('name');
    const text = target.selectedOptions[0].text;

    this.setState(
      unlock ? (
        {
          [`${unlock}Disabled`]: false,
          [name]: target.value,
          [`${name}UI`]: text,
        }
      ) : {
        [name]: target.value,
        [`${name}UI`]: text,
      })

    if (name === 'riskSubType') {
      this.getDataProvider();
    } else if (name === 'dataProvider') {
      this.getDataSet(target.value);
      this.setState({
        dataSet: '',
        city: '',
        cityNodes: [],
        nextLocked: true,
      });
    } else if (name === 'city' && target.value) {
      this.getEventDefinition(this.state.dataSet, target.value);
    } else if (name === 'eventDefinition' && target.value) {
      this.setState({
        periodMonthsLoaded: false,
      }, () => this.setIndexesValues(target.value));
    } else if (name === 'currency') {

    }
  }


  handleRadioChange (e) {
    const name  = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'coveragesSearchByCoverage' || name === 'coveragesSearchByAddress') {
      this.setState({
        // Reset all.
        coveragesSearchByCoverage: name === 'coveragesSearchByCoverage' || false,
        coveragesSearchByAddress: name === 'coveragesSearchByAddress' || false,
        // Reset search term input value
        coveragesLocationSearchTerm: '',
        // Remove any previous results
        coverages: [],
        coveragesStage: [],
        formHasChanged: true,
      })
    }
    // const text = e.target.parentNode.parentNode.nextElementSibling.innerText;

    // this.setState({
    //   dataSet: e.target.value,
    //   dataSetUI: text,
    // }, () => this.getLocation());
  }

  handleSliderChange (e, value) {
    this.setState({
      lossRatio: value,
    })
  }

  handleInsuranceCheckboxChange (id) {
    // Iterate over the list of insure options and mark the correct one as
    // selected - default is false.
    const insureOptionsUpdate = this.state.insureOptions.map(insureOption => {

      if (insureOption.id === id) {
        return (
          {
            ...insureOption,
            selected: true,
          }
        );
      }

      return (
        {
          ...insureOption,
          selected: false,
        }
      );
    })

    this.setState({
      formHasChanged: true,
      insureOptions: insureOptionsUpdate,
      newQuote: {
        ...this.state.newQuote,
        sumInsuredBasis: {
          '@type': 'SumInsuredBasis',
          'id': id
        }
      },
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('basics'),
      })
    })
  }

  // Legacy
  handleModalUserNewClose (object, reason) {
    if (reason !== 'backdropClick') {
      this.state({
        modalUserCreateOpen: false,
      })
    }
  }

  // Legacy
  handleModalUserNewToggle (flag) {
    if (flag === 'open') {
      this.setState({
        modalUserCreateOpen: true,
      })
    } else {
      this.setState({
        modalUserCreateOpen: false,
      });
    }
  }

  render () {
    return (
      <>
        <QuotesNew
          onCustomerSearchChange={this.handleCustomerSearchChange}
          onCoveragesListPageChange={this.handleCoveragesListPageChange}
          handleRadioChange={this.handleRadioChange}
          handleSelectChange={this.handleSelectChange}
          handleTextboxChange={this.handleTextboxChange}
          handleSliderChange={this.handleSliderChange}
          onModalUserNewToggle={this.handleModalUserNewToggle}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          activeStep={this.state.activeStep}
          totalSteps={this.state.totalSteps}
          setActiveStep={this.setActiveStep}
          nextLocked={this.state.nextLocked}
          prevLocked={this.state.prevLocked}
          editMode={this.state.editMode}
          backdropOpen={this.state.backdropOpen}
          onCustomerSelect={this.handleCustomerSelect}
          // New Customer
          newCustomerInputFields={this.state.newCustomer.inputFields}
          newCustomerIsLoading={this.state.newCustomer.isLoading}
          onNewCustomerInputChange={this.handleNewCustomerInputChange}
          onNewCustomerInputBlur={this.handleNewCustomerInputBlur}
          onNewCustomerSubmit={this.handleNewCustomerSubmit}
          // Quote
          onQuoteSave={this.handleQuoteSave}
          onQuoteNameChange={this.handleQuoteNameChange}
          quoteName={this.state.newQuote.name}
          customerSearchLoading={this.state.customerSearchLoading}
          customerSearchTerm={this.state.customerSearchTerm}
          customerSearchTermSelected={this.state.customerSearchTermSelected}
          customerFound={this.state.customerFound}
          customerSearchResults={this.state.customerSearchResults}
          customerSearchDropdownOpen={this.state.customerSearchDropdownOpen}
          onCustomerSearchClear={this.handleCustomerSearchClear}
          onCustomerSearchDropdownClose={this.handleCustomerSearchDropdownClose}
          // Insurance
          onInsuranceCheckboxChange={this.handleInsuranceCheckboxChange}
          insureOptions={this.state.insureOptions}
          insureOptionsLoaded={this.state.insureOptionsLoaded}
          // Coverages
          coveragesRiskTypes={this.state.coveragesRiskTypes}
          coveragesSearchDisabled={this.state.coveragesSearchDisabled}
          onCoveragesRiskTypeChange={this.handleCoveragesRiskTypeChange}
          onLocationSearchChange={this.handleLocationSearchChange}
          onSearchByCoverageChange={this.handleSearchByCoverageChange}
          coveragesLocationSearchTerm={this.state.coveragesLocationSearchTerm}
          coveragesLocationSearchLoading={this.state.coveragesLocationSearchLoading}
          coveragesSearchResults={this.state.coveragesSearchResults}
          coveragesStagePage={this.state.coveragesStagePage}
          coveragesStage={this.state.coveragesStage}
          coverages={this.state.coverages}
          onCoverageCheckboxChange={this.handleCoverageCheckboxChange}
          coveragesSelected={this.state.coveragesSelected}
          coveragesSearchByAddress={this.state.coveragesSearchByAddress}
          coveragesSearchByCoverage={this.state.coveragesSearchByCoverage}
          // Customization
          onPremiumInsuredNumberChange = {this.handlePremiumInsuredNumberChange}
          onCohortNameChange={this.handleCohortNameChange}
          onSumInsuredIndividualChange={this.handleSumInsuredIndividualChange}
          totalSumInsured={this.state.totalSumInsured}
          // Exclusions
          onExclusionCheckboxChange = {this.handleExclusionCheckboxChange}
          onExlusionOtherChange = {this.handleExlusionOtherChange}
          exclusionStageCheckboxes = {this.state.exclusionStageCheckboxes}
          exclusionStageText = {this.state.exclusionStageText}
          // Review
          commission={this.state.commission}
          onHandleCommisionChange = {this.handleCommissionChange}
          // UI
          modalUserCreateOpen={this.state.modalUserCreateOpen}
          snackbarOpen={this.state.snackbarOpen}
          snackbarMessage={this.state.snackbarMessage}
          onSnackbarClose={this.handleSnackbarClose}
          formHasChanged={this.state.formHasChanged}
          // Complete Quotation
          onCompleteQuotation={this.handleCompleteQuotation}
          />

        {
          this.state.ajaxError ? (
            <ModalAjaxError open={this.state.ajaxErrorModalOpen} handleClose={this.handleModalClose} message={this.state.ajaxErrorMessage}/>
          ) : null
        }
      </>
    );
  }
}

export default QuotesNewContainer;
