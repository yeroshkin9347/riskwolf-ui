// Setting up our test framework
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// We need Pact in order to use it in our test
const { provider } = require("../pact");
const { string, like, number, uuid, regex } = require("@pact-foundation/pact").MatchersV3;

// Importing our system under test (the businessPartnerClient) and our BusinessPartner model
const { Partner } = require("./partner/partner");
const { fetchPartners, fetchPartnerById, createPartner } = require("./partner/partnerClient");
const { partnerProperty, partnerPropertiesResponse } = require("./partner/partnerData");

const { PolicySummary } = require("./policy/policySummary");
const { fetchPolicySummary } = require("./policy/policySummaryClient");
const { policySummaryProperty } = require("./policy/policySummaryData");

const { MonitoringData } = require("./monitoring/monitoring");
const { fetchMonitoringData } = require("./monitoring/monitoringClient");
const { monitoringProperty } = require("./monitoring/monitoringData")

const { Event } = require("./event/event");
const { fetchEventById, inviteUserToEvent } = require("./event/eventClient");
const { eventProperty } = require("./event/eventData");

// This is where we start writing our test
describe("Pact with Partner API", () => {
  describe("given there are partners", () => {
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("there are partners")
          .uponReceiving("a request for partners")
          .withRequest({
            method: "GET",
            path: "/business-partners",
            query: {
              role: string('POLICY_HOLDER'),
              name: string('aza'),
              page: number('0'),
              size: number('10000'),
            },
          })
          .willRespondWith({
            body: like(partnerPropertiesResponse),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });

      it("will receive the list of current partners", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(fetchPartners({
            role: 'POLICY_HOLDER',
            name: 'aza',
            page: '0',
            size: '10000',
          })).to.eventually.have.property('content').deep.members([
            new Partner(
              partnerProperty.id,
              partnerProperty.name,
              partnerProperty.role,
              partnerProperty.taxStatus,
              partnerProperty.contactName,
              partnerProperty.contactEmailAddress,
              partnerProperty.contactPhoneNumber,
              partnerProperty.address
            ),
          ]);
        });
      });
    });
  });

  describe("given there is a partner", () => {
    const partnerId = "a940bd56-1604-4feb-81da-377ed818a891";
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("a partner with ID")
          .uponReceiving("a request to get a partner by ID")
          .withRequest({
            method: "GET",
            path: regex(/^\/business-partners\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, '/business-partners/' + uuid().value),
          })
          .willRespondWith({
            body: like(partnerProperty),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });

      it("will receive the partner", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(fetchPartnerById(partnerId)).to.eventually.have.deep.equal(
            new Partner(
              partnerProperty.id,
              partnerProperty.name,
              partnerProperty.role,
              partnerProperty.taxStatus,
              partnerProperty.contactName,
              partnerProperty.contactEmailAddress,
              partnerProperty.contactPhoneNumber,
              partnerProperty.address
            ),
          );
        });
      });
    });
  });

  describe("create a partner", () => {
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("created business partner")
          .uponReceiving("a request to create a business partner")
          .withRequest({
            method: "POST",
            path: `/business-partners`,
            body: like(partnerProperty)
          })
          .willRespondWith({
            body: like(partnerProperty),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });

      it("will receive the business partner", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(createPartner(partnerProperty)).to.eventually.have.deep.equal(
            new Partner(
              partnerProperty.id,
              partnerProperty.name,
              partnerProperty.role,
              partnerProperty.taxStatus,
              partnerProperty.contactName,
              partnerProperty.contactEmailAddress,
              partnerProperty.contactPhoneNumber,
              partnerProperty.address
            ),
          );
        });
      });
    });
  });
});

// This is where we start writing our test
describe("Pact with Policy summary API", () => {
  describe("given there policy summary", () => {
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("there are policy summary")
          .uponReceiving("a request for policy summary")
          .withRequest({
            method: "GET",
            path: "/policies/summary",
          })
          .willRespondWith({
            body: like(policySummaryProperty),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });
      
      it("will receive the policy summary", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(fetchPolicySummary()).to.eventually.have.deep.equal(
            new PolicySummary(
              policySummaryProperty.numberOfClaims,
              policySummaryProperty.totalPremiumIncome,
              policySummaryProperty.totalLosses,
            ),
          );
        });
      });
    });
  });
});

// This is where we start writing our test
describe("Pact with Monitoring API", () => {
  describe("given there is monitoring data", () => {
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("there is monitoring data")
          .uponReceiving("a request for monitoring data")
          .withRequest({
            method: "GET",
            path: "/monitoring",
          })
          .willRespondWith({
            body: like(monitoringProperty),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });
      
      it("will receive the overview data of monitoring", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(fetchMonitoringData()).to.eventually.have.deep.equal(
            new MonitoringData(
              monitoringProperty.overviewCards,
              monitoringProperty.regions,
            ),
          );
        });
      });
    });
  });
})

// This is where we start writing our test
describe("Pact with Event API", () => {
  describe("given there is a event", () => {
    const eventId = "a940bd56-1604-4feb-81da-377ed818a891";
    describe("when a call to the API is made", () => {
      before(() => {
        provider
          .given("a event with ID")
          .uponReceiving("a request to get a event by ID")
          .withRequest({
            method: "GET",
            path: regex(/^\/events\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, '/events/' + uuid().value),
          })
          .willRespondWith({
            body: like(eventProperty),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
      });

      it("will receive the event", () => {
        return provider.executeTest((mockserver) => {
          process.env.API_PORT = mockserver.port;
          return expect(fetchEventById(eventId)).to.eventually.have.deep.equal(
            new Event(
              eventProperty.coverage,
              eventProperty.lossAmount,
              eventProperty.startDate,
              eventProperty.endDate,
              eventProperty.icon,
              eventProperty.status,
              eventProperty.lossEventHistory,
              eventProperty.recipients,
            ),
          );
        });
      });
    });
  });
})
