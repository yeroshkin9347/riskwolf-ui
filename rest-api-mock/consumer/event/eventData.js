const eventProperty = {
  coverage: {
    title: 'Unseasonal Excess Rainfall',
    description: 'Objective of the cover is to protect against insufficient exposure to low temperatures required to break dormancy',
    tags: ['apple', 'dormancy', 'chill'],
    type: 'Excess Rainfall',
    start: '2024-01-01T00:00:00.000+00:00',
    end: '2024-12-31T00:00:00.000+00:00',
    maxPayout: '250$',
    dataSource: 'www.IMD.com',
    indexHistory: [{
      year: 2012,
      value: 0.31,
    }, {
      year: 2013,
      value: 0.18,
    }, {
      year: 2014,
      value: 0.37,
    }, {
      year: 2015,
      value: 0.22,
    }, {
      year: 2016,
      value: 0.25,
    }]
  },
  icon: 'cloud-rain',
  lossAmount: 24000,
  startDate: '2023-04-22T22:00:00.000Z',
  endDate: '2023-10-22T22:00:00.000Z',
  status: 'Qualifying Event',
  lossEventHistory: [
    {
      date: Date.UTC(2023, 10, 19),
      cumulative: 0,
      exit: 0,
      trigger: 0,
    },
    {
      date: Date.UTC(2023, 10, 20),
      cumulative: 5,
      exit: 25,
      trigger: 15,
    },
    {
      date: Date.UTC(2023, 10, 21),
      cumulative: 17,
      exit: 37,
      trigger: 27,
    },
    {
      date: Date.UTC(2023, 10, 22),
      cumulative: 21,
      exit: 33,
      trigger: 23,
    },
    {
      date: Date.UTC(2023, 10, 23),
      cumulative: 25,
      exit: 36,
      trigger: 37,
    },
    {
      date: Date.UTC(2023, 10, 24),
      cumulative: 31,
      exit: 39,
      trigger: 41,
    },
    {
      date: Date.UTC(2023, 10, 25),
      cumulative: 38,
      exit: 42,
      trigger: 43,
    },
    {
      date: Date.UTC(2023, 10, 26),
      cumulative: 39,
      exit: 46,
      trigger: 41,
    },
    {
      date: Date.UTC(2023, 10, 27),
      cumulative: 43,
      exit: 44,
      trigger: 45,
    },
    {
      date: Date.UTC(2023, 10, 28),
      cumulative: 54,
      exit: 59,
      trigger: 51,
    },
    {
      date: Date.UTC(2023, 10, 29),
      cumulative: 61,
      exit: 68,
      trigger: 71,
    },
    {
      date: Date.UTC(2023, 10, ),
      cumulative: 78,
      exit: 98,
      trigger: 93,
    },
  ],
  recipients: [
    {
      id: 0,
      avatar: '',
      name: 'Will Smith',
      email: 'will.smith@gmail.com',
      status: 'Approved',
    },
    {
      id: 1,
      avatar: '',
      name: 'Will Smith',
      email: 'will.smith@gmail.com',
      status: 'Canceled',
    },
    {
      id: 2,
      avatar: '',
      name: 'Will Smith',
      email: 'will.smith@gmail.com',
      status: 'Pending',
    },
  ]
};

module.exports = {
  eventProperty
};