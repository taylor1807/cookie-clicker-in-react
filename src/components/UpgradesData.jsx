import { useEffect } from "react";
//function to fetch data from the api provided
export default function UpgradesData({ setUpgrades, resetUpgrades }) {
  useEffect(() => {
    async function fetchUpgrades() {
      try {
        //added a try and catch in case of errors fetching
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
  //added a rest function to re fetch the api and reset the upgrade cost as i was mutating it with Math.round
  return null;
}
