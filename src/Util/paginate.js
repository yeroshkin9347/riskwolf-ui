/**
 * Paginate, v0.0.1
 */
class Paginate {
  /**
   * Returns total number of pages based on total number of items and number of
   * items each page should hold.
   * @param  {Array}  items     Items to be paginated.
   * @param  {Number} pageItems Number of items per page.
   * @return {Number}           Number of pages.
   */
  static getTotalPages(items=[], pageItems=5) {
    return Math.ceil(items.length/pageItems);
  }

  /**
   * Return certain number of array items that correspond to a page.
   * @param  {Array}  items     All items.
   * @param  {Number} pageItems Number of items per page.
   * @param  {Number} page      Active page number.
   * @return {Array}            Filtered out items on page.
   */
  static renderPage(items=[], pageItems=5, page=1) {
    const start = page < 1 ? 1 * pageItems : (page - 1) * pageItems;
    const end = page * pageItems;

    return items.slice(start, end);
  }
}

export default Paginate;
