const request = require("superagent");
const { Partner } = require("./partner");

const hostname = "127.0.0.1"

const fetchPartners = (queryParams) => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/business-partners`).query(queryParams).then(
    (res) => {
      return {
        ...res.body,
        content: res.body.content.map(o =>
          new Partner(
            o.id,
            o.name,
            o.role,
            o.taxStatus,
            o.contactName,
            o.contactEmailAddress,
            o.contactPhoneNumber,
            o.address
          )
        )
      };
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

const fetchPartnerById = (id) => {
  return request.get(`http://${hostname}:${process.env.API_PORT}/business-partners/${id}`).then(
    (res) => {
      return new Partner(
        res.body.id,
        res.body.name,
        res.body.role,
        res.body.taxStatus,
        res.body.contactName,
        res.body.contactEmailAddress,
        res.body.contactPhoneNumber,
        res.body.address
      );
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

const createPartner = (createPartnerInput) => {
  return request.post(`http://${hostname}:${process.env.API_PORT}/business-partners`, createPartnerInput).then(
    (res) => res.body,
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchPartners,
  fetchPartnerById,
  createPartner,
};
