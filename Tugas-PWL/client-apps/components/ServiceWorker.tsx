"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    console.log("SW REGISTER START");

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "SW REGISTERED",
            registration
          );
        })
        .catch((error) => {
          console.error(
            "SW FAILED",
            error
          );
        });
    } else {
      console.log(
        "SERVICE WORKER NOT SUPPORTED"
      );
    }
  }, []);

  return null;
}