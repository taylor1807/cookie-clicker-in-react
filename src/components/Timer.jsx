import "../Styles/Timer.css";
import { useEffect } from "react";

export default function Timer({ setCookies, cookiesPerSecond }) {
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookies((cookies) => cookies + cookiesPerSecond);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [setCookies, cookiesPerSecond]);

  return null;
}
