import React from "react";

import { usePayment } from "./app/usePayment";
import { useNotifications } from "./app/useNotifications";
import { NotificationType } from "./components/Notifications";

export const TestButton: React.FC = () => {
  const { setSuccess } = usePayment();
  const { notify } = useNotifications();

  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const setNotification = () => {
    const rng = getRandomInt(0, 3);
    const states = [
      "Error",
      "Warning",
      "Info",
      "Success",
    ] as NotificationType[];
    notify(states[rng], "Test message");
  };

  return (
    <>
      <div>
        <button onClick={setSuccess}>click for success</button>
      </div>
      <div>
        <button onClick={setNotification}>click for notification</button>
      </div>
    </>
  );
};
