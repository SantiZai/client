import { SPORTS } from "./models";

const generateFetch = async (url: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${url}`);
  return data.json();
};

/**
 * CLUBS
 */

const getClubsByLocation = async (location: string) =>
  await generateFetch(`clubs/${location}`);

const getClubsByLocationAndSport = async (location: string, sport: SPORTS) =>
  await generateFetch(`clubs/${location}/${SPORTS[sport]}`);

const getClubById = async (id: string) => generateFetch(`clubs/search/${id}`);

/**
 * COURTS
 */

const getCourtsByClubId = async (clubId: string) =>
  await generateFetch(`courts/club/${clubId}`);

const getCourtById = async (id: string) => await generateFetch(`courts/${id}`);

export {
  getClubsByLocation,
  getClubsByLocationAndSport,
  getClubById,
  getCourtsByClubId,
  getCourtById,
};
