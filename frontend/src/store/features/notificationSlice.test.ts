import { beforeEach, expect, test } from "vitest";
import notificationSlice, {
  NotificationStatus,
  addNotification,
  clearNotifications,
  removeNotification,
  setInvisible,
} from "./notificationSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
  },
});

beforeEach(() => {
  store.dispatch(clearNotifications());
});

test("initial state of notifications is an empty array", () => {
  const state = store.getState().notification;

  expect(state.notifications).toEqual([]);
});

test("addNotification action adds new notification to state", () => {
  const message = "Test message";
  const type = NotificationStatus.SUCCESS;

  store.dispatch(addNotification({ message, type }));

  const state = store.getState().notification;

  expect(state.notifications.length).toBe(1);
  expect(state.notifications[0].message).toBe(message);
  expect(state.notifications[0].type).toBe(type);
});

test("addNotification action adds three notifications to state correctly", () => {
  const messages = ["Test message 1", "Test message 2", "Test message 3"];
  const types = [
    NotificationStatus.SUCCESS,
    NotificationStatus.ERROR,
    NotificationStatus.INFO,
  ];

  messages.forEach((message, index) => {
    store.dispatch(addNotification({ message, type: types[index] }));
  });

  const state = store.getState().notification;

  expect(state.notifications.length).toBe(3);
  state.notifications.forEach((notification, index) => {
    expect(notification.message).toBe(messages[index]);
    expect(notification.type).toBe(types[index]);
  });
});

test("removeNotification action removes notification from state", () => {
  store.dispatch(
    addNotification({
      message: "Test message",
      type: NotificationStatus.SUCCESS,
    })
  );
  const state = store.getState().notification;
  expect(state.notifications.length).toBe(1);
  const id = state.notifications[0].id;
  store.dispatch(removeNotification({ id }));
  const newState = store.getState().notification;
  expect(newState.notifications.length).toBe(0);
});

test("setInvisible action sets notification to invisible", () => {
  store.dispatch(
    addNotification({
      message: "Test message",
      type: NotificationStatus.SUCCESS,
    })
  );
  const state = store.getState().notification;
  const id = state.notifications[0].id;
  expect(state.notifications[0].visible).toBe(true);
  store.dispatch(setInvisible({ id }));
  const newState = store.getState().notification;
  expect(newState.notifications[0].visible).toBe(false);
});
