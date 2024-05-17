const request = require("superagent");
const { PolicySummary } = require("./policySummary");

const hostname = "127.0.0.1"

const fetchPolicySummary = () => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/policies/summary`).then(
    (res) => {
      return new PolicySummary(
        res.body.numberOfClaims,
        res.body.totalPremiumIncome,
        res.body.totalLosses,
      );
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchPolicySummary,
};
