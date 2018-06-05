
/** 
 * Some utilities for the functions
*/

/**
 * Capitalizes the first letter of a given string
 */
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export { capitalizeFirstLetter };