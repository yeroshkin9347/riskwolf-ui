import React, { Component } from 'react';
import CoveragesNew from './CoveragesNew';
import ModalAjaxError from '../Modals/ModalAjaxError';
import queryString from 'query-string';
import Ajax, { GetToken } from '../../Util/ajax';
import {
  formatTrigger,
  formatCurrency,
} from './util';
import { scrollToTop } from '../../Util/helpers';
import Time from '../../Util/time';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import alibarray from 'alib-array';

class CoveargesNewContainer extends Component {
  constructor () {
    super();

    // UI - values are used only to display data in user-friendly way.
    this.state = {
      // Disabled selects
      riskSubTypeDisabled: true,
      dataProviderDisabled: true,
      cityDisabled: true,
      // Disabled selects ./end

      // Opened selects
      dataProviderOpen: false,
      // Opened selects ./end

      // Step: Indexes
      indexesPageActive: 1,
      // Step: Indexes ./end

      // Selected values
      riskMainType: '---',
      riskSubType: '',
      dataProvider: '',
      dataSet: '',
      city: '---',
      eventDefinition: '---',
      coverageType: '',
      indexUnit: '---',
      indexName: '',
      riskPeriodFrom: `${new Date().getFullYear()}-01-01T00:00:00Z`,
      riskPeriodTo: `${new Date().getFullYear()}-12-31T00:00:00Z`,
      lossRatio: 0.65, // hard-coded as requested by the client
      trigger: 0,
      triggerLabel: '',
      triggerComparator: '',
      currency: 'USD', // client requested that default value be 'USD'.
      insuredAmount: 100, // client requested that default value be 100.
      limits: 0,
      amount: 0,
      payoutAmount: 100,
      payoutPerUnitAmount: 0,
      // Selected values ./end

      // Payout Structure
      // Used in the 'Payouts' step to track different payout options.
      payoutStructures: [],
      // Payout Structure ./end

      // User-friendly values
      riskMainTypeOptions: [],
      riskMainTypeUI: '',
      riskSubTypeUI: '',
      dataProviderUI: '',
      dataSetUI: '',
      cityUI: '',
      eventDefinitionUI: '',
      eventDefinitionUiValue: '---',
      coverageTypeUI: 'CapturedEventCondition',
      coverageBeginsUI: '12:00pm',
      localTimeCoverageUI: 'GMT+7',
      payoutTypeUI: 'Lump Sum',
      indexUnitUI: '',
      insuredAmountUI: 0,
      limitsUI: '',
      lossRatioUI: '',
      triggerUI: 0,
      amountUI: '',
      payoutAmountUI: 100,
      pricingUnit: '',
      // User-friendly values ./end

      // Fetched values
      dataProviderNodes: [],
      dataSetNodes: [],
      cityNodes: [],
      eventDefinitionNodes: [],
      coverageTypeNodes:[],
      indexUnitNodes: null,
      // Fetched values ./end

      // Loaders
      backdropOpen: false,
      periodMonthsLoaded: true,
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
      activeStep: 0, // default is zero
      editMode: false,

      ajaxError: false,
      ajaxErrorMessage: '',
      ajaxErrorModalOpen: false,

      // Create new coverage by default. Other option is 'edit'.
      mode: 'new',

      coverageId: null,

      // When editing already existing coverage, its data gets stored here
      // for easy access - not used for creating a new coverage!
      fetchedData: {},
    };

    // CONSTANTS
    this.STEPS = [
      'sources',
      'indexes',
      'payouts',
      'review',
    ];

    this.API = {
      getRiskTypes: `${window.appConfig.apiUrl}/internal/risk-types`,
    };

    // Bindings
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleTextboxChange = this.handleTextboxChange.bind(this);
    this.getDataProvider = this.getDataProvider.bind(this);
    this.getLocation  = this.getLocation.bind(this);
    this.closeBackdrop = this.closeBackdrop.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.setActiveStep = this.setActiveStep.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSimulationStart = this.handleSimulationStart.bind(this);
    this.handleRiskMainTypeChange = this.handleRiskMainTypeChange.bind(this);
    this.handleRiskPeriodChangeFrom = this.handleRiskPeriodChangeFrom.bind(this);
    this.handleRiskPeriodChangeTo = this.handleRiskPeriodChangeTo.bind(this);
    this.handleComboBoxChange = this.handleComboBoxChange.bind(this);
    this.handleAddPayoutStructure = this.handleAddPayoutStructure.bind(this);
    this.handlePayoutStructureBack = this.handlePayoutStructureBack.bind(this);
    this.handlePayoutStructureChange = this.handlePayoutStructureChange.bind(this);
    this.handleIndexDefinitionChange = this.handleIndexDefinitionChange.bind(this);
    this.handleIndexPaginationChange = this.handleIndexPaginationChange.bind(this);
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

  // Check wether step (form) is completed or not. Locks/unlocks 'Next' button.
  isStepCompleted (step) {

    const {
      eventDefinition,
      payoutAmount,
      trigger,
      city } = this.state;

    const isPayoutsCompleted = (payoutAmount, trigger) => {

      if (isNaN(parseInt(payoutAmount)) || isNaN(parseInt(trigger))) {
        return false;
      }
      
      return payoutAmount <= 100 && payoutAmount >= 0 && trigger >= 0;
    };

    switch(step) {
      case 'sources':
        return !!city;
      case 'indexes':
        return eventDefinition && eventDefinition !== '---';
      case 'payouts':
        return !!isPayoutsCompleted(payoutAmount, trigger);
      default:
        return false;
    }
  }

  // This function not only starts a new simulation, but also edits the existing
  // one depending on the edit 'mode' flag.
  handleSimulationStart () {
    // console.log('starting simulation...');
    const URI = this.state.mode === 'edit' ? `${window.appConfig.apiUrl}/internal/coverages/${this.state.coverageId}` : `${window.appConfig.apiUrl}/internal/coverages`;

    /**
     * Create payload to be sent to the server. It could be a brand new
     * coverage, or edited (already exisitng) coverage.
     * @param  {string}     mode - 'edit' to create edit payload, 'null' for new
     * @return {object}     payload - object to be send via PUT command
     */
    const createPayload = mode => {
      if (mode === 'edit') {

        // Original data - before the edits
        const updatedData = {...this.state.fetchedData};

        updatedData.payoutStructure.trigger = formatTrigger(this.state.trigger);
        updatedData.payoutStructure.minPayout.amount = this.state.payoutAmount;
        updatedData.payoutStructure.minPayout.currency = formatCurrency(this.state.currency);
        updatedData.limit.amount = this.state.insuredAmount;
        updatedData.limit.currency = formatCurrency(this.state.currency);
        updatedData.currency = formatCurrency(this.state.currency);

        return updatedData
      }

      // We're creating a new coverage.
      return {
        '@type': 'NewCoverage',
        indexDefinition: this.state.eventDefinition,
        dataSet: this.state.dataSet,
        monitoringTarget: this.state.city,
        expectedLossRatio: 0.65,
        payoutStructure: {
          '@type': 'PayoutStructure',
          trigger: this.state.trigger,
          minPayout: {
            amount: this.state.payoutAmount,
            currency: formatCurrency(this.state.currency)
          },
          payoutPerUnit: this.state.payoutPerUnitAmount ? {
            amount: this.state.payoutPerUnitAmount,
            currency: 'USD', // requested by the client
          } : null,
        },
        currency: formatCurrency(this.state.currency),
        limit: {
            amount: this.state.insuredAmount,
            currency: formatCurrency(this.state.currency)
        },
        start: this.state.riskPeriodFrom,
        end: this.state.riskPeriodTo,
      };
    };

    // Some of the values dispathed need to be hard-coded.
    const payload = createPayload(this.state.mode);

    this.setState({
      backdropOpen: true,
    }, () => {
      GetToken().then(token => {
        // In edit mode, request needs to be of type 'PUT' and not 'POST'
        if (this.state.mode === 'edit') {
          Ajax.putData(URI, payload, token)
          .then(response => {
            this.setState({
              backdropOpen: false,
            }, () => {
              // Re-direct back to coverage listing page.
              window.location.replace('/coverages');
            })
            // console.log('response', response);
          }).catch(error => {
            this.setState({
              backdropOpen: false,
              ajaxError: true,
              ajaxErrorModalOpen: true,
            })
            console.log('error', error);
          });
        // Creating a new coverage
        } else {
          Ajax.postData(URI, payload, token)
          .then(response => {
            this.setState({
              backdropOpen: false,
            }, () => {
              // Re-direct back to coverage listing page.
              window.location.replace('/coverages');
            })
            // console.log('response', response);
          }).catch(error => {
            this.setState({
              backdropOpen: false,
              ajaxError: true,
              ajaxErrorModalOpen: true,
            })
            console.log('error', error);
          });
        }
      });
    });
  }

  getDataProvider () {
    const webRoot = window.appConfig.apiUrl;
    const { riskMainType } = this.state;

    const URI = {
      dataProvider: `${webRoot}/internal/data-catalog/data-providers?riskTypeId=${riskMainType}`,
      indices: `${webRoot}/internal/indices?riskTypeId=${riskMainType}`,

    };

    this.setState({
      backdropOpen: true,
    });

    GetToken().then(token => {
      Ajax.getData(URI.dataProvider, token)
      .then(data => {
        this.setState({
          dataProviderDisabled: false,
          dataProviderOpen: true,
          dataProviderNodes: data,
        }, () => {
          Ajax.getData(URI.indices, token)
          .then(data => {
            this.setState({
              eventDefinitionNodes: data,
            }, () => this.closeBackdrop());
          })

        })
      })
      .catch(error => {
        this.setState({
          ajaxError: true,
          ajaxErrorModalOpen: true,
          backdropOpen: false,
        });
        // Requested by the client.
        console.error(error);
      });
    });
  }

  /**
   * Converts server-formatted risk types into React-readable ones.
   * @param  {Array} responseRiskTypes
   * @return {Array} risk types as value and label
   */
  parseRiskTypes (responseRiskTypes) {
    return responseRiskTypes.map(responseRiskType => {
      return {
        value: responseRiskType.id,
        label: responseRiskType.name,
      }
    });
  }

  handleRiskPeriodChangeFrom(date) {
    const dateFrom = Time.formatDateForApi(date.getDate(), date.getMonth(), date.getFullYear());

    this.setState({
      riskPeriodFrom: dateFrom,
    })
  }

  handleIndexPaginationChange(e, pageNumber) {
    this.setState({
      indexesPageActive: pageNumber,
    })
  }

  handleRiskPeriodChangeTo(date) {
    const dateTo = Time.formatDateForApi(date.getDate(), date.getMonth(), date.getFullYear());

    this.setState({
      riskPeriodTo: dateTo,
    })
  }

  handleRiskPeriodChangeYear(e) {
    const year = parseInt(e.target.value);

    const dateFrom = new Date(this.state.riskPeriodFrom);
    const dateTo = new Date(this.state.riskPeriodTo);

    if (e.target.name === 'yearLeft') {
      if (dateFrom.getFullYear() === dateTo.getFullYear()) {
        this.setState({
          riskPeriodFrom: Time.formatDateForApi(
            dateFrom.getDate(),
            dateFrom.getMonth(),
            year,
          ),
          riskPeriodTo: Time.formatDateForApi(
            dateTo.getDate(),
            dateTo.getMonth(),
            year,
          ),
        })
      } else {
        this.setState({
          riskPeriodFrom: Time.formatDateForApi(
            dateFrom.getDate(),
            dateFrom.getMonth(),
            year,
          )
        })
      }
    } else if (e.target.name === 'yearRight') {
      if (dateFrom.getFullYear() !== dateTo.getFullYear()) {
        this.setState({
          riskPeriodTo: Time.formatDateForApi(
            dateTo.getDate(),
            dateTo.getMonth(),
            year,
          ),
          riskPeriodRightYear: year,
        });
      } else {
        this.setState({
          riskPeriodRightYear: year,
        });
      }
    }
  }

  componentDidMount () {
    const coverageId = window.location.search ? queryString.parse(window.location.search).id : null;

    // Flag to differentiate between new coverage and editing exisitng one.
    const mode = window.location.search ? queryString.parse(window.location.search).mode : null;

    if (mode || coverageId) {
      this.setState({
        mode: mode,
        coverageId: coverageId,
      });
    }

    const date = new Date();

    // First of next month
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);

    const nextMonth = new Date(date);

    // First of next month + 1 year
    date.setFullYear(date.getFullYear() + 1);

    // Minus one day - this actually makes it one year / 365 days.
    date.setDate(date.getDate() - 1);

    const nextYear = new Date(date);

    // Formatted to API structure.
    const riskPeriodFrom = Time.formatDateForApi(
      nextMonth.getDate(),
      nextMonth.getMonth(),
      nextMonth.getFullYear(),
    );
    const riskPeriodTo = Time.formatDateForApi(
      nextYear.getDate(),
      nextYear.getMonth(),
      nextYear.getFullYear(),
    );

    // Get covearge data
    if (coverageId) {
      const URI = `${window.appConfig.apiUrl}/internal/coverages/${coverageId}`;

      this.setState({
        backdropOpen: true,
        activeStep: 2,
        editMode: true,
        prevLocked: true,
        nextLocked: false,
        eventDefinition: coverageId,
      }, () => {
        GetToken().then(token => {
          Ajax.getData(URI, token)
          .then(data => {
            this.setState({
              riskMainType: '',
              riskMainTypeUI: '',
              dataProvider: '',
              dataProviderUI: '',
              dataSet: data.condition.monitoringTarget.dataSet.id,
              dataSetUI: data.condition.monitoringTarget.dataSet.name,
              city: data.condition.monitoringTarget.id.id,
              cityUI: data.condition.monitoringTarget.name,
              riskPeriodFrom: data.condition.validFrom.substring(0, 10),
              insuredAmount: data.limit.amount,
              insuredAmountUI: data.limit.amount,
              currency: data.currency,
              currencyUI: data.currency,
              trigger: data.payoutStructure.trigger,
              triggerUI: data.payoutStructure.trigger,
              payoutAmount: data.payoutStructure.minPayout.amount,
              payoutAmountUI: data.payoutStructure.minPayout.amount,
              lossRatio: data.targetLossRatio,
              lossRatioUI: data.targetLossRatio,
              pricingUnit: data.payoutStructure.pricingUnit.substring(0,3).toLowerCase(),
              fetchedData: data,
            }, () => {this.closeBackdrop(); console.log('edit', data)})
          })
          .catch(error => {
            this.setState({
              ajaxError: true,
              ajaxErrorModalOpen: true,
              backdropOpen: false,
            });
            // Requested by the client.
            console.error(error);
          });
        });
      })
    // Completely new coverage
    } else {
      GetToken().then(token => {
        Ajax.getData(this.API.getRiskTypes, token)
          .then(data => {
           this.setState({
            riskMainTypeOptions: this.parseRiskTypes(data),
            riskPeriodFrom: riskPeriodFrom,
            riskPeriodTo: riskPeriodTo,
           });
          })
          .catch(error => {
            // this.setState({
            //   ajaxError: true,
            //   ajaxErrorModalOpen: true,
            //   backdropOpen: false,
            // });

            // Requested by the client.
            console.error(error);
          });
      });
    }
  }

