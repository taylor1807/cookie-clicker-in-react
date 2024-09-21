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
    console.log("Buying upgrade:", upgrade.name);

    if (cookies >= cost) {
      setCookies((prevCookies) => prevCookies - cost);
      setPurchasedUpgrades((prevUpgrades) => ({
        ...prevUpgrades,
        [id]: (prevUpgrades[id] || 0) + 1,
      }));
      upgrade.cost = Math.round(upgrade.cost * 1.25);
      console.log("Upgrade purchased:", upgrade.name);

      if (upgradeSound) {
        upgradeSound.play();
        console.log("Upgrade sound played.");
      }

      //below not needed anymore now the buttons grey out but left in as a backup in case of future issues
    } else {
      let shortage = cost - cookies;
      alert(`Not enough cookies. Need ${shortage} more.`);
      console.log("Not enough cookies to buy upgrade.");
    }
  };

  return (
    <div className="upgrades">
      <h1>Upgrades</h1>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className="upgrade">
          <h2>{upgrade.name}</h2>
          <p id="cost">Cost: {upgrade.cost}</p>
          <p id="increase">Increase: {upgrade.increase}</p>
          <p id="purchased">Purchased: {purchasedUpgrades[upgrade.id] || 0}</p>
          <button
            className="upgrade-button"
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
