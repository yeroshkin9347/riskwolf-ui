const monitoringProperty = {
  overviewCards: [
    {
      value: 723000,
      title: 'Loss Amount',
      amount: 6,
      unit: '$',
      amountLabel: '%',
    },
    {
      value: 72,
      title: 'Loss Ratio',
      titleLabel: '%',
      amount: -0.8,
      amountLabel: '%',
    },
    {
      value: 142,
      title: 'Loss Reports',
      amount: -25,
      amountLabel: '%',
    },
    {
      value: 20000000,
      unit: '$',
      title: 'Total Sum Insured (TSI)',
      amount: 23,
      amountLabel: ' customers',
      hideCaret: true,
    },
  ],
  regions: [
    {
      id: 0,
      lat: -3,
      lng: -44,
      address: 'Region 1',
      events: [
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Deficit Rainfall',
          status: 'Qualifying Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Heat Wave',
          status: 'Expected Loss',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'temperature-rise',
          trigger: 38,
          exit: 68,
          actual: 48,
          index: '5 Consecutive Days > 38°C',
          lossAmount: '$24K',
          unit: '°C'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Tropical Cyclone',
          status: 'Non-Qualifying Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'air',
          trigger: 119,
          exit: 225,
          actual: 110,
          index: 'Wind Speed > 118km/h',
          lossAmount: '$24K',
          unit: 'km/h'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'air',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
      ]
    },
    {
      id: 1,
      lat: -4,
      lng: -42,
      address: 'Region 2',
      events: [
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
      ]
    },
    {
      id: 2,
      lat: -5.4,
      lng: -45.4,
      address: 'Region 3',
      events: [
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Deficit Rainfall',
          status: 'Qualifying Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
      ]
    },
    {
      id: 3,
      lat: -6.8,
      lng: -52.8,
      address: 'Region 4',
      events: [
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'air',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
      ]
    },
    {
      id: 4,
      lat: -7.6,
      lng: -36,
      address: 'Region 5',
      events: [
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Excess Rainfall in Philippines',
          status: 'Detected Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Deficit Rainfall',
          status: 'Qualifying Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'cloud-rain',
          trigger: 150,
          exit: 225,
          actual: 135,
          index: '7 Consecutive days rainfall > Trigger',
          lossAmount: '$24K',
          unit: 'mm'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Heat Wave',
          status: 'Expected Loss',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'temperature-rise',
          trigger: 38,
          exit: 68,
          actual: 48,
          index: '5 Consecutive Days > 38°C',
          lossAmount: '$24K',
          unit: '°C'
        },
        {
          id: 'a940bd56-1604-4feb-81da-377ed818a891',
          title: 'Tropical Cyclone',
          status: 'Non-Qualifying Event',
          createdAt: '2024-01-15T14:04:38.452Z',
          icon: 'air',
          trigger: 119,
          exit: 225,
          actual: 110,
          index: 'Wind Speed > 118km/h',
          lossAmount: '$24K',
          unit: 'km/h'
        },
      ]
    },
  ]
};

module.exports = {
  monitoringProperty
};