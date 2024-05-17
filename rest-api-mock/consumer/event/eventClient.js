const request = require("superagent");
const { Event } = require("./event");

const hostname = "127.0.0.1"

const fetchEventById = (id) => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/events/${id}`).then(
    (res) => {
      return new Event(
        res.body.coverage,
        res.body.lossAmount,
        res.body.startDate,
        res.body.endDate,
        res.body.icon,
        res.body.status,
        res.body.lossEventHistory,
        res.body.recipients,
      );
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

const inviteUserToEvent = (id, email) => {
  return request.post(`http://${hostname}:${process.env.API_PORT}/events/invite`, {eventId: id, email}).then(
    (res) => res.body,
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
}

module.exports = {
  fetchEventById,
  inviteUserToEvent,
};