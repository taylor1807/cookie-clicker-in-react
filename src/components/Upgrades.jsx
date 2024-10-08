import "../Styles/Upgrades.css";
import { useEffect, useState } from "react";

export default function Upgrades({
  cookies,
  setCookies,
  upgrades,
  purchasedUpgrades,
  setPurchasedUpgrades,
  isSoundEffectsEnabled,
}) {
  const [upgradeSound, setUpgradeSound] = useState(null);
  // used the same sound effects as week03
  useEffect(() => {
    const sound = new Audio("./assets/upgrade.mp3");
    setUpgradeSound(sound);
  }, []);
  // function to handle the buying of upgrades added previous upgrades to show how many of each purchased and Math.round from week03 to modify the upgrade cost
  const handleBuyUpgrade = (upgrade) => {
    const { id, cost } = upgrade;
    // console.log("upgrade bought:", upgrade.name);

    if (cookies >= cost) {
      setCookies((prevCookies) => prevCookies - cost);
      setPurchasedUpgrades((prevUpgrades) => ({
        ...prevUpgrades,
        [id]: (prevUpgrades[id] || 0) + 1,
      }));
      upgrade.cost = Math.round(upgrade.cost * 1.175);
      // console.log("upgrade purchased:", upgrade.name);

      if (isSoundEffectsEnabled) {
        upgradeSound.play();
        // console.log("playing upgrade sound");
      }

      //below not needed anymore now the buttons grey out but left in as a backup in case of future issues
    } else {
      let shortage = cost - cookies;
      alert(`Not enough cookies. Need ${shortage} more.`);
      // console.log("insufficient cookies.");
    }
  };
  //adding upgardes to the dom, added a terniary to display different text when there is not enough cookies
  return (
    <div className="upgrades">
      <h1>Upgrades</h1>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id} className="upgrade">
          <h2>{upgrade.name}</h2>
          <p id="cost">🍪: {upgrade.cost}</p>
          <p id="increase">🍪/s Increase: {upgrade.increase}</p>
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
