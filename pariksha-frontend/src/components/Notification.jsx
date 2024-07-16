"use client";

import { subscribeNotification } from "@/hooks/notofication";
import { useMutation } from "@tanstack/react-query";

import { MdOutlineNotifications } from "react-icons/md";

export default function Notification() {
  const subscribeToNotification = useMutation({
    mutationFn: (data) => subscribeNotification(data),
  });
  const requestNotificationPermission = async () => {
    if (
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    ) {
      await registerServiceWorker();
      //   Notification.requestPermission()
      //     .then((permission) => {
      //       console.log(`Permission: ${permission}`);
      //     })
      //     .catch((error) => {
      //       console.error(`Error: ${error}`);
      //     });
    } else {
      console.log("Push messaging is not supported");
    }
  };
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const swReg =
          await navigator.serviceWorker.register("/service-worker.js");

        console.log("Service Worker is registered", swReg);

        const subscription = await swReg.pushManager.getSubscription();
        if (subscription === null) {
          const newSubscription = await swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BMD63k473VRIuwi6jcvqGoP85fxaMasyo7e848jXrZz0JYifnuG1RelGyq2yWche4u40mvCSjCzBr3XbRzZeXw8",
          });
          console.log("User is subscribed:", newSubscription);
          subscribeToNotification.mutate(newSubscription);
          //   await fetch("/subscribe", {
          //     method: "POST",
          //     body: JSON.stringify(newSubscription),
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   });
        } else {
          console.log("User is already subscribed.");
        }
      } catch (error) {
        console.error("Service Worker Error", error);
      }
    }
  };

  //   useEffect(() => {
  //     registerServiceWorker();
  //   }, []);
  return (
    <button
      className="flex items-center"
      onClick={requestNotificationPermission}
    >
      <MdOutlineNotifications className="mr-2" size={20} />
      Reminder
    </button>
  );
}
