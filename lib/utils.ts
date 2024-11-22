import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SERVICES, SPORTS } from './models';
import { parse } from 'date-fns';

/*
 * SHADCN UTILS
 */

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/*
 * DATES AND HOURS
 */
export const parseDate = (date: string) =>
  parse(date, 'dd-MM-yyyy', new Date());

export const getHourFinish = (hour: string, isLarge: boolean) => {
  const [prevHour, prevMinutes] = hour.split(':');
  const hourNumber = Number(prevHour);
  const minutesNumber = Number(prevMinutes);
  if (!isLarge) {
    if (hourNumber < 9) return `0${hourNumber + 1}:${prevMinutes}`;
    if (hourNumber < 24) return `${hourNumber + 1}:${prevMinutes}`;
    else return `00:${prevMinutes}`;
  } else {
    if (hourNumber < 9 && minutesNumber < 30) return `0${hourNumber + 1}:30`;
    if (hourNumber < 24 && minutesNumber < 30) return `${hourNumber + 1}:30`;
    if (hourNumber < 8 && minutesNumber > 0) return `0${hourNumber + 2}:00`;
    if (hourNumber < 24 && minutesNumber > 0) return `${hourNumber + 2}:00`;
    else return `00:30`;
  }
};

/*
 * MAP NAMES
 */

export const capitalize = (str: string) =>
  str
    .split(' ')
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(' ');

export const mapClubTitle = (title: string) =>
  title
    .split('+')
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(' ');

export const mapClubLocation = (location: string) =>
  location
    .split(',')
    .map((each) => each.split('+').join(' '))
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(', ');

export const mapQueryClubLocation = (location: string) =>
  location
    .split(',')
    .map((each) => each.trim().split(' ').join('+').toLowerCase())
    .join(',');

export const mapSport = (sport: SPORTS) => {
  switch (sport) {
    case SPORTS.tennis:
      return 'Tenis';
    case SPORTS.soccer:
      return 'Fútbol';
    default:
      return 'Tenis';
  }
};

export const mapService = (service: SERVICES) => {
  switch (service) {
    case SERVICES.buffet:
      return 'Buffet';
    case SERVICES.showers:
      return 'Vestuario';
    case SERVICES.parking:
      return 'Estacionamiento';
    case SERVICES.grills:
      return 'Parrillas';
    case SERVICES.security:
      return 'Seguridad';
  }
};

/*
 * TRANSFORM COORDS
 */

const transformCoord = (coord: string) => {
  const coordDegree = Math.abs(Number(coord.split('.')[0]));
  const coordMinutes = String(Number(`0.${coord.split('.')[1]}`) * 60);
  const coordSeconds = Number(`0.${coordMinutes.split('.')[1]}`) * 60;
  return `${coordDegree}°${coordMinutes.split('.')[0]}'${coordSeconds.toFixed(
    4
  )}"`;
};

export const transformCoords = (coords: string) => {
  const lat = coords.split(',')[0];
  const lng = coords.split(',')[1];
  const yCardinal = Number(lat) < 0 ? 'S' : 'N';
  const xCardinal = Number(lng) < 0 ? 'W' : 'E';
  const transformedLat = transformCoord(lat) + yCardinal;
  const transformedLng = transformCoord(lng) + xCardinal;
  return `${transformedLat}+${transformedLng}`;
};
