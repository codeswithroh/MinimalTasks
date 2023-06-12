export const convertTime24To12 = (time) => {
  let [hours, minutes] = time.split(":");

  const ampm = hours < 12 ? "AM" : "PM";

  if (hours > 12) {
    hours -= 12;
  }

  return `${hours}:${minutes} ${ampm}`;
};
