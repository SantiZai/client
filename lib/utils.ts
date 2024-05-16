import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const mapClubTitle = (title: string) =>
  title
    .split("+")
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(" ");
