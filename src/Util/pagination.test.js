import Paginate from './paginate';

test('Total page number (9/3)', () => {
  expect(
    Paginate.getTotalPages([...new Array(9)], 3)
  ).toBe(3);
});

test('Total page number (5/3)', () => {
  expect(
    Paginate.getTotalPages([...new Array(5)], 3)
  ).toBe(2);
});

test('Total page number (2/3)', () => {
  expect(
    Paginate.getTotalPages([...new Array(2)], 3)
  ).toBe(1);
});

test('Show page content', () => {
  expect(
    Paginate.renderPage([1, 2, 3, 4, 5, 6, 7], 3, 1)
  ).toEqual([1, 2, 3]);
});

test('Show page content', () => {
  expect(
    Paginate.renderPage([1, 2, 3, 4, 5, 6, 7], 3, 2)
  ).toEqual([4, 5, 6]);
});

test('Show page content', () => {
  expect(
    Paginate.renderPage([1, 2, 3, 4, 5, 6, 7], 3, 3)
  ).toEqual([7]);
});
