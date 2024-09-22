//importing props from the other components

import { useState, useEffect } from "react";
import ClickableCookie from "./components/ClickableCookie";
import CookieCounter from "./components/CookieCounter";
import Upgrades from "./components/Upgrades";
import Timer from "./components/Timer";
import UpgradesData from "./components/UpgradesData";
import Options from "./components/Options";

export default function App() {
  //loading cookies from local storage
  const [cookies, setCookies] = useState(() => {
    const storedCookies = localStorage.getItem("cookies");
    // console.log("cookies in storage:", storedCookies || 0);
    return storedCookies ? parseInt(storedCookies) : 0;
  });
  //loading cookies per second from local storagw
  const [cookiesPerSecond, setCookiesPerSecond] = useState(() => {
    const storedCps = localStorage.getItem("cookiesPerSecond");
    // console.log("cookies per second in storage:", storedCps || 0);
    return storedCps ? parseInt(storedCps) : 0;
  });
  //loading the number of upgardes purchased
  const [upgrades, setUpgrades] = useState([]);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState(() => {
    const storedUpgrades = localStorage.getItem("purchasedUpgrades");
    // console.log("purchased upgrades in local storage:", storedUpgrades || {});
    return storedUpgrades ? JSON.parse(storedUpgrades) : {};
  });
  //loading the user choice for soundeffects
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(() => {
    const storedSoundEffects = localStorage.getItem("isSoundEffectsEnabled");
    // console.log(
    //   "sound effects userv setting:",
    //   storedSoundEffects !== null ? storedSoundEffects : true
    // );
    return storedSoundEffects ? JSON.parse(storedSoundEffects) : true;
  });

  useEffect(() => {
    const totalCps = upgrades.reduce((total, upgrade) => {
      const purchasedCount = purchasedUpgrades[upgrade.id] || 0;
      return total + upgrade.increase * purchasedCount;
    }, 0);
    // console.log("cps:", totalCps);
    setCookiesPerSecond(totalCps);
  }, [purchasedUpgrades, upgrades]);
  //function to save the current state into local storage
  useEffect(() => {
    // console.log("saving to localStorage:", {
    //   cookies,
    //   cookiesPerSecond,
    //   purchasedUpgrades,
    //   isSoundEffectsEnabled,
    // });
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
    localStorage.setItem(
      "purchasedUpgrades",
      JSON.stringify(purchasedUpgrades)
    );
    localStorage.setItem(
      "isSoundEffectsEnabled",
      JSON.stringify(isSoundEffectsEnabled)
    );
  }, [cookies, cookiesPerSecond, purchasedUpgrades, isSoundEffectsEnabled]);
  //added to reset the cost of an upgarde after reset was clicked
  const [resetUpgrades, setResetUpgrades] = useState(false);
  //addeda reset function which i had in week03
  const handleResetGame = () => {
    // console.log("Game reset.");
    setCookies(0);
    setCookiesPerSecond(0);
    setPurchasedUpgrades({});
    setIsSoundEffectsEnabled(true);
    setResetUpgrades((prev) => !prev);
    localStorage.clear();
  };
  //toggle option for sound effects in my options button
  const handleToggleSoundEffects = () => {
    setIsSoundEffectsEnabled((prev) => {
      // console.log("Sound effects toggled:", !prev);
      return !prev;
    });
  };
  //adding all the imported components to the dom
  return (
    <div className="container">
      <CookieCounter
        className="cookie-counter"
        cookies={cookies}
        cookiesPerSecond={cookiesPerSecond}
      />
      <ClickableCookie
        className="clickable-cookie"
        setCookies={setCookies}
        isSoundEffectsEnabled={isSoundEffectsEnabled}
      />
      <UpgradesData setUpgrades={setUpgrades} resetUpgrades={resetUpgrades} />
      <Upgrades
        className="upgrades"
        cookies={cookies}
        setCookies={setCookies}
        upgrades={upgrades}
        purchasedUpgrades={purchasedUpgrades}
        setPurchasedUpgrades={setPurchasedUpgrades}
        isSoundEffectsEnabled={isSoundEffectsEnabled}
      />
      <Timer
        className="timer"
        setCookies={setCookies}
        cookiesPerSecond={cookiesPerSecond}
      />
      <Options
        className="options"
        resetGame={handleResetGame}
        toggleSoundEffects={handleToggleSoundEffects}
        isSoundEffectsEnabled={isSoundEffectsEnabled}
      />
    </div>
  );
}
