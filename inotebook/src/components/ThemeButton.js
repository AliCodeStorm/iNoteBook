import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'} rounded-circle p-2 position-fixed`}
            style={{
                right: "20px",
                bottom: "20px",
                width: "50px",
                height: "50px",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <i className="fas fa-moon"></i>
            ) : (
                <i className="fas fa-sun"></i>
            )}
        </button>
    );
};

export default ThemeButton;
