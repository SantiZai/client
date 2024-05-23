import { createStore } from "zustand/vanilla";
import { Reservation } from "@/lib/models";

export type UserState = {
  id: string;
  fullname: string;
  email: string;
  phonenumber: string;
  reservations: Reservation[];
};

export type UserActions = {
  setUser: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: "",
  fullname: "",
  email: "",
  phonenumber: "",
  reservations: [],
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: () =>
      set((state) => ({
        id: state.id,
        fullname: state.fullname,
        email: state.email,
        phonenumber: state.phonenumber,
        reservations: state.reservations,
      })),
  }));
};
