// CommonJS syntax for Node.js

// Function to format the date to ISO format with UTC offset
const formatDateToISOWithOffset = (eventDate) => {
  const date = new Date(eventDate);
  const isoStringWithOffset = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const formattedDate = isoStringWithOffset.replace("Z", "+00:00");
  return formattedDate;
};

// Function to convert formatted date back to UTC
const formatDateToUTC = (formattedDate) => {
  // Parse the formatted date string to a Date object
  const date = new Date(formattedDate);

  // Convert the date object to a UTC ISO string
  const utcString = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  ).toISOString();

  return utcString; // This will return the date in 'YYYY-MM-DDTHH:mm:ss.sssZ' format
};

module.exports = { formatDateToISOWithOffset, formatDateToUTC };
