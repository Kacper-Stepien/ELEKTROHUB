import {
  NotificationStatus,
  Notification as NotificationType,
} from "../store/features/notificationSlice";
import { describe, expect, test, vi } from "vitest";

import { Colors } from "../types/Colors.enum";
import Notification from "./Notification";
import { render } from "@testing-library/react";

describe("Notification component", () => {
  test("shoudl render correctly", () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.SUCCESS,
      visible: true,
    };
    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );
    expect(getByText("Test notification")).toBeInTheDocument();
  });

  test("should be invisible after click closeNotificationHandler", async () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.SUCCESS,
      visible: true,
    };
    const closeNotificationHandler = vi.fn();
    const { getByLabelText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={closeNotificationHandler}
      />
    );
    const closeButton = getByLabelText("Zamknij powiadomienie");
    closeButton.click();
    expect(closeNotificationHandler).toHaveBeenCalledWith("1");
  });

  test("should have translate-x-0 opacity-100 class if visible is true", () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.SUCCESS,
      visible: true,
    };
    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );

    const notificationElement = getByText("Test notification");
    expect(notificationElement.parentElement).toHaveClass(
      "translate-x-0 opacity-100"
    );
  });

  test("should have translate-x-full opacity-0 class if visible is false", async () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.SUCCESS,
      visible: false,
    };
    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );

    const notificationElement = getByText("Test notification");
    expect(notificationElement.parentElement).toHaveClass(
      "translate-x-full opacity-0"
    );
  });

  test("should have class bg-green-500 when notification type is SUCCESS", () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.SUCCESS,
      visible: true,
    };

    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );
    const notificationElement = getByText("Test notification");
    expect(notificationElement.parentElement).toHaveClass(
      `bg-${Colors.SUCCESS_COLOR}`
    );
  });

  test("should have class bg-red-500 when notification type is ERROR", () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.ERROR,
      visible: true,
    };

    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );
    const notificationElement = getByText("Test notification");
    expect(notificationElement.parentElement).toHaveClass(
      `bg-${Colors.ERROR_COLOR}`
    );
  });

  test("should have class bg-yellow-500 when notification type is INFO", () => {
    const notification = {
      id: "1",
      message: "Test notification",
      type: NotificationStatus.INFO,
      visible: true,
    };

    const { getByText } = render(
      <Notification
        notification={notification as NotificationType}
        closeNotificationHandler={() => {}}
      />
    );
    const notificationElement = getByText("Test notification");
    expect(notificationElement.parentElement).toHaveClass(
      `bg-${Colors.INFO_COLOR}`
    );
  });
});
