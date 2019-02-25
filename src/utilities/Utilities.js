export const displayTime = (time) => {
  const milliseconds = time % 1000;
  const seconds = parseInt(time = time/1000)%60;
  const minutes = parseInt(time = time/60)%60;
  const hours = parseInt(time = time/60)%24;
  const days = parseInt(time = time/24);

  return [days, hours, minutes, seconds, milliseconds].join(":");
}