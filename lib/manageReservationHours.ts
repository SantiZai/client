import { Club, Court, Reservation } from "./models";

const generateAllHours = () => {
  let hours = [];
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      hours.push(`0${i}:00`);
      hours.push(`0${i}:30`);
    } else {
      hours.push(`${i}:00`);
      hours.push(`${i}:30`);
    }
  }
  return hours;
};

const generateAvailableHoursForCourt = (reservations: Reservation[]) => {
  let availableHours = generateAllHours();
  if (reservations.length <= 0) return availableHours;
  reservations.forEach((reservation: Reservation) => {
    const index = availableHours.indexOf(reservation.hour);
    if (index != -1) return;
    if (reservation.isLarge) {
      const unavailableHours = availableHours.slice(index - 1, index + 3);
      availableHours = availableHours.filter(
        (hour) => !unavailableHours.includes(hour)
      );
    } else {
      const unavailableHours = availableHours.slice(index - 1, index + 2);
      availableHours = availableHours.filter(
        (hour) => !unavailableHours.includes(hour)
      );
    }
  });
  return availableHours;
};

const generateAvailableHoursPerClub = (club: Club) => {
  if (!club.courts) return [];
  let availableHours = generateAllHours();
  club.courts.forEach((court: Court) => {
    availableHours = availableHours.filter((hour) =>
      generateAvailableHoursForCourt(court.reservations).includes(hour)
    );
  });
  return Array.from(new Set(availableHours));
};

export { generateAvailableHoursForCourt, generateAvailableHoursPerClub };
