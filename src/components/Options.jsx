import "../Styles/Options.css";
import { useState } from "react";

export default function Options({
  resetGame,
  toggleSoundEffects,
  isSoundEffectsEnabled,
}) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleToggleOptions = () => {
    setIsOptionsVisible((prev) => {
      console.log("Options visibility toggled:", !prev);
      return !prev;
    });
  };

  return (
    <div className="options">
      <button className="options-button" onClick={handleToggleOptions}>
        Options
      </button>
      {isOptionsVisible && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={isSoundEffectsEnabled}
              onChange={toggleSoundEffects}
            />
            Sound Effects
          </label>
          <button onClick={resetGame}>Reset Progress</button>
        </div>
      )}
    </div>
  );
}
