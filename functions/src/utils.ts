
/** 
 * Some utilities for the functions
*/

/**
 * Capitalizes the first letter of a given string
 */
function capitalizeStringFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export { capitalizeStringFirstLetter };