export function useCVS(items) {
  let csv = '';
  // Loop the array of objects
  for (let row = 0; row < items.length; row++) {
    let keysAmount = Object.keys(items[row]).length;
    let keysCounter = 0;

    // If this is the first row, generate the headings
    if (row === 0) {

      // Loop each property of the object
      for (let key in items[row]) {

        // This is to not add a comma at the last cell
        // The '\r\n' adds a new line
        csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n' );
        keysCounter++;
      }
    } else {
      for (let key in items[row]) {
        csv += items[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n' );
        keysCounter++;
      }
    }
  }

  return { csv }
}