import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Address } from "../../types/Address";
import { UserState } from "../../types/UserState";

const initialState: UserState = {
  _id: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  isAdmin: false,
  createdAt: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isAdmin = action.payload.isAdmin;
      state.createdAt = action.payload.createdAt;
      state.address = action.payload.address;
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      state._id = action.payload._id || state._id;
      state.name = action.payload.name || state.name;
      state.surname = action.payload.surname || state.surname;
      state.email = action.payload.email || state.email;
      state.phone = action.payload.phone || state.phone;
      state.createdAt = action.payload.createdAt || state.createdAt;
      state.address = action.payload.address || state.address;
    },
    clearUser(state) {
      state._id = "";
      state.name = "";
      state.surname = "";
      state.email = "";
      state.phone = "";
      state.isAdmin = false;
      state.createdAt = undefined;
      state.address = undefined;
    },
    setAddress(state, action: PayloadAction<Address>) {
      if (state.address) {
        state.address.postalCode = action.payload.postalCode;
        state.address.city = action.payload.city;
        state.address.street = action.payload.street;
        state.address.houseNumber = action.payload.houseNumber;
        state.address.apartmentNumber = action.payload.apartmentNumber;
      } else {
        state.address = action.payload;
      }
    },
  },
});

export const { setUser, updateUser, clearUser, setAddress } = userSlice.actions;
export default userSlice.reducer;
