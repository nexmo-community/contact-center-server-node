module.exports = {
  lowercase: (str) => {
    if(str && typeof str === 'string') {
      return str.toLowerCase();
    }
    return '';
  },
  ifeq: (a, b, opts) => {
    if (a === b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  ifneq: (a, b, opts) => {
    if (a !== b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  json: (object) => {
    return JSON.stringify(object, null, 2);
  },
  includes: (array, string, opts) => {
    if (array.includes(string)) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  }
};