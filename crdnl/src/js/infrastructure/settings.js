import "css/styles.css";

class Settings {
    background_color = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
    dark_background_color = getComputedStyle(document.documentElement).getPropertyValue("--dark-background-color");
    accent_background_color = getComputedStyle(document.documentElement).getPropertyValue("--accent-background-color");
    project_display_background_color = getComputedStyle(document.documentElement).getPropertyValue("--project-display-background-color");
    
    font_color = getComputedStyle(document.documentElement).getPropertyValue("--font-color");
    greyed_out_font_color = getComputedStyle(document.documentElement).getPropertyValue("--greyed-out-font-color");

    small_font_size = getComputedStyle(document.documentElement).getPropertyValue("--small-font-size");
    font_size = getComputedStyle(document.documentElement).getPropertyValue("--font-size");
    large_font_size = getComputedStyle(document.documentElement).getPropertyValue("--large-font-size");
}

export default Settings;