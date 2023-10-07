import "css/styles.css";

const Settings = {
    background_color: getComputedStyle(document.documentElement).getPropertyValue("--background-color"),
    font_color: getComputedStyle(document.documentElement).getPropertyValue("--font-color")
}

export default Settings;