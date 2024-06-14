import { Club, Court, Reservation } from "./models";

export const generateAllHours = () => {
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

const generateAvailableHoursForCourt = (
  reservations: Reservation[],
  date: string
) => {
  let availableHours = generateAllHours();
  reservations.forEach((reservation) => {
    const index = availableHours.indexOf(reservation.hour);
    if (index == -1) return;
    if (reservation.date != date) return availableHours;
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

const generateClubAvailability = (club: Club, date: string) => {
  if (!club) return {};
  let allHours = generateAllHours();
  let disponibility: any = {};
  club.courts.forEach((court: Court) => {
    disponibility[court.name] = [];
    if (court.reservations.length == 0) {
      disponibility[court.name] = allHours;
    } else {
      disponibility[court.name] = generateAvailableHoursForCourt(
        court.reservations,
        date
      );
    }
  });
  return disponibility;
};

const generateAvailableHoursPerClub = (club: Club, date: string) => {
  let availableHours: string[] = [];
  club.courts.forEach((court) => {
    availableHours = availableHours
      .concat(generateAvailableHoursForCourt(court.reservations, date))
      .sort();
  });
  return Array.from(new Set(availableHours));
};

const verifyDisponibility = (club: Club, hour: string, date: string) => {
  if (!club || !hour) return [];
  let availableCourts: Court[] = [];
  club.courts.forEach((court) => {
    const availableHours = generateAvailableHoursForCourt(
      court.reservations,
      date
    );
    if (availableHours.includes(hour)) {
      availableCourts.push(court);
    }
  });
  return availableCourts;
};

const largeTurnIsPossible = (court: Court, hour: string) => {
  const allHours = generateAllHours();
  const hourIndex = allHours.indexOf(hour);
  let isLargePossible = false;
  if (court.reservations.length <= 0) return true;
  court.reservations.forEach((reservation: Reservation) => {
    const reservationIndex = allHours.indexOf(reservation.hour);
    isLargePossible = reservationIndex - hourIndex != 2;
  });
  return isLargePossible;
};

export {
  generateAvailableHoursForCourt,
  generateAvailableHoursPerClub,
  generateClubAvailability,
  verifyDisponibility,
  largeTurnIsPossible,
};
