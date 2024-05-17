class Format {
  static percentage(number) {
    const fragments = number.toString().split('.');

    return `${fragments[0] === '0' ? '00' : fragments[0]}.${fragments[1]}%`;
  }

  // 0.062 => '6.2%'
  static percentageWrapFormat(number = 1, base = 100) {
    return `${this.number(base * number)}%`;
  }

  /**
   * Convert into localized currency, for example: 150, EUR, de-DE => 150,00 €
   * @param  {Number} number
   * @param  {String} currency
   * @param  {String} region   Defaults to 'de-DE'
   * @return {String}
   */
  static currency(number, currency = 'EUR', region = window.locale) {
    // No number provided - nothing to format.
    if (isNaN(number)) return null;

    return new Intl.NumberFormat(region, { style: 'currency', currency: currency }).format(number);
  }

  static number(number, region = window.locale) {
    return new Intl.NumberFormat(region).format(number);
  }

  static date(date, region = window.locale, options) {
    try {
      return new Intl.DateTimeFormat(region, options).format(new Date(date));
    } catch {
      return 'xxx';
    }
  }
}

export default Format;
