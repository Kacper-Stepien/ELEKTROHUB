import { beforeEach, describe, expect, test } from "vitest";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { NotificationStatus } from "../store/features/notificationSlice";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useNotification } from "./useNotification";

const clearTimeout = 3000;

const mockStore = configureStore([]);

const initialState = {
  notification: {
    notifications: [],
  },
};

describe("useNotification hook", () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  let result;

  beforeEach(() => {
    store = mockStore(initialState);
    result = renderHook(() => useNotification(clearTimeout), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;
  });

  test("should have an empty notifications array initially", () => {
    const { notifications } = result!.current;

    expect(notifications.length).toBe(0);
  });

  test("addNewNotifications should add notification correctly with visible status", () => {
    const { notifications, addNewNotification } = result!.current;
    expect(notifications.length).toBe(0);

    addNewNotification("Błąd serwera", NotificationStatus.ERROR);
    setTimeout(() => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toBe("Błąd serwera");
      expect(notifications[0].type).toBe(NotificationStatus.ERROR);
      expect(notifications[0].visible).toBeTruthy();
    }, 50);
  });

  test("should delete notification after 3000ms", () => {
    const { notifications, addNewNotification } = result!.current;
    expect(notifications.length).toBe(0);

    addNewNotification("Błąd serwera", NotificationStatus.ERROR);
    setTimeout(() => {
      expect(notifications.length).toBe(1);
    }, 50);
    setTimeout(() => {
      expect(notifications.length).toBe(0);
    }, 3050);
  });

  test("closeNotificationHandler should change notification visibility to false and delete it after 300ms", async () => {
    const { notifications, addNewNotification, closeNotificationHandler } =
      result!.current;
    expect(notifications.length).toBe(0);
    addNewNotification("Success", NotificationStatus.SUCCESS);

    setTimeout(() => {
      expect(notifications.length).toBe(1);
    }, 50);

    setTimeout(() => {
      closeNotificationHandler(notifications[0].id);
    }, 100);

    setTimeout(() => {
      expect(notifications[0].visible).toBeFalsy();
    }, 150);

    setTimeout(() => {
      expect(notifications.length).toBe(0);
    }, 500);
  });
});
