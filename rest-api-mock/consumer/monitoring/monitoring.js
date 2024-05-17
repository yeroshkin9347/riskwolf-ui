class MonitoringData {
  constructor(overviewCards, regions) {
    this.overviewCards = overviewCards;
    this.regions = regions.map(region => ({
      id: region.id,
      lat: region.lat,
      lng: region.lng,
      address: region.address,
      events: region.events.map(event => ({
        id: event.id,
        title: event.title,
        status: event.status,
        createdAt: event.createdAt,
        icon: event.icon,
        trigger: event.trigger,
        exit: event.exit,
        actual: event.actual,
        index: event.index,
        lossAmount: event.lossAmount,
        unit: event.unit,
      })),
    }));
  }
}

module.exports = {
  MonitoringData,
};