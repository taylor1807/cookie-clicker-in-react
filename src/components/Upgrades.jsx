import "../Styles/Upgrades.css";
import { useEffect, useState } from "react";

export default function Upgrades({
  cookies,
  setCookies,
  upgrades,
  purchasedUpgrades,
  setPurchasedUpgrades,
}) {
  const [upgradeSound, setUpgradeSound] = useState(null);

  useEffect(() => {
    const sound = new Audio("./assets/upgrade.mp3");
    setUpgradeSound(sound);
  }, []);

  const handleBuyUpgrade = (upgrade) => {
    const { id, cost } = upgrade;

    if (cookies >= cost) {
      setCookies((previousCookies) => previousCookies - cost);
      setPurchasedUpgrades((previousUpgrades) => ({
        ...previousUpgrades,
        [id]: (previousUpgrades[id] || 0) + 1,
      }));
      upgrade.cost = Math.round(upgrade.cost * 1.25);
      upgradeSound.play();
    } else {
      let shortage = cost - cookies;
      alert(`Not enough cookies, ${shortage} more cookies needed.`);
    }
  };

  return (
    <div className="upgrades">
      <h1>Upgrades</h1>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className="upgrade">
          <h2>{upgrade.name}</h2>
          <p>Cost: {upgrade.cost}</p>
          <p>Increase: {upgrade.increase}</p>
          <p>Purchased: {purchasedUpgrades[upgrade.id] || 0}</p>
          <button
            onClick={() => handleBuyUpgrade(upgrade)}
            disabled={cookies < upgrade.cost}
          >
            {cookies >= upgrade.cost ? "Buy" : "Not Enough 🍪"}
          </button>
        </div>
      ))}
    </div>
  );
}
