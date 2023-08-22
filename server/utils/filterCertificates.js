
function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
  }
   
  function isSameMonth(date1, date2) {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }
  
  function isSameYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear();
  }
  
  function isWithinDateRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
  }




// Helper function to check if two dates are in the same week
function isSameWeek(date1, date2) {
    const date1WeekNumber = getISOWeek(date1);
    const date2WeekNumber = getISOWeek(date2);
  
    return date1.getFullYear() === date2.getFullYear() && date1WeekNumber === date2WeekNumber;
  }
  

  function getISOWeek(date) {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 60 * 60 * 1000
  }

  

  module.exports = {
    isSameDay,
    isSameWeek,
    isSameMonth,
    isSameYear,
    isWithinDateRange,
  };