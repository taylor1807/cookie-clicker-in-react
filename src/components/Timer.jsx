import { useEffect } from "react";
//function to increase cookie count per second
export default function Timer({ setCookies, cookiesPerSecond }) {
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCookies((cookies) => cookies + cookiesPerSecond);
    }, 1000);

    return () => {
      //to keep things tidy like sam said as best practice
      clearInterval(myInterval);
    };
  }, [setCookies, cookiesPerSecond]);

  return null;
}
