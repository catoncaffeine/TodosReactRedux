window.helpers = (function () {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "WhyAreYouWorkingDay", "SadTomorrowIsMondayDay"];
  function findById(array, id, cb) {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
  }

  function millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      pad(hours.toString(), 2),
      pad(minutes.toString(), 2),
      pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
  }

  function pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  function formatDateMMDDYYYY(dateInt) {
      if(dateInt) {
          const formattedDate = new Date(dateInt);
          return (formattedDate.getMonth() + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear());
      } else {
          return "";
      }
  }

  function formatTimeHHMM(date) {
      if(date instanceof Date) {
          return date.toLocaleTimeString()
      } else {
          return "";
      }
  }

  function formatDateWDMMDDYYYY(date) {
      if(date instanceof Date) {
          return weekdays[date.getDay()] + ", " + date.toDateString();
      } else {
          return "";
      }
  }

  return {
    millisecondsToHuman,
    findById,
    formatDateMMDDYYYY,
    formatTimeHHMM,
    formatDateWDMMDDYYYY
  };
}());
