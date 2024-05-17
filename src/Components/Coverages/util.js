import get from 'lodash/get';

// Converts users' input from hours into seconds.
const formatTrigger = hours => {
  if (isNaN(parseInt(hours))) {
    return 0;
  }

  return hours * 3600;
}

// Convert to uppercase
const formatCurrency = anycase => {
  return anycase.toUpperCase();
}

// Convert loss ratio from percentage to decimal
const formatLossRatio  = ratio => {
  if (isNaN(ratio)) {
    return 0;
  }

  return ratio/100;
}

/**
 * Parses the coverages object received from server into app-friendly format.
 * @param  {array} coveragesRaw
 * @return {Object}
 */
const parseCoverages = coveragesRaw =>  {
  return coveragesRaw.map(coverageItem => {
    return {
      id: coverageItem.id,
      title: get(coverageItem, 'coverage.condition.monitoringTarget.name'),
      cohortName: get(coverageItem, 'name'),
      trigger: `${get(coverageItem, 'coverage.trigger')}${get(coverageItem, 'coverage.triggerUnit')}`,
      payout: get(coverageItem, 'coverage.minPayout'),
      dataSourceDescription: get(coverageItem, 'coverage.dataSourceDescription'),
      sumInsuredIndividual: get(coverageItem, 'sumInsured'),
      sumInsured: get(coverageItem, 'totalSumInsured'),
      minPayout: get(coverageItem, 'coverage.minPayout'),
      triggerLabel: get(coverageItem, 'coverage.triggerLabel'),
      indexDefinition: get(coverageItem, 'coverage.indexDefinition'),
      quantity: get(coverageItem, 'quantity'),
      pricingUnit: get(coverageItem, 'coverage.triggerUnit'),
      payoutPerUnit: get(coverageItem, 'coverage.payoutPerUnit'),
    };
  });
}

export { formatTrigger, formatCurrency, formatLossRatio, parseCoverages };
