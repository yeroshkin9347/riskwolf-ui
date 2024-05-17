import truncate from 'truncate';

class String {
  static capitalize(word='') {
    return word
      .toLowerCase()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase());
  }

  static Truncate(word, length=12) {
    return truncate(word, length);
  }
}

export default String;
