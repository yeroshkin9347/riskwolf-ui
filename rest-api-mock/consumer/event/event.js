class Event {
  constructor(coverage, lossAmount, startDate, endDate, icon, status, lossEventHistory, recipients) {
    this.coverage = {
      title: coverage.title,
      description: coverage.description,
      tags: coverage.tags,
      type: coverage.type,
      start: coverage.start,
      end: coverage.end,
      maxPayout: coverage.maxPayout,
      dataSource: coverage.dataSource,
      indexHistory: coverage.indexHistory,
    };
    this.lossAmount = lossAmount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.icon = icon;
    this.status = status;
    this.lossEventHistory = lossEventHistory;
    this.recipients = recipients;
  }
}

module.exports = {
  Event,
};