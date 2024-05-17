const { eachLike } = require("@pact-foundation/pact").MatchersV3;

const partnerProperty = {
    id: '63ba3516-e29d-48f4-a0e5-3e317116b5f1',
    name: 'azaa',
    role: 'POLICY_HOLDER',
    taxStatus: 'n/a',
    contactName: 'dash',
    contactEmailAddress: 'dash@pa.com',
    contactPhoneNumber: '1234556',
    address: {
        '@type': 'Address',
        houseNumber: null,
        street: null,
        postcode: '414003',
        city: null,
        district: null,
        county: 'Ahmednagar',
        state: 'Maharashtra',
        stateCode: 'MH',
        country: 'India',
        countryCode: 'in',
    },
};

const partnerPropertiesResponse = {
    content: eachLike(partnerProperty),
    pageable: {
        sort: {
            sorted: true,
            unsorted: false,
            empty: false,
        },
        pageNumber: 0,
        pageSize: 10000,
        offset: 0,
        paged: true,
        unpaged: false,
    },
    totalPages: 1,
    totalElements: 2,
    last: true,
    numberOfElements: 2,
    first: true,
    size: 10000,
    number: 0,
    sort: {
        sorted: true,
        unsorted: false,
        empty: false,
    },
    empty: false,
};

module.exports = {
    partnerProperty,
    partnerPropertiesResponse,
};
