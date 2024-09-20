import { useEffect } from "react";

export default function UpgradesData({ setUpgrades, resetUpgrades }) {
  useEffect(() => {
    async function fetchUpgrades() {
      try {
        const response = await fetch(
          `https://cookie-upgrade-api.vercel.app/api/upgrades`
        );
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error("Error fetching upgrades:", error);
      }
    }
    fetchUpgrades();
  }, [setUpgrades, resetUpgrades]);

  return null;
}
