class Time {
  static makeHour(units, unitType='seconds') {
    if (unitType.toLowerCase() === 'seconds') {
      return `${units/3600}h`;
    }

    return units;
  }

  /**
   * Adds zero to the date number, for example: 1 => 01
   * @param  {Number} dateNumber
   * @return {String}
   */
  static padDate(dateNumber=0) {
    return String(dateNumber).padStart(2, '0')
  }

  static formatDateForApi(day, month, year) {
    return `${year}-${this.padDate(month+1)}-${this.padDate(day)}T00:00:00Z`;
  }

  /**
   * Converts REST API string date into date,
   * for example: '2022-08-10T07:51:52.983552Z' => '10/08/2022'
   * @param  {Strong} ajaxDate Date in the REST API format.
   * @param  {String} locale   Locale, defaults to 'en-US'
   * @return {Date}
   */
  static getDate(ajaxDate, locale='en-US') {
    try {
      return new Date(ajaxDate).toLocaleString(locale).split(',')[0];
    } catch (err) {
      return null;
    }
  }

  /**
   * Checks if the year is a leap year
   * @param  {integer}  year
   * @return {Boolean}
   */
  static isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    return year % 4 === 0;
  }
}

export default Time;
