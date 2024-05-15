import { SPORTS } from "./models";

const API_BASE = "http://localhost:3001";

const getClubsByLocation = async (location: string) => {
  const data = await fetch(`${API_BASE}/clubs/${location}`);
  return data.json();
};

const getClubsByLocationAndSport = async (location: string, sport: SPORTS) => {
  const data = await fetch(`${API_BASE}/clubs/${location}/${SPORTS[sport]}`);
  return data.json();
};

export { getClubsByLocation, getClubsByLocationAndSport };
