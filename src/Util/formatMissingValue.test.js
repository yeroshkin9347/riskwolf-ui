import formatMissingValue from './formatMissingValue';

test('formatMissingValue: "Hello" to "Hello"', () => {
  expect(
    formatMissingValue('Hello')
  ).toBe('Hello');
});

test('formatMissingValue: null to "---"', () => {
  expect(
    formatMissingValue(null)
  ).toBe('---');
});

test('formatMissingValue: "" to "---"', () => {
  expect(
    formatMissingValue('')
  ).toBe('---');
});

test('formatMissingValue: 5 to 5', () => {
  expect(
    formatMissingValue(5)
  ).toBe(5);
});

test('formatMissingValue: 0 to 0', () => {
  expect(
    formatMissingValue(0)
  ).toBe(0);
});

test('formatMissingValue: -1 to -1', () => {
  expect(
    formatMissingValue(-1)
  ).toBe(-1);
});

test('formatMissingValue: false to "---"', () => {
  expect(
    formatMissingValue(false)
  ).toBe('---');
});

