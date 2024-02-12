import {
  NotificationStatus,
  Notification as NotificationType,
} from "../store/features/notificationSlice";

import { AiOutlineClose } from "react-icons/ai";
import { Colors } from "../types/Colors.enum";
import { FC } from "react";

interface NotificationProps {
  notification: NotificationType;
  closeNotificationHandler: (id: string) => void;
}

const Notification: FC<NotificationProps> = ({
  notification,
  closeNotificationHandler,
}) => {
  return (
    <div
      key={notification.id}
      className={`fade-in transform rounded-md px-4 py-4 text-lg shadow-lg transition-all duration-300 ease-in-out md:px-16 2xl:text-xl ${
        notification.type === NotificationStatus.SUCCESS
          ? `bg-${Colors.SUCCESS_COLOR}`
          : notification.type === NotificationStatus.ERROR
          ? `bg-${Colors.ERROR_COLOR}`
          : `bg-${Colors.INFO_COLOR}`
      } 	${
        notification.visible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <p className="font-medium">{notification.message}</p>
      <button
        aria-label="Zamknij powiadomienie"
        className="0 absolute right-1 top-1 text-2xl transition-all hover:scale-110"
        onClick={() => closeNotificationHandler(notification.id)}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Notification;
