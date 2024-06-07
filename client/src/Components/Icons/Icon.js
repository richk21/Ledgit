/* import React, { useState } from "react";
import './Icon.css';

function Icon({ iconName, wrapperStyle, svgProp }) {
  const { loading, Svg } = useDynamicSvgImport(iconName);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <>
      {loading && (
        <span className="rounded-full bg-slate-400 animate-pulse h-8 w-8" role="loading"></span>
      )}
      {Svg && (
        <Svg
          className={`${styles[wrapperStyle || ""]} "icon" ${isHovered ? "hovered" : ""}`}
          role={iconName}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseOut}
          onClick={() => console.log("Clicked")}
          {...svgProp}
        />
      )}
    </>
  );
}
export default Icon */