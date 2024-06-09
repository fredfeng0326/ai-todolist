export const getFullDate = (date: string): string => {
  const dateAndTime = date.split('T');

  return dateAndTime[0].split('-').reverse().join('-') + ' ' + dateAndTime[1].split(':').slice(0, 2).join(':');
};
