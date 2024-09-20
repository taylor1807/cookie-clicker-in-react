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
    return storedCookies ? parseInt(storedCookies) : 0;
  });

  const [cookiesPerSecond, setCookiesPerSecond] = useState(() => {
    const storedCps = localStorage.getItem("cookiesPerSecond");
    return storedCps ? parseInt(storedCps) : 0;
  });

  const [upgrades, setUpgrades] = useState([]);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState(() => {
    const storedUpgrades = localStorage.getItem("purchasedUpgrades");
    return storedUpgrades ? JSON.parse(storedUpgrades) : {};
  });

  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(() => {
    const storedSoundEffects = localStorage.getItem("isSoundEffectsEnabled");
    return storedSoundEffects ? JSON.parse(storedSoundEffects) : true;
  });

  const [resetUpgrades, setResetUpgrades] = useState(false);

  useEffect(() => {
    const totalCps = upgrades.reduce((total, upgrade) => {
      const purchasedCount = purchasedUpgrades[upgrade.id] || 0;
      return total + upgrade.increase * purchasedCount;
    }, 0);
    setCookiesPerSecond(totalCps);
  }, [purchasedUpgrades, upgrades]);

  useEffect(() => {
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
    setCookies(0);
    setCookiesPerSecond(0);
    setPurchasedUpgrades({});
    setIsSoundEffectsEnabled(true);
    setResetUpgrades((previousState) => !previousState);
  };

  const handleToggleSoundEffects = () => {
    setIsSoundEffectsEnabled((previousState) => !previousState);
  };

  return (
    <div className="container">
      <CookieCounter
        className="cookie-counter"
        cookies={cookies}
        cookiesPerSecond={cookiesPerSecond}
      />
      <ClickableCookie className="clickable-cookie" setCookies={setCookies} />
      <UpgradesData
        setUpgrades={setUpgrades}
        resetUpgrades={resetUpgrades}
      />{" "}
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
