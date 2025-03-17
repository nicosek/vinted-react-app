import { useState } from "react";
import { Range } from "react-range";
import "./PriceRangeSlider.css";

const PriceRangeSlider = ({ setFilters }) => {
  const [values, setValues] = useState([0, 500]); // Valeurs par défaut du slider

  // Met à jour en temps réel
  const handleChange = (newValues) => {
    setValues(newValues);
  };

  // Applique les filtres uniquement lorsqu'on relâche le curseur
  const handleFinalChange = (newValues) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        priceMin: newValues[0],
        priceMax: newValues[1],
      };
      return newFilters;
    });
  };

  return (
    <div className="price-range-container">
      <span className="price-label">Prix entre :</span>
      <div className="slider-container">
        <Range
          step={1}
          min={0}
          max={1000}
          values={values}
          onChange={handleChange}
          onFinalChange={handleFinalChange}
          renderTrack={({ props, children }) => {
            return (
              <div
                {...props}
                ref={props.ref} // ⚠️ IMPORTANT : garantir que react-range peut détecter le track
                className="range-track"
              >
                <div
                  className="range-track-fill"
                  style={{
                    left: `${(values[0] / 1000) * 100}%`,
                    width: `${((values[1] - values[0]) / 1000) * 100}%`,
                    backgroundColor: "var(--primary-color)",
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props, index }) => {
            return (
              <div
                {...props}
                ref={props.ref} // ✅ Garde le ref pour que le slider fonctionne
                key={index}
                className="range-thumb"
              >
                <span className="thumb-label">{values[index]}€</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
