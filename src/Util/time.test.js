import Time from './time';

test('isLeapYear: 2004 to true', () => {
  expect(
    Time.isLeapYear(2004)
  ).toBe(true);
});

test('isLeapYear: 2100 to false', () => {
  expect(
    Time.isLeapYear(2100)
  ).toBe(false);
});

test('isLeapYear: 2000 to true', () => {
  expect(
    Time.isLeapYear(2000)
  ).toBe(true);
});

test('isLeapYear: 2001 to false', () => {
  expect(
    Time.isLeapYear(2001)
  ).toBe(false);
});
