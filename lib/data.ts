const API_BASE = "http://localhost:3001";

const getClubsByLocation = async (location: string) => {
  const data = await fetch(`${API_BASE}/clubs/${location}`);
  return data.json();
};

export { getClubsByLocation };
