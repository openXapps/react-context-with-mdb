/**
 * Utility function to create browser cookies
 * @param {string} key - Key name to create
 * @param {string} value - Key value to set
 * @param {string} units - Offset units in m (minutes) h (hours) or d (days)
 * @param {number} offset - Offset number
 */
export const createCookie = (key, value, units, offset) => {
  let d = new Date();
  let err = { name: 'Err', message: '' };
  try {
    // Parameter validation
    if (!(key && value && units && offset)) err = { ...err, message: 'MISSING PARAMS' };
    if (!(units.indexOf('m') || units.indexOf('h') || units.indexOf('d'))) err = { ...err, message: 'UNITS NOT IN RANGE (m, h or d)' };
    if (!(Number.isInteger(offset))) err = { ...err, message: 'OFFSET NOT AN INTEGER' };
    if (err.message) throw err;
    // Cookie offset
    if (units.indexOf('m')) d.setTime(d.getTime() + (offset * 60 * 1000));
    if (units.indexOf('h')) d.setTime(d.getTime() + (offset * 60 * 60 * 1000));
    if (units.indexOf('d')) d.setTime(d.getTime() + (offset * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    // Browser cookie gets set here
    document.cookie = `${key}=${value};expires=${expires};`;
  } catch (e) {
    console.log('Error while creating cookie: ', e.message);
  }
};

/**
 * Utility function to fetch and return a browser cookie value
 * @param {string} key - Key name to look for
 * @returns {string}
 */
export const getCookie = key => {
  let value = '';
  let err = { name: 'Err', message: '' };
  try {
    // Parameter validation
    if (!(key)) throw { ...err, message: 'MISSING PARAMS' };
    // Fetch cookie
    if (document.cookie.split(';').some((item) => item.trim().startsWith(key + '='))) {
      value = document.cookie
        .split('; ')
        .find(row => row.startsWith('test2'))
        .split('=')[1];
    }
    return value;
  } catch (e) {
    console.log('Error while fetching cookie: ', e.message);
    return value;
  }
};

/**
 * Utility function to validate the existance of a browser cookie key
 * @param {string} key - Key name to validate
 * @returns {boolean}
 */
export const validateCookie = key => {
  let validation = false;
  let err = { name: 'Err', message: '' };
  try {
    // Parameter validation
    if (!(key)) throw { ...err, message: 'MISSING PARAMS' };
    // Fetch cookie
    if (document.cookie.split(';').some((item) => item.trim().startsWith(key + '='))) validation = true;
    return validation;
  } catch (e) {
    console.log('Error while validating cookie: ', e.message);
    return validation;
  }
};