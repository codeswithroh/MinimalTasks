export const convertTime24To12 = (time) => {
  let [hours, minutes] = time.split(":");

  if (hours > 12) {
    hours -= 12;
  }

  const ampm = hours < 12 ? "AM" : "PM";

  return `${hours}:${minutes} ${ampm}`;
};
