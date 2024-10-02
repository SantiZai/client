import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SERVICES, SPORTS } from "./models";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const mapClubTitle = (title: string) =>
  title
    .split("+")
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(" ");

export const mapClubLocation = (location: string) =>
  location
    .split(",")
    .map((each) => each.split("+").join(" "))
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(", ");

export const mapSport = (sport: SPORTS) => {
  switch (sport) {
    case SPORTS.tennis:
      return "Tenis";
    case SPORTS.soccer:
      return "Fútbol";
    default:
      return "Tenis";
  }
};

export const mapService = (service: SERVICES) => {
  switch (service) {
    case SERVICES.buffet:
      return "Buffet";
    case SERVICES.showers:
      return "Vestuario";
    case SERVICES.parking:
      return "Estacionamiento";
    case SERVICES.grills:
      return "Parrillas";
    case SERVICES.security:
      return "Seguridad";
  }
}
