import "../Styles/ClickableCookie.css";
import { useEffect, useState } from "react";

export default function ClickableCookie({ setCookies, isSoundEffectsEnabled }) {
  const [clickSound, setClickSound] = useState(null);
  //click sound added from week03
  useEffect(() => {
    const sound = new Audio("./assets/click.mp3");
    setClickSound(sound);
  }, []);
  //function to increase cookies each click and play soundeffect when clicked
  const handleClick = () => {
    setCookies((cookies) => cookies + 1);
    // console.log(
    //   "Cookie clicked, isSoundEffectsEnabled:",
    //   isSoundEffectsEnabled
    // );
    if (isSoundEffectsEnabled) {
      // console.log("playing click sound.");
      clickSound.playbackRate = 5; //found online as i felt the audio was delayed
      clickSound.play();
    }
  };
  //adding cookie image to the dom
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
