import {
  NotificationStatus,
  addNotification,
  removeNotification,
  setInvisible,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { prepareErrorWithDefaultMessage } from "../utils/prepareErrorWithDefaultMessage";
import { useEffect } from "react";

export const useNotification = (clearTime: number) => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notification);

  const addNewNotification = (message: string, type: NotificationStatus) => {
    dispatch(addNotification({ message, type }));
  };

  const addNewSuccessNotification = (message: string) => {
    addNewNotification(message, NotificationStatus.SUCCESS);
  };

  const addNewErrorNotification = (error: unknown) => {
    const newError = prepareErrorWithDefaultMessage(error);
    dispatch(
      addNotification({
        message: newError.message,
        type: NotificationStatus.ERROR,
      }),
    );
  };

  const addNewInfoNotification = (message: string) => {
    addNewNotification(message, NotificationStatus.INFO);
  };

  const closeNotificationHandler = (id: string) => {
    dispatch(setInvisible({ id }));
    setTimeout(() => {
      dispatch(removeNotification({ id }));
    }, 300);
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        closeNotificationHandler(notification.id);
      }, clearTime);

      return () => {
        clearTimeout(timer);
      };
    });
  }, [notifications]);

  return {
    addNewNotification,
    addNewSuccessNotification,
    addNewErrorNotification,
    addNewInfoNotification,
    notifications,
    closeNotificationHandler,
  };
};
