const formatMissingValue = input => {
  if (input === 0) return input;

  return input || '---';
};

export default formatMissingValue;
