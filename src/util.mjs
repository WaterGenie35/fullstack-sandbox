/**
 * Capitalize the first letter of a string
 * https://stackoverflow.com/a/1026087
 * @param {string} string
 * @returns {string}
 */
export function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
