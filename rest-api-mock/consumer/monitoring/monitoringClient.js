const request = require("superagent");
const { MonitoringData } = require("./monitoring");

const hostname = "127.0.0.1"

const fetchMonitoringData = () => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/monitoring`).then(
    (res) => {
      return new MonitoringData(
        res.body.overviewCards,
        res.body.regions,
      );
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchMonitoringData,
};