  getDataSet (id) {
    const { riskMainType } = this.state;
    const URI = `${window.appConfig.apiUrl}/internal/data-catalog/data-providers/${id}/data-sets?riskTypeId=${riskMainType}`;

    this.setState({
      backdropOpen: true,
      dataSetNodes: [],
      dataSet: '',
    }, () => {
      GetToken().then(token => {
        Ajax.getData(URI, token)
          .then(data => {
            this.setState({
              dataSetNodes: data,
            }, () => this.closeBackdrop())
          })
          .catch(error => {
            this.setState({
              ajaxError: true,
              ajaxErrorModalOpen: true,
              backdropOpen: false,
            });
            // Requested by the client.
            console.error(error);
          });
      })
    })
  }

  getLocation () {
    const URI = `${window.appConfig.apiUrl}/internal/data-catalog/data-providers/${this.state.dataProvider}/data-sets/${this.state.dataSet}/monitoring-targets`;

    this.setState({
      backdropOpen: true,
      city: null,
      nextLocked: true,
    }, () => {
      GetToken().then(token => {
        Ajax.getData(URI, token)
          .then(data => {
            this.setState({
              cityDisabled: false,
              cityNodes: data,
            }, this.closeBackdrop())
          })
          .catch(error => {
            this.setState({
              ajaxError: true,
              ajaxErrorModalOpen: true,
              backdropOpen: false,
            });

            // Requested by the client.
            console.error(error);
          });
      });
    });
  }

