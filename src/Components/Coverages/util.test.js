import { formatTrigger, formatCurrency, formatLossRatio } from './util';

test('Converts hours into seconds: 1 --> 3600', () => {
  expect(formatTrigger(1)).toBe(3600);
});

test('Converts hours into seconds: 2 --> 7200', () => {
  expect(formatTrigger(2)).toBe(7200);
});

test('Converts hours into seconds: string --> 0', () => {
  expect(formatTrigger('someString')).toBe(0);
});

test('Converts currency: usd --> USD', () => {
  expect(formatCurrency('usd')).toBe('USD');
});

test('Converts currency: EUR --> EUR', () => {
  expect(formatCurrency('EUR')).toBe('EUR');
});

test('Loss ratio from percentage to decimal: 65 --> 0.65', () => {
  expect(formatLossRatio(65)).toBe(0.65);
});

test('Loss ratio from percentage to decimal: 0 --> 0', () => {
  expect(formatLossRatio(0)).toBe(0);
});

test('Loss ratio from percentage to decimal: string --> 0', () => {
  expect(formatLossRatio('string')).toBe(0);
});
