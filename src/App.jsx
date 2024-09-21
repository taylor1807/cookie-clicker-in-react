import { useState, useEffect } from "react";
import ClickableCookie from "./components/ClickableCookie";
import CookieCounter from "./components/CookieCounter";
import Upgrades from "./components/Upgrades";
import Timer from "./components/Timer";
import UpgradesData from "./components/UpgradesData";
import Options from "./components/Options";

export default function App() {
  const [cookies, setCookies] = useState(() => {
    const storedCookies = localStorage.getItem("cookies");
    console.log("Loaded cookies:", storedCookies || 0);
    return storedCookies ? parseInt(storedCookies) : 0;
  });

  const [cookiesPerSecond, setCookiesPerSecond] = useState(() => {
    const storedCps = localStorage.getItem("cookiesPerSecond");
    console.log("Loaded cookies per second:", storedCps || 0);
    return storedCps ? parseInt(storedCps) : 0;
  });

  const [upgrades, setUpgrades] = useState([]);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState(() => {
    const storedUpgrades = localStorage.getItem("purchasedUpgrades");
    console.log("Loaded purchased upgrades:", storedUpgrades || {});
    return storedUpgrades ? JSON.parse(storedUpgrades) : {};
  });

  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(() => {
    const storedSoundEffects = localStorage.getItem("isSoundEffectsEnabled");
    console.log(
      "Loaded sound effects setting:",
      storedSoundEffects !== null ? storedSoundEffects : true
    );
    return storedSoundEffects ? JSON.parse(storedSoundEffects) : true;
  });

  const [resetUpgrades, setResetUpgrades] = useState(false);

  useEffect(() => {
    const totalCps = upgrades.reduce((total, upgrade) => {
      const purchasedCount = purchasedUpgrades[upgrade.id] || 0;
      return total + upgrade.increase * purchasedCount;
    }, 0);
    console.log("Total Cookies Per Second:", totalCps);
    setCookiesPerSecond(totalCps);
  }, [purchasedUpgrades, upgrades]);

  useEffect(() => {
    // console.log("Saving to localStorage:", {
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

  const handleResetGame = () => {
    // console.log("Game reset.");
    setCookies(0);
    setCookiesPerSecond(0);
    setPurchasedUpgrades({});
    setIsSoundEffectsEnabled(true);
    setResetUpgrades((prev) => !prev);
  };

  const handleToggleSoundEffects = () => {
    setIsSoundEffectsEnabled((prev) => {
      // console.log("Sound effects toggled:", !prev);
      return !prev;
    });
  };

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
