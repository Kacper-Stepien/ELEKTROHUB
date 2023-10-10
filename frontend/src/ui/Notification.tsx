import {
  NotificationStatus,
  hideNotification,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useAppDispatch();
  const { message, type, visible } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(hideNotification());
      }, 10500);
    }
  }, [visible]);

  return (
    <>
      <div
        className={`fixed  bottom-6 right-4 py-4 px-8 rounded-md text-xl shadow-md transition-all duration-500 ${
          visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } ${
          type === NotificationStatus.SUCCESS
            ? "bg-green-500"
            : type === NotificationStatus.ERROR
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        <p className="font-medium">{message}</p>
        <button
          className="0 absolute top-1 right-1 text-2xl hover:scale-110 transition-all"
          onClick={() => dispatch(hideNotification())}
        >
          <AiFillCloseCircle />
        </button>
      </div>
    </>
  );
};

export default Notification;
