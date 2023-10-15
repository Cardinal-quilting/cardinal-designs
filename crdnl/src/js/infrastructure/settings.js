import "css/styles.css";

class Settings {
    background_color = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
    dark_background_color = getComputedStyle(document.documentElement).getPropertyValue("--dark-background-color");
    font_color = getComputedStyle(document.documentElement).getPropertyValue("--font-color");
    greyed_out_font_color = getComputedStyle(document.documentElement).getPropertyValue("--greyed-out-font-color");
}

export default Settings;