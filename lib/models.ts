enum USER_TYPES {
  superadmin,
  admin,
  user,
}

export enum SPORTS {
  tennis,
  soccer,
  basketball,
  volley,
  rugby,
}

enum SURFACES {
  clay,
  grass,
  hard,
}

enum SERVICES {
  buffet,
  showers,
  parking,
  grills,
  security,
}

interface Club {
  id: string;
  createdAt: Date;
  name: string;
  image: string;
  location: string;
  address: string;
  courts: Court[];
  admin: User;
  adminId: string;
  sports: SPORTS[];
  services: SERVICES[];
  //TODO: add reputation to the club
}

interface Court {
  id: string;
  createdAt: Date;
  name: string;
  surface: SURFACES;
  lightning: boolean;
  club: Club;
  clubId: string;
  reservations: Reservation[];
  sport: SPORTS;
  // TODO: add price for the court
}

interface Reservation {
  id: string;
  createdAt: Date;
  date: string;
  hour: string;
  isLarge: boolean;
  court: Court;
  courtId: string;
  user: User;
  userId: string;
}

interface User {
  id?: string;
  createdAt?: Date;
  fullname: string;
  email: string;
  phonenumber?: string;
  reservations?: Reservation[];
  userType?: USER_TYPES;
  club?: Club;
}

export type { Club, Court, Reservation, User };
