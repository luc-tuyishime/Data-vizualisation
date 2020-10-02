export const convertSecondsTodaysOrMinutes = (seconds) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const minutes = Math.floor((seconds % 3600) / 60);

  return days > 0 && days > 1
    ? `${days} days `
    : days > 0 && days === 1
      ? 'day'
      : minutes > 0
        ? minutes + (minutes === 1 ? ' min ' : ' min')
        : '';
};
