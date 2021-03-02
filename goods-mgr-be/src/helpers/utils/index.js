const getYearByTimeStamp = (ts) => {
  const date = new Date(ts);

  console.log(123);
  return date.getFullYear();
}

const getDateByTimeStamp = (ts) => {
  const date = new Date(ts);

  console.log(456);
  return date.getDate();
}

module.exports = {
  getYearByTimeStamp,
  getDateByTimeStamp
};