  getEventDefinition (dataSet, monitoringTargetId) {
    const URI = `${window.appConfig.apiUrl}/internal/conditions?monitoringTargetId=${monitoringTargetId}&dataSetId=${dataSet}`;

    // console.log(
    //   'getEventDefinition ',
    //   'monitoringTargetId: ' + monitoringTargetId,
    //   '// dataSetId: ' + dataSet,
    // );

    this.setState({
      backdropOpen: true,
    }, () => {
      GetToken().then(token => {
        Ajax.getData(URI, token)
          .then(data => {
            this.setState({
              eventDefinitionNodes: data,
              // cityDisabled: false,
              // cityNodes: data,
              nextLocked: false,
            }, this.closeBackdrop())
          })
          .catch(error => {
            this.setState({
              ajaxError: true,
              ajaxErrorModalOpen: true,
              backdropOpen: false,
            });

            // Requested by the client.
            console.error(error);
          });
      });
    });
  }

  handleTextboxChange (e) {
    const target = e.target;
    const name = target.getAttribute('name');
    let value = target.value;

    // Payout - make sure that value is <=100 - client request.
    if (name === 'payoutAmount' && value > 100) {
      value = 100;
    }

    this.setState({
      [name]: value,
      [`${name}UI`]: value,
      pricingUnit: null,
    }, () => this.setState({
      nextLocked: !this.isStepCompleted('payouts'),
    }));
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

    scrollToTop();
  }

