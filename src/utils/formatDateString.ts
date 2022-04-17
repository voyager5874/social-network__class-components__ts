export const formatDateString = (dateString: string) => {
  const msec = Date.parse(dateString);
  const date = new Date(msec);
  const stringTime = date.toLocaleTimeString();
  const stringDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return { date: stringDate, time: stringTime };
};
