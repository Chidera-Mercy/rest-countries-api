import { useState, useEffect } from "react";
import { MoonIcon } from "./Icons"

function Navbar() {
    const [theme, setTheme] = useState("light");

    // Update the body class based on the theme
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <nav className="navbar">
            <h2>Where in the world?</h2>
            <div className="navbar-theme-toggle" onClick={toggleTheme}>
                <MoonIcon />
                <h3 className="theme-text">{theme === "light" ? "Dark Mode" : "Light Mode"}</h3>
            </div>
            
        </nav>
    )
}

export default Navbar