  handleNext () {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      prevLocked: prevState.activeStep + 1 < 3  && this.state.editMode ? true : false,
      nextLocked: !this.isStepCompleted(this.STEPS[prevState.activeStep + 1]),
    }));

    scrollToTop();
  }

  handleRiskMainTypeChange (value) {

    // Set risk main type and then request data provider from API.
    this.setState({
      riskMainType: value,
      dataSetNodes: [],
      dataProvider: '---',
      eventDefinition: '---',
      eventDefinitionUiValue: '---',
      indexUnit: '---',
    }, () => {
      this.getDataProvider();
    });
  }

  handleSelectChange (e) {
    const target = e.currentTarget;
    const value = target.value;
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

    if (name === 'riskMainType') {
      this.handleRiskMainTypeChange(value);
    } else if (name === 'dataProvider') {
      this.getDataSet(target.value);
      this.setState({
        dataSet: '',
        city: '',
        cityNodes: [],
        nextLocked: true,
      });
    } else if (name === 'currency') {
      // @TODO: Check if needs to be removed or not.
    }
  }

  handleComboBoxChange (e, value, reason) {
    const id = e.target.id;

    if (id.search(/city/) !== -1 || reason === 'clear') {
      this.setState({
        cityUI: get(value, 'name'),
        city: get(value, 'value'),
        nextLocked: get(value, 'value') ? false : true,
      });
    }
  }

  handleRadioChange (e) {
    this.setState({
      dataSet: e.target.value,
    }, () => this.getLocation());
  }

  handleIndexDefinitionChange (id) {
    const selectedDefinitionNode = this.state.eventDefinitionNodes.find(node => node.id === id);

    const { triggerUnit, triggerLabel, description, triggerComparator } = selectedDefinitionNode;

    this.setState({
      eventDefinition: id,
      indexUnit: triggerUnit,
      triggerDescription: description,
      triggerLabel: `${triggerLabel} (${triggerUnit})`,
      triggerComparator: triggerComparator,
      payoutStructures: [], // clear any previous data
    }, () => {
      this.setState({
        nextLocked: !this.isStepCompleted('indexes'),
      });
    });
  }

  handleAddPayoutStructure (type) {
    const scaffolding = type === 'linear' ? {
      id: uuidv4(),
      type: type,
      trigger: 0,
      payoutAmount: 100,
      perUnit: 0,
    } : {
      id: uuidv4(),
      type: type,
    };

    // At the moment only one is allowed to be added.
    if (this.state.payoutStructures.length < 1) {
      this.setState({
        payoutStructures: [...this.state.payoutStructures, scaffolding],
      });
    }
  }

  handlePayoutStructureBack (id) {
    this.setState({
      payoutPerUnitAmount: 0,
      payoutStructures: [...this.state.payoutStructures].filter(item => item.id !== id),
    });
  }

  handlePayoutStructureChange ({ target }, id, type) {
    const { value, name } = target;
    let payoutStructures = [...this.state.payoutStructures];

    alibarray(payoutStructures)
      .update(
        { id: id },
        {
          [name]: value,
        }
      );

    this.setState({
      payoutStructures: payoutStructures,
    });
  }

  render () {
    return (
      <>
        <CoveragesNew
          onRadioChange={this.handleRadioChange}
          onIndexDefinitionChange={this.handleIndexDefinitionChange}
          handleSelectChange={this.handleSelectChange}
          handleComboBoxChange={this.handleComboBoxChange}
          handleTextboxChange={this.handleTextboxChange}
          handleSliderChange={this.handleSliderChange}
          handleSimulationStart={this.handleSimulationStart}
          onRiskPeriodChangeFrom={this.handleRiskPeriodChangeFrom}
          onRiskPeriodChangeTo={this.handleRiskPeriodChangeTo}
          onAddPayoutStructure={this.handleAddPayoutStructure}
          onPayoutStructureBack = {this.handlePayoutStructureBack}
          onPayoutStructureChange = {this.handlePayoutStructureChange}
          onIndexPaginationChange = {this.handleIndexPaginationChange}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          setActiveStep={this.setActiveStep}
          state={this.state}/>
        {
          this.state.ajaxError ? (
            <ModalAjaxError open={this.state.ajaxErrorModalOpen} handleClose={this.handleModalClose} message={this.state.ajaxErrorMessage}/>
          ) : null
        }
      </>
    );
  }
}

export default CoveargesNewContainer;
