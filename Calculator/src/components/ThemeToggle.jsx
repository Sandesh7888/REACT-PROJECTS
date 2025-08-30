import React from "react";

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <span className="slider"></span>
      </label>
      {/* <span className="mode-label">{theme === "light" ? "☀️ Day" : "🌙 Night"}</span> */}
    </div>
  );
};

export default ThemeToggle;
