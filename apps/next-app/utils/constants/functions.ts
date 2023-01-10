import moment from 'moment';

export const dateFormater = (start: Date, end: Date): string => {
  const startDate = moment(start).format('DD.MM');
  const endDate = moment(end).format('DD.MM');
  return `${startDate} - ${endDate}`;
};
