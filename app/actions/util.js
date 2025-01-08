export function getUserClass(miles) {
  // miles = Math.floor(miles);
  if (miles >= 100000) {
    return "Gold";
  } else if (miles >= 50000) {
    return "Silver";
  } else if (miles >= 10000) {
    return "Green";
  } else {
    return "None";
  }
}
