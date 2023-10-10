import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum NotificationStatus {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export interface NotificationState {
  message: string;
  type: NotificationStatus;
  visible: boolean;
}

const initialState: NotificationState = {
  message: "",
  type: NotificationStatus.SUCCESS,
  visible: false,
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(
      state,
      action: PayloadAction<{ message: string; type: NotificationStatus }>
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideNotification(state) {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
