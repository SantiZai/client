import { SPORTS, User } from "./models";

const generateFetch = async (url: string, config: {}) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/${url}`,
    config
  );
  return data.json();
};

const GET_CONFIG = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const POST_CONFIG = (fullname: string, email: string) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, email }),
  };
};

/**
 * CLUBS
 */

const getClubsByLocation = async (location: string) =>
  await generateFetch(`clubs/${location}`, GET_CONFIG);

const getClubsByLocationAndSport = async (location: string, sport: SPORTS) =>
  await generateFetch(`clubs/${location}/${SPORTS[sport]}`, GET_CONFIG);

const getClubById = async (id: string) =>
  generateFetch(`clubs/search/${id}`, GET_CONFIG);

/**
 * COURTS
 */

const getCourtsByClubId = async (clubId: string) =>
  await generateFetch(`courts/club/${clubId}`, GET_CONFIG);

const getCourtById = async (id: string) =>
  await generateFetch(`courts/${id}`, GET_CONFIG);

/**
 * USERS
 */

const getUserByEmail = async (email: string) =>
  await generateFetch(`users/${email}`, GET_CONFIG);

const createUser = async (user: User) =>
  await generateFetch("users", POST_CONFIG(user.fullname, user.email));

export {
  getClubsByLocation,
  getClubsByLocationAndSport,
  getClubById,
  getCourtsByClubId,
  getCourtById,
  getUserByEmail,
  createUser,
};
