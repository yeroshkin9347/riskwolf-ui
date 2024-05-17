class PolicySummary {
  constructor(numberOfClaims, totalPremiumIncome, totalLosses) {
    this.numberOfClaims = numberOfClaims;
    this.totalPremiumIncome = totalPremiumIncome;
    this.totalLosses = totalLosses;
  }
}

module.exports = {
  PolicySummary,
};
