import queryString from 'query-string';

/**
 * Returns property of a query string.
 * ?key=property --> 'property'
 * @param  {String} key Queried key
 * @return {String}     Desired property
 */
const queryStr = (key='') => {
  try {
    return queryString.parse(window.location.search)[key];
  } catch (err) {
    return null;
  }
}

export default queryStr;
