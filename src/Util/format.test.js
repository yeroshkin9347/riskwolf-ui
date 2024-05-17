import Format from './format';

test('percentageWrapFormat: 0.5 to 50%', () => {
  expect(
    Format.percentageWrapFormat(0.5)
  ).toBe('50%');
});

test(`percentageWrapFormat: '0.33' to 33%`, () => {
  expect(
    Format.percentageWrapFormat('0.33')
  ).toBe('33%');
});

test('percentageWrapFormat: 1 to 100%', () => {
  expect(
    Format.percentageWrapFormat(1)
  ).toBe('100%');
});

test('percentageWrapFormat: 0 to 0%', () => {
  expect(
    Format.percentageWrapFormat(0)
  ).toBe('0%');
});

test('percentageWrapFormat: undefined to 100%', () => {
  expect(
    Format.percentageWrapFormat()
  ).toBe('100%');
});

test('percentageWrapFormat: 0.065 to 6.5%', () => {
  expect(
    Format.percentageWrapFormat(0.065)
  ).toBe('6,5%');
});
