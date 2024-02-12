import {
  NotificationStatus,
  addNotification,
  removeNotification,
  setInvisible,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { useEffect } from "react";

const useNotification = (clearTime: number) => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notification);

  const addNewNotification = (message: string, type: NotificationStatus) => {
    dispatch(addNotification({ message, type }));
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

  return { addNewNotification, notifications, closeNotificationHandler };
};

export { useNotification };
