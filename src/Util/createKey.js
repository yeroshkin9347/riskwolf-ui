import md5 from 'md5';

const createKey = (seed, length=7) => {
  return md5(seed).slice(0, length);
};

export default createKey;
