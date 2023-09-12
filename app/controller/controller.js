export function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  // Create an array of month names
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

  // Get the various date and time components
  const year = currentDate.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because it's zero-based)
  const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure a 2-digit day
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()]; // Get the day of the week abbreviation
  const hours = currentDate.getHours().toString().padStart(2, '0'); // Ensure a 2-digit hour
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Ensure a 2-digit minute
  const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Ensure a 2-digit second

  // Create the formatted date string
  const formattedDate = `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export function convertBytesToKBorMB(bytes) {
  if (bytes < 1024 * 1024) {
    // If bytes are less than 1MB, convert to KB
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    // If bytes are 1MB or higher, convert to MB
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}