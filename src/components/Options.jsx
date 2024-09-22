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
      // console.log("options toggled:", !prev);
      return !prev;
    });
  };

  return (
    <div className="options">
      <button className="options-button" onClick={handleToggleOptions}>
        Options
      </button>
      {isOptionsVisible && (
        <div id="options-objects">
          <label>
            <input
              id="chkbox"
              type="checkbox"
              checked={isSoundEffectsEnabled}
              onChange={toggleSoundEffects}
            />
            <span className="custom-checkbox"></span>
            Sound Effects
          </label>
          <button id="reset" onClick={resetGame}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
