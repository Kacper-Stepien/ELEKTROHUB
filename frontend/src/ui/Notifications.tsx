import { FC } from "react";
import Notification from "./Notification";
import { useNotification } from "../hooks/useNotification";

interface NotificationProps {
  clearTime: number;
}

const Notifications: FC<NotificationProps> = ({ clearTime }) => {
  const { notifications, closeNotificationHandler } =
    useNotification(clearTime);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 ">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          closeNotificationHandler={closeNotificationHandler}
        />
      ))}
    </div>
  );
};

export default Notifications;
