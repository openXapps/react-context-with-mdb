/**
 * Utility function to create browser cookies
 * @param {string} key - Key name to create
 * @param {string} value - Key value to set
 * @param {string} units - Offset units in m (minutes) h (hours) or d (days)
 * @param {number} offset - Offset number
 * @returns {boolean}
 */
export const createCookie = (key, value, units, offset) => {
  let d = new Date();
  let err = { name: 'Err', message: '' };
  try {
    // Parameter validation
    if (!(key && value && units && offset && offset > 0)) err = { ...err, message: 'MISSING PARAMS' };
    if (!(units === 'm' || units === 'h' || units === 'd')) err = { ...err, message: 'UNITS NOT IN RANGE (m, h or d)' };
    if (!(Number.isInteger(offset))) err = { ...err, message: 'OFFSET NOT AN INTEGER' };
    if (err.message) throw err;
    // Cookie offset
    if (units === 'm') d.setTime(d.getTime() + (offset * 60 * 1000));
    if (units === 'h') d.setTime(d.getTime() + (offset * 60 * 60 * 1000));
    if (units === 'd') d.setTime(d.getTime() + (offset * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    console.log('createCookie: expires...', expires);
    // Browser cookie gets set here
    document.cookie = `${key}=${value};expires=${expires};`;
    return true;
  } catch (e) {
    console.log('Error while creating cookie: ', e.message);
    return false;
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
  const cookieDecoded = decodeURIComponent(document.cookie);
  const cookieArray = cookieDecoded.split(';');
  try {
    // Parameter validation
    if (!(key)) err = { ...err, message: 'MISSING PARAMS' };
    if (err.message) throw err;
    // Fetch cookie
    if (cookieArray.some(item => item.trim().startsWith(key + '='))) {
      value = cookieDecoded
        .split('; ')
        .find(row => row.startsWith(key))
        .split('=')[1];
    }
    // console.log('getCookie: key:value...', key, value);
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
  const cookieArray = decodeURIComponent(document.cookie).split(';');
  try {
    // Parameter validation
    if (!(key)) err = { ...err, message: 'MISSING PARAMS' };
    if (err.message) throw err;
    // Validate cookie existance
    if (cookieArray.some(item => item.trim().startsWith(key + '='))) validation = true;
    return validation;
  } catch (e) {
    console.log('Error while validating cookie: ', e.message);
    return validation;
  }
};