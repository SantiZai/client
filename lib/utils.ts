import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SPORTS } from "./models";

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
