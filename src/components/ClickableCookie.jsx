import "../Styles/ClickableCookie.css";
import { useEffect, useState } from "react";

export default function ClickableCookie({ setCookies }) {
  const [clickSound, setClickSound] = useState(null);

  useEffect(() => {
    const sound = new Audio("public/assets/click.mp3");
    setClickSound(sound);
  }, []);

  const handleClick = () => {
    setCookies((cookies) => cookies + 1);
    clickSound.play();
  };

  return (
    <div>
      <img
        className="clickable-cookie"
        src="https://img.freepik.com/premium-photo/cartoon-cookie-with-happy-face-eyes-generative-ai_927978-6946.jpg"
        onClick={handleClick}
        alt="A happy cookie"
      />
    </div>
  );
}
