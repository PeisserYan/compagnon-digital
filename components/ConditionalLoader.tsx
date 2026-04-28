"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ConditionalLoader() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loaderShown");
    if (!alreadyShown) {
      sessionStorage.setItem("loaderShown", "true");
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, []);

  if (shouldShow !== true) return null;
  return <Loader />;
}
